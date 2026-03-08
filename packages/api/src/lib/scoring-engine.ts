const SCORING_ENGINE_URL =
  process.env.SCORING_ENGINE_URL ?? "http://localhost:5000";
const SCORING_ENGINE_API_KEY = process.env.SCORING_ENGINE_API_KEY;

export interface ScoreRequest {
  nin: string;
  full_name: string;
  bank_data?: Record<string, unknown>;
}

export interface ScoreResult {
  score: number;
  nin: string;
  factors?: Record<string, unknown>;
}

export async function calculateScore(
  request: ScoreRequest
): Promise<ScoreResult | null> {
  try {
    const res = await fetch(`${SCORING_ENGINE_URL}/score/calculate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(SCORING_ENGINE_API_KEY && {
          Authorization: `Bearer ${SCORING_ENGINE_API_KEY}`,
        }),
      },
      body: JSON.stringify(request),
    });

    if (!res.ok) {
      console.error(`Scoring engine error: ${res.status}`, await res.text());
      return null;
    }

    return (await res.json()) as ScoreResult;
  } catch (err) {
    console.error("Scoring engine unreachable:", err);
    return null;
  }
}

export async function checkScoringEngineHealth(): Promise<boolean> {
  try {
    const res = await fetch(`${SCORING_ENGINE_URL}/health`);
    return res.ok;
  } catch {
    return false;
  }
}

/** Signale un retard de paiement à ScoreCongo pour impact sur le score futur */
export async function reportLatePayment(
  nin: string,
  lateDays: number,
  amount: number
): Promise<boolean> {
  try {
    const res = await fetch(`${SCORING_ENGINE_URL}/score/report-late`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(SCORING_ENGINE_API_KEY && {
          Authorization: `Bearer ${SCORING_ENGINE_API_KEY}`,
        }),
      },
      body: JSON.stringify({ nin, late_days: lateDays, amount }),
    });
    return res.ok;
  } catch (err) {
    console.error("Scoring engine report-late unreachable:", err);
    return false;
  }
}
