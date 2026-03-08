# Migration manuelle Supabase

Si `npm run db:migrate` échoue, exécute le SQL manuellement :

1. Ouvre [Supabase Dashboard](https://supabase.com/dashboard) → ton projet
2. Va dans **SQL Editor** → **New query**
3. Copie-colle le contenu de `supabase/migrations/00001_initial_schema.sql`
4. Clique sur **Run**

## Marchand de test (Frako)

Après la migration, insère un marchand de test pour pouvoir créer des commandes BNPL :

```sql
INSERT INTO public.frako_merchants (name, api_key_hash, is_active)
VALUES ('Marchand Test', 'test_hash_placeholder', true);
```
