import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LegalScreen() {
  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <View style={styles.card}>
        <TouchableOpacity style={styles.item} activeOpacity={0.7}>
          <Text style={styles.icon}>📄</Text>
          <Text style={styles.label}>Politique de confidentialité</Text>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity style={styles.item} activeOpacity={0.7}>
          <Text style={styles.icon}>📋</Text>
          <Text style={styles.label}>Modalités d'utilisation</Text>
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
  label: { flex: 1, fontSize: 16, color: "#333" },
  chevron: { fontSize: 20, color: "#999" },
  divider: { height: 1, backgroundColor: "#f0f0f0", marginLeft: 56 },
});
