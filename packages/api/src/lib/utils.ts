export function getScoreGrade(score: number): "A" | "B" | "C" | "D" | "E" {
  if (score >= 700) return "A";
  if (score >= 600) return "B";
  if (score >= 500) return "C";
  if (score >= 400) return "D";
  return "E";
}

export function generateEnvolReference(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let ref = "ENV";
  for (let i = 0; i < 8; i++) {
    ref += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return ref;
}
