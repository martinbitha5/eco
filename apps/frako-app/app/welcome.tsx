import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";

const WELCOME_KEY = "@frako_has_seen_welcome";

export default function WelcomeScreen() {
  async function handleEnter() {
    await AsyncStorage.setItem(WELCOME_KEY, "true");
    router.replace("/phone");
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Text style={styles.logo}>Frako</Text>
        <TouchableOpacity style={styles.helpBtn}>
          <Text style={styles.helpIcon}>?</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>
        Achetez maintenant, payez au fil du temps avec Frako
      </Text>

      <View style={styles.features}>
        <View style={styles.feature}>
          <View style={styles.featureIcon}>
            <Text style={styles.featureEmoji}>📋</Text>
          </View>
          <Text style={styles.featureTitle}>Devenez préadmissible rapidement</Text>
          <Text style={styles.featureDesc}>
            Donnez-nous quelques informations et obtenez une décision pour un plan de paiement en quelques secondes.
          </Text>
        </View>
        <View style={styles.feature}>
          <View style={styles.featureIcon}>
            <Text style={styles.featureEmoji}>👍</Text>
          </View>
          <Text style={styles.featureTitle}>Votre cote de crédit vous appartient</Text>
          <Text style={styles.featureDesc}>
            Le fait d'être préadmissible ne nuira pas à votre crédit, même en cas de refus.
          </Text>
        </View>
        <View style={styles.feature}>
          <View style={styles.featureIcon}>
            <Text style={styles.featureEmoji}>🔍</Text>
          </View>
          <Text style={styles.featureTitle}>Pas de frais cachés, pas de frais de retard</Text>
          <Text style={styles.featureDesc}>
            Sans surprise—vous saurez à l'avance ce que vous devez payer.
          </Text>
        </View>
      </View>

      <TouchableOpacity style={styles.enterBtn} onPress={handleEnter}>
        <Text style={styles.enterBtnText}>Entrer</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D1B2A",
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 40,
  },
  logo: {
    fontSize: 24,
    fontWeight: "700",
    color: "#fff",
  },
  helpBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  helpIcon: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    lineHeight: 36,
    marginBottom: 40,
  },
  features: {
    flex: 1,
    gap: 28,
  },
  feature: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  featureEmoji: {
    fontSize: 24,
  },
  featureTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 6,
  },
  featureDesc: {
    flex: 1,
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
    lineHeight: 22,
  },
  enterBtn: {
    backgroundColor: "#0066FF",
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: "center",
  },
  enterBtnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
