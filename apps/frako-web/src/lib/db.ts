/**
 * Stockage temporaire en mémoire pour les marchands et commandes
 * En production: remplacer par PostgreSQL ou autre base de données
 */

import type { Merchant, Order } from "./types";

// Stockage en mémoire (remplacer par DB en prod)
const merchants: Map<string, Merchant> = new Map();
const orders: Map<string, Order> = new Map();

// Index pour lookup rapide par merchantId
const merchantByMerchantId: Map<string, string> = new Map(); // merchantId -> id interne

// Index pour lookup par apiKey hash
const merchantByApiKeyHash: Map<string, string> = new Map(); // hash -> id interne

/**
 * Crée un nouveau marchand
 */
export function createMerchant(merchant: Omit<Merchant, "createdAt" | "updatedAt">): Merchant {
  const now = new Date().toISOString();
  const newMerchant: Merchant = {
    ...merchant,
    createdAt: now,
    updatedAt: now,
  };

  merchants.set(merchant.id, newMerchant);
  merchantByMerchantId.set(merchant.merchantId, merchant.id);
  merchantByApiKeyHash.set(merchant.apiKeyHash, merchant.id);

  return newMerchant;
}

/**
 * Récupère un marchand par son ID interne
 */
export function getMerchantById(id: string): Merchant | null {
  return merchants.get(id) || null;
}

/**
 * Récupère un marchand par son merchantId public
 */
export function getMerchantByMerchantId(merchantId: string): Merchant | null {
  const id = merchantByMerchantId.get(merchantId);
  if (!id) return null;
  return merchants.get(id) || null;
}

/**
 * Récupère un marchand par le hash de son apiKey
 */
export function getMerchantByApiKeyHash(apiKeyHash: string): Merchant | null {
  const id = merchantByApiKeyHash.get(apiKeyHash);
  if (!id) return null;
  return merchants.get(id) || null;
}

/**
 * Met à jour un marchand
 */
export function updateMerchant(id: string, updates: Partial<Merchant>): Merchant | null {
  const merchant = merchants.get(id);
  if (!merchant) return null;

  const updated: Merchant = {
    ...merchant,
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  merchants.set(id, updated);
  return updated;
}

/**
 * Liste tous les marchands
 */
export function listMerchants(): Merchant[] {
  return Array.from(merchants.values());
}

/**
 * Crée une nouvelle commande
 */
export function createOrder(order: Omit<Order, "createdAt" | "updatedAt">): Order {
  const now = new Date().toISOString();
  const newOrder: Order = {
    ...order,
    createdAt: now,
    updatedAt: now,
  };

  orders.set(order.id, newOrder);
  return newOrder;
}

/**
 * Récupère une commande par son ID
 */
export function getOrderById(id: string): Order | null {
  return orders.get(id) || null;
}

/**
 * Récupère une commande par son orderToken
 */
export function getOrderByToken(token: string): Order | null {
  for (const order of orders.values()) {
    if (order.orderToken === token) {
      return order;
    }
  }
  return null;
}

/**
 * Met à jour une commande
 */
export function updateOrder(id: string, updates: Partial<Order>): Order | null {
  const order = orders.get(id);
  if (!order) return null;

  const updated: Order = {
    ...order,
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  orders.set(id, updated);
  return updated;
}

/**
 * Liste les commandes d'un marchand
 */
export function getOrdersByMerchant(merchantId: string): Order[] {
  return Array.from(orders.values()).filter(
    (order) => order.merchantId === merchantId
  );
}

/**
 * Supprime tout (pour tests)
 */
export function clearAll(): void {
  merchants.clear();
  orders.clear();
  merchantByMerchantId.clear();
  merchantByApiKeyHash.clear();
}
