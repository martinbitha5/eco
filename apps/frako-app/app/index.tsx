import { useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { router } from "expo-router";
import * as Linking from "expo-linking";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../contexts/AuthContext";
import { getFrakoAccount } from "../lib/api";

const WELCOME_KEY = "@frako_has_seen_welcome";

function parseConfirmUrl(url: string): { merchantId?: string; amount?: string; installments?: string } | null {
  try {
    const parsed = Linking.parse(url);
    if (parsed.path === "confirm" || parsed.hostname === "confirm") {
      return (parsed.queryParams ?? {}) as { merchantId?: string; amount?: string; installments?: string };
    }
  } catch {
    // ignore
  }
  return null;
}

export default function IndexScreen() {
  const { session, loading: authLoading } = useAuth();

  useEffect(() => {
    Linking.getInitialURL().then((url) => {
      if (url) {
        const params = parseConfirmUrl(url);
        if (params?.merchantId && params?.amount && session) {
          router.replace({ pathname: "/confirm", params });
          return;
        }
      }
    });
  }, [session]);

  useEffect(() => {
    if (authLoading) return;

    AsyncStorage.getItem(WELCOME_KEY).then((seen) => {
      if (seen !== "true") {
        router.replace("/welcome");
        return;
      }
      if (!session) {
        router.replace("/phone");
        return;
      }
      getFrakoAccount(session.access_token)
        .then((account) => {
          if (account) {
            router.replace("/(tabs)");
          } else {
            router.replace("/password");
          }
        })
        .catch(() => router.replace("/password"));
    });
  }, [session, authLoading]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0066CC" />
      <Text style={styles.text}>Chargement...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    marginTop: 16,
    fontSize: 16,
    color: "#666",
  },
});
