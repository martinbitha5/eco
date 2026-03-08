/**
 * Route API: POST /api/v1/merchants/register
 * Inscription d'un nouveau marchand (depuis le formulaire d'accueil)
 */

import { NextRequest, NextResponse } from "next/server";
import type { MerchantRegisterResponse, Merchant } from "@/lib/types";
import { generateMerchantId, generateApiKey, hashApiKey, isValidEmail } from "@/lib/utils";
import { createMerchant, getMerchantByMerchantId } from "@/lib/db";
import { sendMerchantConfirmationEmail } from "@/lib/email";

interface ApplyBody {
  firstName: string;
  lastName: string;
  email: string;
  website?: string;
  industry?: string;
  country?: string;
  revenue?: string;
  avgOrder?: string;
  platform?: string;
}

export async function POST(
  request: NextRequest
): Promise<NextResponse<MerchantRegisterResponse>> {
  try {
    const body: ApplyBody = await request.json();

    if (!body.firstName || !body.lastName || !body.email) {
      return NextResponse.json(
        { success: false, error: "Prénom, nom et email sont obligatoires." },
        { status: 400 }
      );
    }

    if (!isValidEmail(body.email)) {
      return NextResponse.json(
        { success: false, error: "Format d'email invalide." },
        { status: 400 }
      );
    }

    const merchantId = generateMerchantId();
    const apiKey = generateApiKey("test");
    const apiKeyHash = hashApiKey(apiKey);

    if (getMerchantByMerchantId(merchantId)) {
      return NextResponse.json(
        { success: false, error: "Erreur de génération ID, veuillez réessayer." },
        { status: 500 }
      );
    }

    const merchant: Merchant = {
      id: crypto.randomUUID(),
      name: `${body.firstName} ${body.lastName}`,
      email: body.email,
      phone: "",
      businessNumber: "",
      website: body.website,
      status: "pending",
      merchantId,
      apiKey,
      apiKeyHash,
      webhookUrl: undefined,
      successUrl: undefined,
      cancelUrl: undefined,
    };

    createMerchant(merchant);

    try {
      await sendMerchantConfirmationEmail({
        to: merchant.email,
        firstName: body.firstName,
        merchantId: merchant.merchantId,
        apiKey: merchant.apiKey,
      });
    } catch (emailErr) {
      console.error("Échec envoi email de confirmation:", emailErr);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Demande reçue. Un email de confirmation a été envoyé.",
        merchant: {
          id: merchant.id,
          name: merchant.name,
          email: merchant.email,
          merchantId: merchant.merchantId,
          apiKey: merchant.apiKey,
          status: merchant.status,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erreur inscription marchand:", error);
    return NextResponse.json(
      { success: false, error: "Erreur serveur lors de l'inscription." },
      { status: 500 }
    );
  }
}
