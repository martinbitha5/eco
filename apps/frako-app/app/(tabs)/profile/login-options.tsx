import { useState } from "react";
import { View, Text, TouchableOpacity, Switch, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginOptionsScreen() {
  const [touchId, setTouchId] = useState(true);

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.label}>Utiliser Touch ID</Text>
          <Switch
            value={touchId}
            onValueChange={setTouchId}
            trackColor={{ false: "#ddd", true: "#0066FF" }}
            thumbColor="#fff"
          />
        </View>
        <View style={styles.divider} />
        <TouchableOpacity style={styles.row} activeOpacity={0.7}>
          <Text style={styles.label}>Modifier ou désactiver votre code secret</Text>
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
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  label: { fontSize: 16, color: "#333" },
  chevron: { fontSize: 20, color: "#999" },
  divider: { height: 1, backgroundColor: "#f0f0f0", marginLeft: 16 },
});
