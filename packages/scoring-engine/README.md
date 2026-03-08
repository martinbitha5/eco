# ScoreCongo — Scoring Engine

Microservice Python pour le calcul du score de crédit 0-850.

## Prérequis

**Python 3.11 ou 3.12** (recommandé). Python 3.14 peut poser des problèmes avec pydantic (compilation Rust requise).

Si tu as plusieurs versions de Python :
- Windows : `py -3.12 -m pip install -r requirements.txt`
- Ou installe Python 3.12 depuis [python.org](https://www.python.org/downloads/)

## Installation

```bash
cd packages/scoring-engine
py -m pip install -r requirements.txt
# ou : python -m pip install -r requirements.txt
```

## Lancement

```bash
py -m uvicorn main:app --reload --port 5000
```
