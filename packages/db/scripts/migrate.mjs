#!/usr/bin/env node
/**
 * Exécute les migrations SQL sur la base Supabase via DATABASE_URL
 * Usage: npm run db:migrate (depuis la racine du monorepo)
 */
import postgres from "postgres";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error("❌ DATABASE_URL manquant dans .env");
  process.exit(1);
}

async function migrate() {
  const sql = postgres(DATABASE_URL, {
    ssl: "require",
    max: 1,
  });

  try {
    console.log("📦 Connexion à Supabase...");

    const sqlPath = join(__dirname, "../supabase/migrations/00001_initial_schema.sql");
    const migration = readFileSync(sqlPath, "utf-8");

    await sql.unsafe(migration);
    console.log("✅ Migrations appliquées avec succès.");
  } catch (err) {
    console.error("❌ Erreur migration:", err.message);
    if (err.message?.includes("already exists")) {
      console.log("ℹ️  Les tables existent déjà. Pas d'action requise.");
    } else {
      process.exit(1);
    }
  } finally {
    await sql.end();
  }
}

migrate();
