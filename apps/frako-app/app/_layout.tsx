import { Stack } from "expo-router";
import { AuthProvider } from "../contexts/AuthContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="welcome" />
        <Stack.Screen name="phone" />
        <Stack.Screen name="otp" />
        <Stack.Screen name="password" />
        <Stack.Screen name="personal-info" />
        <Stack.Screen name="register" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="confirm" />
      </Stack>
    </AuthProvider>
  );
}
