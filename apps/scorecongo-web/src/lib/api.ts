const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export interface CreditScore {
  nin: string;
  score: number;
  grade: "A" | "B" | "C" | "D" | "E";
  factors: { name: string; weight: number; impact: string }[];
  lastUpdated: string;
  consultationNumber?: number;
  freeConsultationsRemaining?: number;
}

export type ConsultResponse = CreditScore;

export interface ConsultError {
  error: string;
  message?: string;
  paymentRequired?: boolean;
  consultationPrice?: number;
}

export async function consultScore(
  nin: string,
  fullName: string,
  accessToken?: string
): Promise<{ data?: CreditScore; error?: ConsultError; status: number }> {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (accessToken) headers["Authorization"] = `Bearer ${accessToken}`;

  const res = await fetch(`${API_URL}/api/v1/scores/consult`, {
    method: "POST",
    headers,
    body: JSON.stringify({ nin, fullName }),
  });

  const json = await res.json();

  if (!res.ok) {
    return {
      error: json as ConsultError,
      status: res.status,
    };
  }

  return {
    data: json as CreditScore,
    status: res.status,
  };
}
