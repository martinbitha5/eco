/**
 * Route API: POST /api/v1/webhooks/notify
 * Appelée par l'app Frako pour notifier d'un changement de statut
 * Cette route appelle ensuite le webhook configuré par le marchand
 */

import { NextRequest, NextResponse } from "next/server";
import type { WebhookPayload, Order } from "@/lib/types";
import { getOrderById, updateOrder, getMerchantByMerchantId } from "@/lib/db";
import { signWebhookPayload } from "@/lib/utils";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const { orderId, status, frakoAccountId } = body;

    if (!orderId || !status) {
      return NextResponse.json(
        { success: false, error: "orderId et status requis" },
        { status: 400 }
      );
    }

    // Récupérer la commande
    const order = getOrderById(orderId);
    if (!order) {
      return NextResponse.json(
        { success: false, error: "Commande non trouvée" },
        { status: 404 }
      );
    }

    // Mettre à jour le statut
    const updates: Partial<Order> = {
      status,
      customerFrakoAccountId: frakoAccountId,
    };

    if (status === "completed") {
      updates.completedAt = new Date().toISOString();
    }

    updateOrder(orderId, updates);

    // Récupérer le marchand pour le webhook
    const merchant = getMerchantByMerchantId(order.merchantId);
    if (!merchant) {
      return NextResponse.json(
        { success: false, error: "Marchand non trouvé" },
        { status: 404 }
      );
    }

    // Envoyer le webhook au marchand s'il a configuré une URL
    if (merchant.webhookUrl) {
      const payload: Omit<WebhookPayload, "signature"> = {
        event: `order.${status}` as WebhookPayload["event"],
        merchantId: merchant.merchantId,
        order: {
          id: order.id,
          externalOrderId: order.externalOrderId,
          amount: order.amount,
          currency: order.currency,
          status,
          completedAt: status === "completed" ? new Date().toISOString() : undefined,
        },
        timestamp: new Date().toISOString(),
      };

      // Signer le payload avec l'apiKeyHash comme secret
      const signature = signWebhookPayload(payload, merchant.apiKeyHash);

      const fullPayload: WebhookPayload = {
        ...payload,
        signature,
      };

      // Envoyer le webhook (async, ne bloque pas la réponse)
      fetch(merchant.webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Frako-Signature": signature,
          "X-Frako-Event": payload.event,
        },
        body: JSON.stringify(fullPayload),
      }).catch((err) => {
        console.error(`Erreur webhook marchand ${merchant.merchantId}:`, err);
      });
    }

    return NextResponse.json({
      success: true,
      message: "Notification traitée",
      webhookSent: !!merchant.webhookUrl,
    });
  } catch (error) {
    console.error("Erreur webhook notify:", error);
    return NextResponse.json(
      { success: false, error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
