import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

const MENU_ITEMS = [
  { id: "personal-info", label: "Renseignements personnels", icon: "👤" },
  { id: "payment-methods", label: "Modes de paiement", icon: "👛" },
  { id: "auto-payment", label: "Paramètres du paiement automatique", icon: "🔄" },
  { id: "login-options", label: "Options de connexion", icon: "🔗" },
  { id: "other-settings", label: "Autres paramètres", icon: "⚙️" },
  { id: "legal", label: "Mentions légales", icon: "⚖️" },
  { id: "support", label: "Soutien", icon: "❓" },
];

export default function ProfileIndexScreen() {
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {MENU_ITEMS.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.menuItem}
            activeOpacity={0.7}
            onPress={() => router.push(`/profile/${item.id}`)}
          >
            <Text style={styles.menuIcon}>{item.icon}</Text>
            <Text style={styles.menuLabel}>{item.label}</Text>
            <Text style={styles.menuChevron}>›</Text>
          </TouchableOpacity>
        ))}

        <View style={styles.legalSection}>
          <Text style={styles.legalText}>
            En utilisant cette application, j'accepte les{" "}
            <Text style={styles.legalLink}>Conditions d'utilisation</Text> de Frako.
          </Text>
          <Text style={styles.copyright}>Tous droits réservés © 2026 Frako, RDC</Text>
          <Text style={styles.version}>VERSION 1.0.0</Text>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  scroll: { flex: 1 },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  menuIcon: { fontSize: 20, marginRight: 16 },
  menuLabel: { flex: 1, fontSize: 16, color: "#333" },
  menuChevron: { fontSize: 20, color: "#999" },
  legalSection: { padding: 24, marginTop: 16 },
  legalText: { fontSize: 14, color: "#666", lineHeight: 22, marginBottom: 12 },
  legalLink: { fontWeight: "600", textDecorationLine: "underline", color: "#0066FF" },
  copyright: { fontSize: 12, color: "#999", marginBottom: 4 },
  version: { fontSize: 12, color: "#999" },
});
