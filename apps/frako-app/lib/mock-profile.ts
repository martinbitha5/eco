import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY_PROFILE = "@frako_mock_profile";
const KEY_PAYMENTS = "@frako_mock_payments";

export interface MockProfile {
  fullName: string;
  email: string;
  nin?: string;
}

export interface MockPaymentMethod {
  type: "card" | "bank";
  label: string;
  last4: string;
}

export async function getMockProfile(): Promise<MockProfile | null> {
  const raw = await AsyncStorage.getItem(KEY_PROFILE);
  return raw ? JSON.parse(raw) : null;
}

export async function setMockProfile(data: MockProfile): Promise<void> {
  await AsyncStorage.setItem(KEY_PROFILE, JSON.stringify(data));
}

export async function getMockPayments(): Promise<MockPaymentMethod[]> {
  const raw = await AsyncStorage.getItem(KEY_PAYMENTS);
  return raw ? JSON.parse(raw) : [];
}

export async function setMockPayments(data: MockPaymentMethod[]): Promise<void> {
  await AsyncStorage.setItem(KEY_PAYMENTS, JSON.stringify(data));
}
