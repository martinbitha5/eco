"use client";

import React, { useState } from "react";
import type { FrakoCheckoutOptions } from "./index";

declare global {
  interface Window {
    __FRAKO_CONFIG__?: import("./index").FrakoConfig;
  }
}

export interface FrakoButtonProps extends FrakoCheckoutOptions {
  children?: React.ReactNode;
  className?: string;
  apiUrl?: string; // URL de l'API Frako (ex: https://api.frako.com)
}

export function FrakoButton({
  children,
  className,
  amount,
  apiUrl = "https://api.frako.com",
  ...options
}: FrakoButtonProps): JSX.Element {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    const config = window.__FRAKO_CONFIG__;
    if (!config) {
      throw new Error("Frako SDK not initialized. Call initFrako() first.");
    }

    setLoading(true);

    try {
      // 1. Créer la commande côté serveur pour obtenir un orderToken sécurisé
      const response = await fetch(`${apiUrl}/api/v1/orders/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${config.apiKey}`,
        },
        body: JSON.stringify({
          amount,
          currency: options.currency ?? "USD",
          installments: options.installments ?? 3,
          orderId: options.orderId,
          metadata: options.metadata,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || "Erreur lors de la création de la commande");
      }

      // 2. Rediriger vers l'app Frako avec le token sécurisé
      window.location.href = data.checkoutUrl;
    } catch (error) {
      console.error("Erreur Frako:", error);
      alert("Erreur lors du paiement: " + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      className={className ?? "frako-pay-button"}
      aria-label="Payer avec Frako"
    >
      {loading ? "Chargement..." : (children ?? "Payer en 3x ou 6x avec Frako")}
    </button>
  );
}
