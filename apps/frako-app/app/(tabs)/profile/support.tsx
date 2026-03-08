import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SupportScreen() {
  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <TouchableOpacity style={styles.card} activeOpacity={0.7}>
        <Text style={styles.icon}>📖</Text>
        <View style={styles.textBlock}>
          <Text style={styles.title}>Parcourez notre Centre d'aide</Text>
          <Text style={styles.subtitle}>Trouvez des réponses aux questions communes.</Text>
        </View>
        <Text style={styles.chevron}>›</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f8f8", padding: 24 },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 24,
  },
  icon: { fontSize: 32, marginRight: 16 },
  textBlock: { flex: 1 },
  title: { fontSize: 16, fontWeight: "600", color: "#333", marginBottom: 4 },
  subtitle: { fontSize: 14, color: "#666" },
  chevron: { fontSize: 24, color: "#999" },
});
