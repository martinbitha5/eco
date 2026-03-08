import { Router, Request, Response } from "express";
import { z } from "zod";
import { supabase } from "../lib/supabase.js";
import { calculateScore } from "../lib/scoring-engine.js";
import { FREE_CONSULTATIONS } from "../lib/constants.js";
import type { CreditScore, ScoreFactor } from "../lib/constants.js";

const router = Router();

const consultSchema = z.object({
  nin: z.string().min(1, "NIN requis").max(20),
  fullName: z.string().min(2, "Nom complet requis").max(255),
});

function scoreToGrade(score: number): "A" | "B" | "C" | "D" | "E" {
  if (score >= 700) return "A";
  if (score >= 600) return "B";
  if (score >= 500) return "C";
  if (score >= 400) return "D";
  return "E";
}

/**
 * POST /api/v1/scores/consult
 * Consultation du score par NIN + nom
 * 3 consultations gratuites par NIN, puis payant
 */
router.post("/consult", async (req: Request, res: Response) => {
  const parseResult = consultSchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({
      error: "Validation failed",
      details: parseResult.error.flatten().fieldErrors,
    });
  }

  const { nin, fullName } = parseResult.data;
  const requesterId = (req as Request & { userId?: string }).userId ?? null;

  try {
    // Compter les consultations existantes pour ce NIN
    const { count, error: countError } = await supabase
      .from("score_consultations")
      .select("*", { count: "exact", head: true })
      .eq("nin", nin);

    if (countError) {
      console.error("Count error:", countError);
      return res.status(500).json({ error: "Erreur base de données" });
    }

    const consultationCount = count ?? 0;
    const isFree = consultationCount < FREE_CONSULTATIONS;

    // Si dépassement du quota gratuit, exiger paiement
    if (!isFree) {
      return res.status(402).json({
        error: "Quota gratuit épuisé",
        message: `Vous avez utilisé vos ${FREE_CONSULTATIONS} consultations gratuites pour ce NIN.`,
        consultationPrice: Number(process.env.SCORECONGO_CONSULTATION_PRICE_USD ?? 2),
        paymentRequired: true,
      });
    }

    // Appeler le scoring engine
    let scoreResult = await calculateScore({
      nin,
      full_name: fullName,
    });

    // Mode mock : score factice si le scoring-engine Python est indisponible
    if (!scoreResult && process.env.MOCK_SCORE_ON_UNAVAILABLE === "true") {
      scoreResult = {
        score: 550,
        nin,
        factors: { mock: "Scoring engine indisponible - score de démonstration" },
      };
    }

    if (!scoreResult) {
      return res.status(503).json({
        error: "Service de scoring indisponible",
        message: "Veuillez réessayer plus tard. Démarrez le scoring-engine (Python) ou activez MOCK_SCORE_ON_UNAVAILABLE=true pour tester.",
      });
    }

    const { score, factors } = scoreResult;
    const grade = scoreToGrade(score);

    // Enregistrer la consultation
    await supabase.from("score_consultations").insert({
      nin,
      requester_id: requesterId,
      paid: !isFree,
    });

    // Optionnel : sauvegarder le score pour historique
    await supabase.from("credit_scores").insert({
      nin,
      full_name: fullName,
      score,
      raw_data: factors ? { factors } : null,
      source: "consultation",
    });

    const response: CreditScore = {
      nin,
      score,
      grade,
      factors: (factors
        ? Object.entries(factors).map(([name, value]) => ({
            name,
            weight: typeof value === "number" ? value : 0,
            impact: "neutral" as const,
          }))
        : []) as ScoreFactor[],
      lastUpdated: new Date().toISOString(),
    };

    return res.json({
      ...response,
      consultationNumber: consultationCount + 1,
      freeConsultationsRemaining: Math.max(0, FREE_CONSULTATIONS - consultationCount - 1),
    });
  } catch (err) {
    console.error("Score consultation error:", err);
    return res.status(500).json({ error: "Erreur lors de la consultation" });
  }
});

/**
 * GET /api/v1/scores/consultations/:nin/count
 * Vérifier le nombre de consultations pour un NIN (utile avant de payer)
 */
router.get("/consultations/:nin/count", async (req: Request, res: Response) => {
  const { nin } = req.params;
  if (!nin) {
    return res.status(400).json({ error: "NIN requis" });
  }

  const { count, error } = await supabase
    .from("score_consultations")
    .select("*", { count: "exact", head: true })
    .eq("nin", nin);

  if (error) {
    return res.status(500).json({ error: "Erreur base de données" });
  }

  return res.json({
    nin,
    consultationCount: count ?? 0,
    freeConsultationsRemaining: Math.max(0, FREE_CONSULTATIONS - (count ?? 0)),
    paymentRequired: (count ?? 0) >= FREE_CONSULTATIONS,
  });
});

export default router;
