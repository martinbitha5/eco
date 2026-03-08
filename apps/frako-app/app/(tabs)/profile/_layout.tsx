import { Stack } from "expo-router";

export default function ProfileLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerBackTitle: "Retour",
        headerTitleStyle: { fontWeight: "600", fontSize: 18 },
      }}
    >
      <Stack.Screen name="index" options={{ title: "Profil", headerShown: true }} />
      <Stack.Screen name="personal-info" options={{ title: "Renseignements personnels" }} />
      <Stack.Screen name="payment-methods" options={{ title: "Modes de paiement" }} />
      <Stack.Screen name="auto-payment" options={{ title: "Paramètres du paiement automatique" }} />
      <Stack.Screen name="login-options" options={{ title: "Options de connexion" }} />
      <Stack.Screen name="other-settings" options={{ title: "Autres paramètres" }} />
      <Stack.Screen name="legal" options={{ title: "Mentions légales" }} />
      <Stack.Screen name="support" options={{ title: "Obtenir de l'aide" }} />
    </Stack>
  );
}
