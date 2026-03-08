import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getMockPayments, type MockPaymentMethod } from "../../../lib/mock-profile";

export default function PaymentMethodsScreen() {
  const [payments, setPayments] = useState<MockPaymentMethod[]>([]);

  useEffect(() => {
    getMockPayments().then(setPayments);
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <View style={styles.card}>
        {payments.map((p, i) => (
          <View key={`${p.type}-${p.last4}-${i}`}>
            {i > 0 && <View style={styles.divider} />}
            <TouchableOpacity style={styles.item} activeOpacity={0.7}>
              <Text style={styles.icon}>{p.type === "card" ? "💳" : "🔄"}</Text>
              <View style={styles.textBlock}>
                <Text style={styles.label}>{p.label}</Text>
                <Text style={styles.detail}>•••• {p.last4}</Text>
              </View>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>
          </View>
        ))}
        {payments.length > 0 && <View style={styles.divider} />}
        <TouchableOpacity style={styles.addItem} activeOpacity={0.7}>
          <Text style={styles.addText}>Ajouter un mode de paiement</Text>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f8f8", padding: 24 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  icon: { fontSize: 24, marginRight: 16 },
  textBlock: { flex: 1 },
  label: { fontSize: 16, fontWeight: "600", color: "#333", marginBottom: 2 },
  detail: { fontSize: 14, color: "#666" },
  chevron: { fontSize: 20, color: "#999" },
  divider: { height: 1, backgroundColor: "#f0f0f0", marginLeft: 56 },
  addItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  addText: { flex: 1, fontSize: 16, color: "#0066FF", fontWeight: "500" },
});
