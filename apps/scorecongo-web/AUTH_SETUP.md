# Configuration Auth Supabase (SMS OTP)

Pour activer la connexion par téléphone + SMS sur ScoreCongo :

## 1. Supabase Dashboard

1. Va dans **Authentication** → **Providers**
2. Active **Phone**
3. Configure le fournisseur SMS :
   - **Twilio** (recommandé) : crée un compte sur twilio.com, récupère Account SID, Auth Token, et le numéro de téléphone
   - Ou un autre fournisseur supporté par Supabase

## 2. Variables d'environnement

Dans `.env` (racine) ou `apps/scorecongo-web/.env.local` :

```
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=ton-anon-key
```

## 3. Format du numéro

Les numéros doivent être au format international : `+243812345678` (RDC)

## 4. Mode développement

Sans Twilio configuré, le bouton "Se connecter" affichera une erreur. La consultation de score fonctionne sans connexion.
