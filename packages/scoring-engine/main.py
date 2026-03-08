"""
ScoreCongo - Credit Scoring Engine
Microservice Python pour le calcul du score de crédit 0-850
"""

from collections import defaultdict
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(title="ScoreCongo Scoring Engine", version="0.0.1")

# Stockage en mémoire des retards de paiement (nin -> liste de {late_days, amount})
_late_events: dict[str, list[dict]] = defaultdict(list)


class ScoreRequest(BaseModel):
    nin: str
    full_name: str
    bank_data: dict | None = None


class ScoreResponse(BaseModel):
    score: int  # 0-850
    nin: str
    factors: dict | None = None


class LatePaymentRequest(BaseModel):
    nin: str
    late_days: int
    amount: float


@app.get("/health")
def health():
    return {"status": "ok", "service": "scoring-engine"}


@app.post("/score/report-late")
def report_late_payment(request: LatePaymentRequest):
    """
    Signale un retard de paiement pour impact futur sur le score.
    """
    _late_events[request.nin].append({
        "late_days": request.late_days,
        "amount": request.amount,
    })
    return {"ok": True, "nin": request.nin}


def _apply_late_penalty(base_score: int, nin: str) -> int:
    """Réduit le score selon les retards enregistrés (pas de frais, impact score uniquement)."""
    events = _late_events.get(nin, [])
    if not events:
        return base_score
    total_late_days = sum(e["late_days"] for e in events)
    # -2 points par jour de retard total, plancher 300
    penalty = min(total_late_days * 2, base_score - 300)
    return max(300, base_score - penalty)


@app.post("/score/calculate", response_model=ScoreResponse)
def calculate_score(request: ScoreRequest):
    """
    Calcule le score de crédit consolidé à partir du NIN et des données bancaires.
    Les retards de paiement Frako impactent négativement le score.
    """
    base_score = 500
    score = _apply_late_penalty(base_score, request.nin)
    factors = {"base": "placeholder"}
    if _late_events.get(request.nin):
        factors["late_penalty"] = f"{len(_late_events[request.nin])} retard(s) enregistré(s)"
    return ScoreResponse(
        score=min(850, score),
        nin=request.nin,
        factors=factors,
    )
