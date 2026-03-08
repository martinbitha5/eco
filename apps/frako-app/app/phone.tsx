import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { router } from "expo-router";
import { useAuth } from "../contexts/AuthContext";

export default function PhoneScreen() {
  const { signInWithPhone } = useAuth();
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSendOtp() {
    if (!phone.trim()) return;
    setLoading(true);
    const { error } = await signInWithPhone(phone.trim());
    setLoading(false);
    if (error) {
      Alert.alert("Erreur", error.message);
      return;
    }
    router.push({ pathname: "/otp", params: { phone: phone.trim() } });
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Frako</Text>
        <Text style={styles.subtitle}>
          Paiement fractionné 3x ou 6x. Connectez-vous pour commencer.
        </Text>
        <TextInput
          style={styles.input}
          placeholder="+243 812 345 678"
          placeholderTextColor="#999"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          autoComplete="tel"
        />
        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleSendOtp}
          disabled={loading || !phone.trim()}
        >
          <Text style={styles.buttonText}>
            {loading ? "Envoi du code..." : "Recevoir le code SMS"}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    padding: 24,
  },
  content: {
    maxWidth: 400,
    width: "100%",
    alignSelf: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#0066CC",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 32,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 16,
    fontSize: 18,
    marginBottom: 24,
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
