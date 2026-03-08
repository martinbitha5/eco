import AsyncStorage from "@react-native-async-storage/async-storage";
import { config, MOCK_MODE } from "./config";

const API_URL = config.apiUrl;
const MOCK_ACCOUNT_KEY = "@frako_mock_account";

export async function getFrakoAccount(accessToken: string) {
  if (MOCK_MODE) {
    const stored = await AsyncStorage.getItem(MOCK_ACCOUNT_KEY);
    return stored ? JSON.parse(stored) : null;
  }
  const res = await fetch(`${API_URL}/api/v1/frako/accounts/me`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Erreur chargement compte");
  return res.json();
}

export async function createFrakoAccount(
  accessToken: string,
  data: { bankAccountId?: string; debitCardToken?: string }
) {
  if (MOCK_MODE) {
    await AsyncStorage.setItem(
      MOCK_ACCOUNT_KEY,
      JSON.stringify({ id: "mock-account", is_verified: true, ...data })
    );
    return { id: "mock-account", is_verified: true };
  }
  const res = await fetch(`${API_URL}/api/v1/frako/accounts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error ?? "Erreur création compte");
  }
  return res.json();
}

export async function createFrakoOrder(
  accessToken: string,
  data: { merchantId: string; amount: number; installments: 3 | 6; metadata?: Record<string, unknown> }
) {
  const res = await fetch(`${API_URL}/api/v1/frako/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error ?? err.message ?? "Erreur création commande");
  }
  return res.json();
}
