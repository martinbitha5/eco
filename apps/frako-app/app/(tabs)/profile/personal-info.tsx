import { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../../contexts/AuthContext";
import { getMockProfile } from "../../../lib/mock-profile";

export default function PersonalInfoScreen() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<{ fullName: string; email?: string; nin?: string } | null>(null);

  useEffect(() => {
    getMockProfile().then(setProfile);
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.disclaimer}>
          La modification de certaines de ces informations peut vous obliger à vérifier votre identité auprès de Frako.
        </Text>
        <View style={styles.section}>
          <Text style={styles.label}>NOM</Text>
          <Text style={styles.value}>{profile?.fullName ?? "—"}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>NIN (NUMÉRO D'IDENTITÉ NATIONALE)</Text>
          <Text style={styles.value}>{profile?.nin ?? "—"}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>NUMÉRO DE TÉLÉPHONE CELLULAIRE</Text>
          <Text style={styles.value}>{user?.phone ?? "—"}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>COURRIEL</Text>
          <View style={styles.row}>
            <Text style={styles.value}>{profile?.email ?? "—"}</Text>
            <Text style={styles.chevron}>›</Text>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>ADRESSE DE FACTURATION</Text>
          <Text style={styles.value}>—</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f8f8" },
  scroll: { flex: 1 },
  disclaimer: {
    padding: 24,
    fontSize: 14,
    color: "#666",
    lineHeight: 22,
    backgroundColor: "#fff",
  },
  section: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    color: "#999",
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  value: { fontSize: 16, color: "#333" },
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  chevron: { fontSize: 20, color: "#999" },
});
