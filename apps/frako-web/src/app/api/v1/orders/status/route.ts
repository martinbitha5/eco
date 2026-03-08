/**
 * Route API: GET /api/v1/orders/status?token=xxx
 * Vérification du statut d'une commande
 * Authentification: Bearer Token (apiKey) optionnelle pour les marchands
 */

import { NextRequest, NextResponse } from "next/server";
import { getOrderByToken, getOrderById, getMerchantByApiKeyHash } from "@/lib/db";
import { hashApiKey } from "@/lib/utils";

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");
    const orderId = searchParams.get("orderId");

    if (!token && !orderId) {
      return NextResponse.json(
        { success: false, error: "Paramètre 'token' ou 'orderId' requis" },
        { status: 400 }
      );
    }

    // Récupérer la commande
    const order = token
      ? getOrderByToken(token)
      : orderId
      ? getOrderById(orderId)
      : null;

    if (!order) {
      return NextResponse.json(
        { success: false, error: "Commande non trouvée" },
        { status: 404 }
      );
    }

    // Vérifier l'authentification si fournie (pour les marchands)
    const authHeader = request.headers.get("Authorization");
    let isAuthorizedMerchant = false;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      const apiKey = authHeader.slice(7);
      const apiKeyHash = hashApiKey(apiKey);
      const merchant = getMerchantByApiKeyHash(apiKeyHash);

      if (merchant && merchant.merchantId === order.merchantId) {
        isAuthorizedMerchant = true;
      }
    }

    // Réponse différente selon l'autorisation
    if (isAuthorizedMerchant) {
      // Réponse complète pour le marchand authentifié
      return NextResponse.json({
        success: true,
        order: {
          id: order.id,
          orderToken: order.orderToken,
          externalOrderId: order.externalOrderId,
          amount: order.amount,
          currency: order.currency,
          installments: order.installments,
          status: order.status,
          metadata: order.metadata,
          createdAt: order.createdAt,
          updatedAt: order.updatedAt,
          completedAt: order.completedAt,
        },
      });
    } else {
      // Réponse limitée pour les requêtes publiques
      return NextResponse.json({
        success: true,
        order: {
          orderToken: order.orderToken,
          amount: order.amount,
          currency: order.currency,
          installments: order.installments,
          status: order.status,
        },
      });
    }
  } catch (error) {
    console.error("Erreur vérification statut:", error);
    return NextResponse.json(
      { success: false, error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
