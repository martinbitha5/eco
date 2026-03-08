import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";
import { useAuth } from "../contexts/AuthContext";

export default function HomeScreen() {
  const { session, signOut } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Frako</Text>
        <TouchableOpacity onPress={() => signOut().then(() => router.replace("/phone"))}>
          <Text style={styles.signOut}>Déconnexion</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Text style={styles.phone}>📱 {session?.user?.phone}</Text>
        <Text style={styles.subtitle}>Compte actif</Text>
        <Text style={styles.info}>
          Lorsqu&apos;un marchand propose le paiement Frako, vous serez redirigé ici pour confirmer.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 24,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0066CC",
  },
  signOut: {
    color: "#666",
    fontSize: 14,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  phone: {
    fontSize: 18,
    color: "#333",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#0066CC",
    fontWeight: "600",
    marginBottom: 24,
  },
  info: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    lineHeight: 22,
  },
});
