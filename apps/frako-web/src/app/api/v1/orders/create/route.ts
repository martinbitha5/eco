/**
 * Route API: POST /api/v1/orders/create
 * Création d'une commande sécurisée avec orderToken
 * Authentification: Bearer Token (apiKey)
 */

import { NextRequest, NextResponse } from "next/server";
import type { OrderRequest, OrderResponse, Order } from "@/lib/types";
import { generateOrderToken, hashApiKey } from "@/lib/utils";
import { createOrder, getMerchantByApiKeyHash } from "@/lib/db";

export async function POST(
  request: NextRequest
): Promise<NextResponse<OrderResponse>> {
  try {
    // Vérification de l'authentification
    const authHeader = request.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { success: false, error: "Authentification requise. Utilisez: Bearer <apiKey>" },
        { status: 401 }
      );
    }

    const apiKey = authHeader.slice(7); // Retirer "Bearer "
    const apiKeyHash = hashApiKey(apiKey);

    // Vérifier la clé API
    const merchant = getMerchantByApiKeyHash(apiKeyHash);
    if (!merchant) {
      return NextResponse.json(
        { success: false, error: "Clé API invalide" },
        { status: 401 }
      );
    }

    // Vérifier que le marchand est actif
    if (merchant.status !== "active") {
      return NextResponse.json(
        { success: false, error: "Compte marchand non actif. Statut: " + merchant.status },
        { status: 403 }
      );
    }

    const body: OrderRequest = await request.json();

    // Validation
    if (!body.amount || body.amount <= 0) {
      return NextResponse.json(
        { success: false, error: "Montant invalide" },
        { status: 400 }
      );
    }

    if (!body.currency || !["USD", "CDF"].includes(body.currency)) {
      return NextResponse.json(
        { success: false, error: "Devise invalide. Utilisez USD ou CDF" },
        { status: 400 }
      );
    }

    if (!body.installments || ![3, 6].includes(body.installments)) {
      return NextResponse.json(
        { success: false, error: "Nombre d'échéances invalide. Utilisez 3 ou 6" },
        { status: 400 }
      );
    }

    // Générer le token et créer la commande
    const orderToken = generateOrderToken();
    const orderId = crypto.randomUUID();

    const orderData = {
      id: orderId,
      merchantId: merchant.merchantId,
      orderToken,
      amount: body.amount,
      currency: body.currency,
      installments: body.installments,
      status: "pending" as const,
      externalOrderId: body.orderId,
      metadata: body.metadata,
    };

    const order = createOrder(orderData);

    // Construire l'URL de checkout
    const baseUrl = process.env.FRAKO_CHECKOUT_URL || "frako://checkout";
    const checkoutUrl = `${baseUrl}?token=${orderToken}&merchantId=${merchant.merchantId}`;

    // La commande expire après 30 minutes
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000).toISOString();

    return NextResponse.json({
      success: true,
      orderToken,
      checkoutUrl,
      expiresAt,
    });
  } catch (error) {
    console.error("Erreur création commande:", error);
    return NextResponse.json(
      { success: false, error: "Erreur serveur lors de la création de la commande" },
      { status: 500 }
    );
  }
}
