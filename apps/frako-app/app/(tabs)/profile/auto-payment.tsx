import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AutoPaymentScreen() {
  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.icon}>💲</Text>
            <View>
              <Text style={styles.bold}>Paiement automatique: </Text>
              <Text style={styles.active}>ACTIVÉ</Text>
            </View>
          </View>
          <Text style={styles.merchant}>Alternative Airlines</Text>
          <Text style={styles.amount}>168,56 $</Text>
          <View style={styles.dateRow}>
            <Text style={styles.date}>✓ Paiement automatique le 2 avr. 2026</Text>
          </View>
          <Text style={styles.bank}>Compte bancaire •••• 9706</Text>
          <TouchableOpacity activeOpacity={0.7}>
            <Text style={styles.link}>Modifier le paiement automatique pour 1 prêt</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.info}>
          Pour consulter les calendriers de paiement ou modifier la fonction de paiement automatique pour les prêts individuels, accédez à l'onglet Gérer.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f8f8" },
  scroll: { flex: 1, padding: 24 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 24,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#eee",
  },
  row: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  icon: { fontSize: 24, marginRight: 12 },
  bold: { fontSize: 14, fontWeight: "600", color: "#333" },
  active: { fontSize: 14, fontWeight: "600", color: "#22c55e" },
  merchant: { fontSize: 18, fontWeight: "600", color: "#333", marginBottom: 4 },
  amount: { fontSize: 16, color: "#333", marginBottom: 8 },
  dateRow: { marginBottom: 8 },
  date: { fontSize: 14, color: "#22c55e", fontWeight: "500" },
  bank: { fontSize: 14, color: "#666", marginBottom: 16 },
  link: { fontSize: 14, color: "#0066FF", fontWeight: "500" },
  info: { fontSize: 14, color: "#666", lineHeight: 22 },
});
