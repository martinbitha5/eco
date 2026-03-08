/**
 * Charge le .env depuis la racine du monorepo (l'API s'exécute dans packages/api)
 */
import { config } from "dotenv";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
// dist/env-loader.js -> remonter à la racine eco/
config({ path: resolve(__dirname, "../../../.env") });
