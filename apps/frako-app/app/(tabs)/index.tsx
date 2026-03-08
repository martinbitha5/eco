import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MERCHANTS = [
  { id: "1", name: "FlightHub", icon: "✈️" },
  { id: "2", name: "Apple", icon: "🍎" },
  { id: "3", name: "CheapOair", icon: "🧳" },
  { id: "4", name: "Thermomix", icon: "🍳" },
  { id: "5", name: "Amazon", icon: "📦" },
  { id: "6", name: "Fizz", icon: "📱" },
  { id: "7", name: "Cozey", icon: "🛋️" },
  { id: "8", name: "Envol", icon: "✈️" },
];

export default function HomeScreen() {
  const [search, setSearch] = useState("");

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <Text style={styles.logo}>Frako</Text>
      </View>

      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Trouver un magasin pour payer selon vos conditions"
          placeholderTextColor="#999"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.merchantGrid}
        showsVerticalScrollIndicator={false}
      >
        {MERCHANTS.filter(
          (m) =>
            !search.trim() ||
            m.name.toLowerCase().includes(search.toLowerCase())
        ).map((merchant) => (
          <TouchableOpacity
            key={merchant.id}
            style={styles.merchantCard}
            activeOpacity={0.7}
          >
            <View style={styles.merchantIcon}>
              <Text style={styles.merchantEmoji}>{merchant.icon}</Text>
            </View>
            <Text style={styles.merchantName} numberOfLines={1}>
              {merchant.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 16,
    alignItems: "center",
  },
  logo: {
    fontSize: 28,
    fontWeight: "700",
    color: "#000",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 24,
    marginBottom: 24,
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    padding: 0,
  },
  scroll: {
    flex: 1,
  },
  merchantGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 24,
    paddingBottom: 100,
    gap: 24,
  },
  merchantCard: {
    width: "22%",
    alignItems: "center",
  },
  merchantIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  merchantEmoji: {
    fontSize: 28,
  },
  merchantName: {
    fontSize: 12,
    color: "#333",
    textAlign: "center",
  },
});
