/**
 * Types pour l'API marchand
 */

export interface Merchant {
  id: string;
  name: string;
  email: string;
  phone?: string;
  businessNumber?: string; // RCCM ou équivalent
  website?: string;
  status: "pending" | "active" | "suspended" | "rejected";
  merchantId: string; // Identifiant public (ex: merch_abc123)
  apiKey: string; // Clé secrète (à hasher en prod)
  apiKeyHash: string;
  webhookUrl?: string;
  successUrl?: string;
  cancelUrl?: string;
  createdAt?: string;
  updatedAt?: string;
  verifiedAt?: string;
}

export interface MerchantRegisterRequest {
  name: string;
  email: string;
  phone: string;
  businessNumber: string;
  website?: string;
  password: string;
}

export interface MerchantRegisterResponse {
  success: boolean;
  message?: string;
  merchant?: {
    id: string;
    name: string;
    email: string;
    merchantId: string;
    apiKey: string; // Affiché UNE SEULE FOIS à la création
    status: string;
  };
  error?: string;
}

export interface OrderRequest {
  amount: number;
  currency: "USD" | "CDF";
  installments: 3 | 6;
  orderId?: string; // ID interne du marchand
  metadata?: Record<string, string>;
  customerEmail?: string;
  customerPhone?: string;
}

export interface OrderResponse {
  success: boolean;
  orderToken?: string;
  checkoutUrl?: string;
  expiresAt?: string;
  error?: string;
}

export interface Order {
  id: string;
  merchantId: string;
  orderToken: string;
  amount: number;
  currency: "USD" | "CDF";
  installments: 3 | 6;
  status: "pending" | "processing" | "completed" | "failed" | "cancelled";
  customerFrakoAccountId?: string;
  externalOrderId?: string; // ID du marchand
  metadata?: Record<string, string>;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
}

export interface WebhookPayload {
  event: "order.created" | "order.completed" | "order.failed" | "order.cancelled";
  merchantId: string;
  order: {
    id: string;
    externalOrderId?: string;
    amount: number;
    currency: string;
    status: string;
    completedAt?: string;
  };
  timestamp: string;
  signature: string; // HMAC pour vérifier l'authenticité
}

export interface ApiError {
  error: string;
  code: string;
  details?: string;
}
