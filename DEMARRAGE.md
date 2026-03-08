# Démarrage rapide (Windows)

## 1. Installer les dépendances Node.js

```powershell
cd C:\Users\GOBLAIRE\Desktop\eco
npm install
```

> Si `npm install` échoue ou si des modules sont introuvables, supprime `node_modules` et réessaie :
> ```powershell
> Remove-Item -Recurse -Force node_modules
> npm install
> ```

## 2. Lancer les 3 services (3 terminaux)

### Terminal 1 — Scoring Engine (Python)

```powershell
cd C:\Users\GOBLAIRE\Desktop\eco\packages\scoring-engine
py -m pip install -r requirements.txt
py -m uvicorn main:app --reload --port 5000
```

> Si `py` ne fonctionne pas, essaie `python -m pip` et `python -m uvicorn` à la place.
> Si Python n'est pas installé : [python.org/downloads](https://www.python.org/downloads/)

### Terminal 2 — API Core

```powershell
cd C:\Users\GOBLAIRE\Desktop\eco
npm run dev --workspace=@ecosysteme-rdc/api
```

### Terminal 3 — ScoreCongo (site web)

```powershell
cd C:\Users\GOBLAIRE\Desktop\eco
npm run dev --workspace=scorecongo-web
```

## 3. Tester

- Ouvre **http://localhost:3000**
- Saisis un nom (ex. Jean Kabongo) et un NIN (ex. 001-1234567890-12)
- Clique sur « Consulter mon score »

---

## Dépannage

| Erreur | Solution |
|--------|----------|
| `pip n'est pas reconnu` | Utilise `py -m pip` ou `python -m pip` |
| `tsx` / `next` introuvable | Exécute `npm install` à la racine du projet |
| `Cannot find module` | Supprime `node_modules`, puis relance `npm install` |
| Port déjà utilisé | Change le port dans la commande (ex. `--port 3001`) |
