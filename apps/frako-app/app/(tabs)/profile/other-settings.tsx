import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OtherSettingsScreen() {
  const [alerts, setAlerts] = useState(true);
  const [personalized, setPersonalized] = useState(true);

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.label}>Alertes pour les offres et les transactions</Text>
          <Switch
            value={alerts}
            onValueChange={setAlerts}
            trackColor={{ false: "#e5e5e5", true: "#0066FF" }}
            thumbColor="#fff"
          />
        </View>
        <View style={styles.divider} />
        <View style={styles.row}>
          <Text style={styles.label}>Services personnalisés</Text>
          <Switch
            value={personalized}
            onValueChange={setPersonalized}
            trackColor={{ false: "#e5e5e5", true: "#0066FF" }}
            thumbColor="#fff"
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>LANGUE</Text>
        <TouchableOpacity style={styles.row} activeOpacity={0.7}>
          <Text style={styles.label}>Français</Text>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.dangerRow} activeOpacity={0.7}>
        <Text style={styles.dangerIcon}>⚠</Text>
        <Text style={styles.dangerText}>Fermer le compte</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f8f8", padding: 24 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  label: { fontSize: 16, color: "#333", flex: 1 },
  chevron: { fontSize: 20, color: "#999" },
  divider: { height: 1, backgroundColor: "#f0f0f0", marginLeft: 16 },
  section: {
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "600",
    color: "#999",
    letterSpacing: 0.5,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  dangerRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
  },
  dangerIcon: { fontSize: 18, marginRight: 12, color: "#dc2626" },
  dangerText: { fontSize: 16, color: "#dc2626", fontWeight: "500" },
});
