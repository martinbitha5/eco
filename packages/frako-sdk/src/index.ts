/**
 * Frako SDK - Intégration BNPL pour marchands
 * FrakoButton : bouton de paiement fractionné
 */

export const FRAKO_SDK_VERSION = "0.0.1";

export interface FrakoConfig {
  merchantId: string;
  apiKey: string;
  environment?: "sandbox" | "production";
}

export interface FrakoCheckoutOptions {
  amount: number; // en USD ou CDF
  currency?: "USD" | "CDF";
  installments?: 3 | 6;
  orderId?: string;
  metadata?: Record<string, string>;
  successUrl?: string;
  cancelUrl?: string;
}

const FRAKO_DEEPLINK_BASE = {
  sandbox: "frako://checkout",
  production: "frako://checkout",
};

export function initFrako(config: FrakoConfig): void {
  if (typeof window === "undefined") return;
  (window as unknown as { __FRAKO_CONFIG__: FrakoConfig }).__FRAKO_CONFIG__ = config;
}

export function openFrakoCheckout(options: FrakoCheckoutOptions): void {
  const config = (window as unknown as { __FRAKO_CONFIG__?: FrakoConfig }).__FRAKO_CONFIG__;
  if (!config) {
    throw new Error("Frako SDK not initialized. Call initFrako() first.");
  }

  const base = FRAKO_DEEPLINK_BASE[config.environment ?? "sandbox"];
  const params = new URLSearchParams({
    amount: String(options.amount),
    currency: options.currency ?? "USD",
    installments: String(options.installments ?? 3),
    merchantId: config.merchantId,
  });

  if (options.orderId) params.set("orderId", options.orderId);
  if (options.successUrl) params.set("successUrl", options.successUrl);
  if (options.cancelUrl) params.set("cancelUrl", options.cancelUrl);

  const deeplink = `${base}?${params.toString()}`;
  window.location.href = deeplink;
}

// React component export (optional)
export { FrakoButton } from "./FrakoButton";
