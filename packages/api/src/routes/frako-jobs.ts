import { Router, Request, Response } from "express";
import { supabase } from "../lib/supabase.js";
import { reportLatePayment } from "../lib/scoring-engine.js";

const router = Router();

/**
 * POST /api/v1/frako/jobs/process-late-payments
 * Job à exécuter quotidiennement (cron).
 * - Marque les paiements en retard (late_days, status='late')
 * - Signale à ScoreCongo pour impact sur le score
 * - Réduit la limite de crédit des comptes affectés
 */
router.post("/process-late-payments", async (_req: Request, res: Response) => {
  try {
    const today = new Date().toISOString().split("T")[0];

    const { data: overduePayments, error: fetchError } = await supabase
      .from("frako_payments")
      .select("id, order_id, amount, due_date")
      .eq("status", "pending")
      .lt("due_date", today);

    if (fetchError) {
      console.error("Frako jobs fetch error:", fetchError);
      return res.status(500).json({ error: "Erreur base de données" });
    }

    if (!overduePayments?.length) {
      return res.json({
        ok: true,
        processed: 0,
        message: "Aucun paiement en retard",
      });
    }

    const orderIds = [...new Set(overduePayments.map((p) => p.order_id))];
    const { data: orders } = await supabase
      .from("frako_orders")
      .select("id, frako_account_id")
      .in("id", orderIds);

    const orderMap = new Map(
      (orders ?? []).map((o) => [o.id, o.frako_account_id])
    );

    const accountIds = [...new Set((orders ?? []).map((o) => o.frako_account_id))];
    const { data: accounts } = await supabase
      .from("frako_accounts")
      .select("id, user_id, credit_limit")
      .in("id", accountIds);

    const accountMap = new Map(
      (accounts ?? []).map((a) => [a.id, { user_id: a.user_id, credit_limit: Number(a.credit_limit ?? 0) }])
    );

    const userIds = [...new Set((accounts ?? []).map((a) => a.user_id))];
    const { data: profiles } = await supabase
      .from("profiles")
      .select("id, nin")
      .in("id", userIds);

    const ninByUserId = new Map(
      (profiles ?? []).map((p) => [p.id, p.nin ?? null])
    );

    const accountPenalties = new Map<
      string,
      { nin: string | null; totalLateDays: number; creditLimit: number }
    >();

    for (const p of overduePayments) {
      const dueDate = new Date(p.due_date);
      const todayDate = new Date(today);
      const lateDays = Math.max(
        0,
        Math.floor((todayDate.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24))
      );

      await supabase
        .from("frako_payments")
        .update({ status: "late", late_days: lateDays })
        .eq("id", p.id);

      const accountId = orderMap.get(p.order_id);
      if (!accountId) continue;

      const account = accountMap.get(accountId);
      if (!account) continue;

      const nin = ninByUserId.get(account.user_id) ?? null;
      const existing = accountPenalties.get(accountId);
      const totalLateDays = (existing?.totalLateDays ?? 0) + lateDays;

      accountPenalties.set(accountId, {
        nin,
        totalLateDays,
        creditLimit: existing?.creditLimit ?? account.credit_limit,
      });

      if (nin) {
        await reportLatePayment(nin, lateDays, Number(p.amount));
      }
    }

    const PENALTY_PER_DAY = 5;
    for (const [accountId, data] of accountPenalties) {
      const penalty = Math.min(
        data.totalLateDays * PENALTY_PER_DAY,
        data.creditLimit
      );
      const newLimit = Math.max(0, data.creditLimit - penalty);

      await supabase
        .from("frako_accounts")
        .update({
          credit_limit: newLimit,
          updated_at: new Date().toISOString(),
        })
        .eq("id", accountId);
    }

    return res.json({
      ok: true,
      processed: overduePayments.length,
      accountsAffected: accountPenalties.size,
    });
  } catch (err) {
    console.error("Frako jobs process-late-payments error:", err);
    return res.status(500).json({
      error: "Erreur lors du traitement des retards",
      message: (err as Error).message,
    });
  }
});

export default router;
