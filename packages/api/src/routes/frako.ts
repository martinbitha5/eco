import { Router, Request, Response } from "express";
import { z } from "zod";
import { supabase } from "../lib/supabase.js";
import { calculateScore } from "../lib/scoring-engine.js";
import { FRAKO_INSTALLMENTS } from "../lib/constants.js";

/** Limite de crédit (USD) selon le score ScoreCongo 0-850 */
function creditLimitFromScore(score: number): number {
  if (score >= 700) return 1000;
  if (score >= 600) return 500;
  if (score >= 500) return 200;
  return 0;
}

const router = Router();

const createAccountSchema = z.object({
  bankAccountId: z.string().optional(),
  debitCardToken: z.string().optional(),
});

const createOrderSchema = z.object({
  merchantId: z.string().uuid(),
  amount: z.number().positive(),
  installments: z.union([z.literal(3), z.literal(6)]),
  metadata: z.record(z.unknown()).optional(),
});

/**
 * POST /api/v1/frako/accounts
 * Créer ou mettre à jour un compte Frako (utilisateur authentifié)
 * Utilise ScoreCongo pour définir la limite de crédit à la création.
 */
router.post("/accounts", async (req: Request, res: Response) => {
  const userId = (req as Request & { userId?: string }).userId;
  if (!userId) {
    return res.status(401).json({ error: "Authentification requise" });
  }

  const parseResult = createAccountSchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({
      error: "Validation failed",
      details: parseResult.error.flatten().fieldErrors,
    });
  }

  const { bankAccountId, debitCardToken } = parseResult.data;

  try {
    const { data: existing } = await supabase
      .from("frako_accounts")
      .select("id")
      .eq("user_id", userId)
      .single();

    const isComplete = !!(bankAccountId && debitCardToken);

    if (existing) {
      const { data, error } = await supabase
        .from("frako_accounts")
        .update({
          bank_account_id: bankAccountId,
          debit_card_token: debitCardToken,
          is_verified: isComplete,
          updated_at: new Date().toISOString(),
        })
        .eq("user_id", userId)
        .select()
        .single();

      if (error) throw error;
      return res.json(data);
    }

    // Nouveau compte : récupérer le profil et calculer le score ScoreCongo
    let creditLimit = 200; // défaut si scoring indisponible
    const { data: profile } = await supabase
      .from("profiles")
      .select("nin, full_name")
      .eq("id", userId)
      .single();

    if (profile?.nin && profile?.full_name) {
      const scoreResult = await calculateScore({
        nin: profile.nin,
        full_name: profile.full_name,
        bank_data: bankAccountId ? { bankAccountId } : undefined,
      });
      if (scoreResult) {
        creditLimit = creditLimitFromScore(scoreResult.score);
      }
    }

    const { data, error } = await supabase
      .from("frako_accounts")
      .insert({
        user_id: userId,
        bank_account_id: bankAccountId,
        debit_card_token: debitCardToken,
        is_verified: isComplete,
        credit_limit: creditLimit,
      })
      .select()
      .single();

    if (error) throw error;
    return res.status(201).json(data);
  } catch (err) {
    console.error("Frako account error:", err);
    return res.status(500).json({ error: "Erreur lors de la création du compte" });
  }
});

/**
 * GET /api/v1/frako/accounts/me
 * Récupérer le compte Frako de l'utilisateur connecté
 */
router.get("/accounts/me", async (req: Request, res: Response) => {
  const userId = (req as Request & { userId?: string }).userId;
  if (!userId) {
    return res.status(401).json({ error: "Authentification requise" });
  }

  const { data, error } = await supabase
    .from("frako_accounts")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error && error.code !== "PGRST116") throw error;
  if (!data) {
    return res.status(404).json({ error: "Compte Frako non trouvé" });
  }
  return res.json(data);
});

/**
 * POST /api/v1/frako/orders
 * Créer une commande BNPL (appelé par le marchand ou l'app)
 */
router.post("/orders", async (req: Request, res: Response) => {
  const userId = (req as Request & { userId?: string }).userId;
  if (!userId) {
    return res.status(401).json({ error: "Authentification requise" });
  }

  const parseResult = createOrderSchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({
      error: "Validation failed",
      details: parseResult.error.flatten().fieldErrors,
    });
  }

  const { merchantId, amount, installments, metadata } = parseResult.data;

  if (!FRAKO_INSTALLMENTS.includes(installments)) {
    return res.status(400).json({
      error: "Installments invalide",
      allowed: FRAKO_INSTALLMENTS,
    });
  }

  try {
    // Vérifier le compte Frako
    const { data: account, error: accountError } = await supabase
      .from("frako_accounts")
      .select("id, credit_limit, is_verified")
      .eq("user_id", userId)
      .single();

    if (accountError || !account) {
      return res.status(400).json({
        error: "Compte Frako requis",
        message: "Veuillez compléter votre inscription Frako avant de payer en plusieurs fois.",
      });
    }

    if (!account.is_verified) {
      return res.status(400).json({
        error: "Compte non vérifié",
        message: "Votre compte Frako doit être vérifié pour effectuer des achats.",
      });
    }

    if (amount > (account.credit_limit ?? 0)) {
      return res.status(400).json({
        error: "Limite de crédit insuffisante",
        message: `Montant ${amount} USD dépasse votre limite de crédit.`,
      });
    }

    const installmentAmount = amount / installments;
    const dueDates: string[] = [];
    const now = new Date();
    for (let i = 0; i < installments; i++) {
      const due = new Date(now);
      due.setMonth(due.getMonth() + i + 1);
      dueDates.push(due.toISOString().split("T")[0]);
    }

    const { data: order, error: orderError } = await supabase
      .from("frako_orders")
      .insert({
        frako_account_id: account.id,
        merchant_id: merchantId,
        amount,
        installments,
        status: "pending",
        metadata: metadata ?? {},
      })
      .select()
      .single();

    if (orderError) throw orderError;

    // Créer les échéances de paiement
    const payments = dueDates.map((dueDate, i) => ({
      order_id: order.id,
      installment_number: i + 1,
      amount: installmentAmount,
      due_date: dueDate,
      status: "pending",
    }));

    await supabase.from("frako_payments").insert(payments);

    return res.status(201).json({
      ...order,
      installmentAmount,
      dueDates,
      payments,
    });
  } catch (err) {
    console.error("Frako order error:", err);
    return res.status(500).json({ error: "Erreur lors de la création de la commande" });
  }
});

/**
 * GET /api/v1/frako/orders/:id
 * Récupérer le statut d'une commande
 */
router.get("/orders/:id", async (req: Request, res: Response) => {
  const userId = (req as Request & { userId?: string }).userId;
  const { id } = req.params;

  const { data: order, error } = await supabase
    .from("frako_orders")
    .select(`
      *,
      frako_accounts!inner(user_id),
      frako_payments(*)
    `)
    .eq("id", id)
    .single();

  if (error || !order) {
    return res.status(404).json({ error: "Commande non trouvée" });
  }

  // Vérifier que l'utilisateur est bien le propriétaire (si authentifié)
  const account = order.frako_accounts as { user_id: string };
  if (userId && account?.user_id !== userId) {
    return res.status(403).json({ error: "Accès non autorisé" });
  }

  return res.json(order);
});

export default router;
