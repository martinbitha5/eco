import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import { router } from "expo-router";
import { useAuth } from "../contexts/AuthContext";
import { createFrakoAccount } from "../lib/api";
import { setMockPayments } from "../lib/mock-profile";
import { MOCK_MODE } from "../lib/config";

export default function RegisterScreen() {
  const { session } = useAuth();
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!session) {
      router.replace("/phone");
      return;
    }
    if (!bankName.trim() || !accountNumber.trim() || !cardNumber.trim()) {
      Alert.alert("Erreur", "Remplissez tous les champs obligatoires.");
      return;
    }

    setLoading(true);
    try {
      // Pour le MVP : on envoie des identifiants simplifiés (en prod : tokenisation)
      const bankAccountId = `bank_${bankName.replace(/\s/g, "_")}_${accountNumber}`;
      const debitCardToken = `card_${cardNumber.slice(-4)}_${cardExpiry.replace(/\//g, "")}`;

      await createFrakoAccount(session.access_token, {
        bankAccountId,
        debitCardToken,
      });
      if (MOCK_MODE) {
        await setMockPayments([
          { type: "card", label: "MASTERCARD - CREDIT", last4: cardNumber.slice(-4) },
          { type: "bank", label: "COMPTE CHÈQUE", last4: accountNumber.slice(-4) },
        ]);
      }
      router.replace("/(tabs)");
    } catch (err) {
      Alert.alert("Erreur", (err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  if (!session) {
    router.replace("/phone");
    return null;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Compléter votre inscription</Text>
        <Text style={styles.subtitle}>
          Compte bancaire et carte débit pour le paiement fractionné.
        </Text>

        <Text style={styles.sectionLabel}>Compte bancaire</Text>
        <TextInput
          style={styles.input}
          placeholder="Nom de la banque (ex. Rawbank)"
          placeholderTextColor="#999"
          value={bankName}
          onChangeText={setBankName}
        />
        <TextInput
          style={styles.input}
          placeholder="Numéro de compte"
          placeholderTextColor="#999"
          value={accountNumber}
          onChangeText={setAccountNumber}
          keyboardType="number-pad"
        />

        <Text style={[styles.sectionLabel, { marginTop: 24 }]}>Carte débit</Text>
        <TextInput
          style={styles.input}
          placeholder="Numéro de carte (16 chiffres)"
          placeholderTextColor="#999"
          value={cardNumber}
          onChangeText={(t) => setCardNumber(t.replace(/\D/g, "").slice(0, 16))}
          keyboardType="number-pad"
          maxLength={16}
        />
        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder="MM/AA"
            placeholderTextColor="#999"
            value={cardExpiry}
            onChangeText={(t) => {
              const v = t.replace(/\D/g, "").slice(0, 4);
              if (v.length >= 2) {
                setCardExpiry(`${v.slice(0, 2)}/${v.slice(2)}`);
              } else {
                setCardExpiry(v);
              }
            }}
            keyboardType="number-pad"
            maxLength={5}
          />
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder="CVV"
            placeholderTextColor="#999"
            value={cardCvv}
            onChangeText={(t) => setCardCvv(t.replace(/\D/g, "").slice(0, 4))}
            keyboardType="number-pad"
            maxLength={4}
            secureTextEntry
          />
        </View>

        <Text style={styles.disclaimer}>
          Ces informations sont utilisées pour les prélèvements. En production, une solution de tokenisation sécurisée sera intégrée.
        </Text>

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Création..." : "Créer mon compte Frako"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 48,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    gap: 16,
  },
  halfInput: {
    flex: 1,
  },
  disclaimer: {
    fontSize: 12,
    color: "#999",
    marginBottom: 24,
    fontStyle: "italic",
  },
  button: {
    backgroundColor: "#0066CC",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
