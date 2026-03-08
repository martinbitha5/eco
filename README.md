# Écosystème RDC — Fintech Congolais

Monorepo Turborepo contenant l'écosystème fintech congolais : ScoreCongo, Frako et Envol.

## Produits

### 1. ScoreCongo
Premier bureau de crédit de la RDC
- Site web public : `apps/scorecongo-web`
- Consultation de score par nom + NIN
- 3 consultations gratuites puis payant
- Score consolidé 0-850

### 2. Frako
BNPL (Buy Now Pay Later) congolais
- Application mobile : `apps/frako-app` (React Native / Expo)
- Landing marchands : `apps/frako-web`
- SDK pour marchands : `packages/frako-sdk`
- Paiement fractionné 3x ou 6x

### 3. Envol
Réservation de vols depuis Kinshasa
- Site web : `apps/envol-web`
- Connecté à Duffel API
- Paiement fractionné via Frako

### 4. Admin Dashboard
- `apps/admin-dashboard` — Gestion centralisée

## Structure

```
ecosysteme-rdc/
├── apps/
│   ├── scorecongo-web/    # Next.js — ScoreCongo
│   ├── envol-web/         # Next.js — Envol
│   ├── frako-web/         # Next.js — Landing Frako marchands
│   ├── frako-app/         # React Native / Expo — App Frako
│   └── admin-dashboard/   # Next.js — Admin
├── packages/
│   ├── api/               # Core API (Node.js + Express)
│   ├── scoring-engine/    # Microservice Python scoring
│   ├── frako-sdk/         # SDK JS pour marchands
│   ├── db/                # Supabase schema + migrations
│   └── shared/            # Types, utils, constantes
├── turbo.json
├── package.json
└── .env.example
```

## Prérequis

- Node.js 18+
- pnpm 8+
- Python 3.11+ (pour scoring-engine)
- Compte Supabase

## Installation

```bash
# Copier les variables d'environnement
cp .env.example .env
# Éditer .env avec vos clés

# Installer les dépendances
pnpm install

# Lancer le développement
pnpm dev
```

## Base de données

### Migrations

```bash
# Option 1 : Script automatique (après pnpm install)
pnpm run db:migrate

# Option 2 : Manuel — Supabase Dashboard → SQL Editor
# Copier le contenu de packages/db/supabase/migrations/00001_initial_schema.sql
# Voir packages/db/MIGRATION_MANUAL.md pour les détails
```

### Marchand de test (Frako)

Après la migration, insère un marchand pour tester les commandes BNPL :

```sql
INSERT INTO public.frako_merchants (name, api_key_hash, is_active)
VALUES ('Marchand Test', 'test_hash', true);
```

## Scripts

| Commande | Description |
|----------|-------------|
| `pnpm dev` | Lance tous les apps en mode dev |
| `pnpm build` | Build de tout le monorepo |
| `pnpm run db:migrate` | Applique les migrations Supabase |
| `pnpm --filter scorecongo-web dev` | Lance uniquement ScoreCongo |
| `pnpm --filter frako-app start` | Lance l'app Frako (Expo) |

## Stack

- **Frontend web** : Next.js 14, Tailwind CSS
- **Mobile** : React Native, Expo
- **Backend** : Node.js, Express
- **Base de données** : Supabase (PostgreSQL)
- **Auth** : Supabase Auth (SMS OTP)
- **Langage** : TypeScript
