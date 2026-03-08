import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const PERIODS = [
  { id: "week", label: "Cette semaine" },
  { id: "month", label: "Ce mois-ci" },
  { id: "next", label: "Mois prochain" },
];

export default function ManageScreen() {
  const [activeTab, setActiveTab] = useState<"actif" | "termine">("actif");
  const [selectedPeriod, setSelectedPeriod] = useState("next");

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <Text style={styles.title}>Gérer</Text>
        <View style={styles.tabs}>
          <TouchableOpacity
            style={styles.tab}
            onPress={() => setActiveTab("actif")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "actif" && styles.tabTextActive,
              ]}
            >
              Actif
            </Text>
            {activeTab === "actif" && <View style={styles.tabUnderline} />}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tab}
            onPress={() => setActiveTab("termine")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "termine" && styles.tabTextActive,
              ]}
            >
              Terminé
            </Text>
            {activeTab === "termine" && <View style={styles.tabUnderline} />}
          </TouchableOpacity>
        </View>
      </View>

      {activeTab === "actif" ? (
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.balanceSection}>
            <Text style={styles.balanceLabel}>Solde total</Text>
            <Text style={styles.balanceAmount}>0,00 $</Text>
          </View>

          <Text style={styles.sectionTitle}>Paiement à venir</Text>
          <View style={styles.periodFilters}>
            {PERIODS.map((p) => (
              <TouchableOpacity
                key={p.id}
                style={[
                  styles.periodBtn,
                  selectedPeriod === p.id && styles.periodBtnActive,
                ]}
                onPress={() => setSelectedPeriod(p.id)}
              >
                <Text
                  style={[
                    styles.periodBtnText,
                    selectedPeriod === p.id && styles.periodBtnTextActive,
                  ]}
                >
                  {p.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.periodTotal}>Total: 0,00 $</Text>

          <Text style={[styles.sectionTitle, { marginTop: 24 }]}>
            Plans actuels
          </Text>
          <View style={styles.emptyCard}>
            <Text style={styles.emptyText}>
              Aucun plan actif. Vos achats en paiement fractionné apparaîtront ici.
            </Text>
          </View>
        </ScrollView>
      ) : (
        <View style={styles.emptyState}>
          <View style={styles.emptyIcon}>
            <Text style={styles.emptyEmoji}>✓</Text>
          </View>
          <Text style={styles.emptyStateText}>
            Vos plans apparaîtront ici une fois terminés.
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  header: {
    backgroundColor: "#fff",
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 16,
  },
  tabs: {
    flexDirection: "row",
    gap: 24,
  },
  tab: {
    paddingBottom: 8,
  },
  tabText: {
    fontSize: 16,
    color: "#666",
  },
  tabTextActive: {
    fontWeight: "600",
    color: "#000",
  },
  tabUnderline: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: "#0066FF",
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 48,
  },
  balanceSection: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 24,
    marginBottom: 24,
  },
  balanceLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#000",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    marginBottom: 12,
  },
  periodFilters: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 12,
  },
  periodBtn: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  periodBtnActive: {
    backgroundColor: "#333",
  },
  periodBtnText: {
    fontSize: 14,
    color: "#333",
  },
  periodBtnTextActive: {
    color: "#fff",
  },
  periodTotal: {
    fontSize: 16,
    color: "#666",
    marginBottom: 8,
  },
  emptyCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 24,
  },
  emptyText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 48,
  },
  emptyIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#e8f4ff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  emptyEmoji: {
    fontSize: 40,
    color: "#0066FF",
  },
  emptyStateText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
});
