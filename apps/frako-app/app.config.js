module.exports = {
  expo: {
    name: "Frako",
    slug: "frako-app",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    scheme: "frako",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#0066FF",
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.ecosysteme-rdc.frako",
    },
    plugins: ["expo-secure-store"],
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#0066FF",
      },
      package: "com.ecosysteme_rdc.frako",
    },
    plugins: ["expo-secure-store"],
    extra: {
      supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "https://qiczzjehnuqyztjukabd.supabase.co",
      supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
      apiUrl: process.env.EXPO_PUBLIC_API_URL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000",
    },
  },
};
