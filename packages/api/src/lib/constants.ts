// Constantes partagées (dupliquées pour éviter la dépendance au build shared)
export const SCORE_MAX = 850;
export const FREE_CONSULTATIONS = 3;
export const FRAKO_INSTALLMENTS = [3, 6] as const;

export interface CreditScore {
  nin: string;
  score: number;
  grade: "A" | "B" | "C" | "D" | "E";
  factors: ScoreFactor[];
  lastUpdated: string;
}

export interface ScoreFactor {
  name: string;
  weight: number;
  impact: "positive" | "negative" | "neutral";
}
