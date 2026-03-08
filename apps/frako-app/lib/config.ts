import Constants from "expo-constants";

const extra = Constants.expoConfig?.extra ?? {};

/** Mode démo : tout le flux passe sans Supabase/SMS/API. Mettre false pour la prod. */
export const MOCK_MODE = true;

export const config = {
  supabaseUrl: extra.supabaseUrl ?? "https://qiczzjehnuqyztjukabd.supabase.co",
  supabaseAnonKey: extra.supabaseAnonKey ?? "",
  apiUrl: extra.apiUrl ?? "http://localhost:4000",
};
