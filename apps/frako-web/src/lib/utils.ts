/**
 * Utilitaires pour l'API marchand
 */

import crypto from "crypto";

/**
 * Génère un merchantId unique (format: merch_xxxxxx)
 */
export function generateMerchantId(): string {
  const random = crypto.randomBytes(6).toString("hex").slice(0, 8);
  return `merch_${random}`;
}

/**
 * Génère une apiKey sécurisée (format: frk_live_xxxx ou frk_test_xxxx)
 */
export function generateApiKey(environment: "live" | "test" = "test"): string {
  const prefix = environment === "live" ? "frk_live_" : "frk_test_";
  const random = crypto.randomBytes(32).toString("base64url").slice(0, 48);
  return `${prefix}${random}`;
}

/**
 * Hash une apiKey pour stockage (ne pas stocker en clair!)
 */
export function hashApiKey(apiKey: string): string {
  return crypto.createHash("sha256").update(apiKey).digest("hex");
}

/**
 * Génère un orderToken unique
 */
export function generateOrderToken(): string {
  const random = crypto.randomBytes(24).toString("base64url").slice(0, 32);
  return `ord_${random}`;
}

/**
 * Vérifie si une apiKey correspond au hash stocké
 */
export function verifyApiKey(apiKey: string, hash: string): boolean {
  return hashApiKey(apiKey) === hash;
}

/**
 * Extrait le merchantId de l'apiKey (pour lookup rapide)
 */
export function extractMerchantIdFromApiKey(apiKey: string): string | null {
  // En production, on ferait un lookup DB avec le hash
  // Ici simplifié pour la démo
  return null;
}

/**
 * Signe un webhook payload avec HMAC
 */
export function signWebhookPayload(
  payload: object,
  secret: string
): string {
  const data = JSON.stringify(payload);
  return crypto.createHmac("sha256", secret).update(data).digest("hex");
}

/**
 * Vérifie la signature d'un webhook
 */
export function verifyWebhookSignature(
  payload: object,
  signature: string,
  secret: string
): boolean {
  const expected = signWebhookPayload(payload, secret);
  return crypto.timingSafeEqual(
    Buffer.from(signature, "hex"),
    Buffer.from(expected, "hex")
  );
}

/**
 * Validation email basique
 */
export function isValidEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

/**
 * Validation numéro de téléphone (format RDC)
 */
export function isValidPhone(phone: string): boolean {
  // Format: +243xxx ou 0xxx ou xxx
  const cleaned = phone.replace(/\s/g, "").replace(/^\+243/, "0");
  return /^0[89]\d{8}$/.test(cleaned);
}
