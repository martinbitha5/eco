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
import { router, useLocalSearchParams } from "expo-router";
import { useAuth } from "../contexts/AuthContext";

export default function OtpScreen() {
  const { phone } = useLocalSearchParams<{ phone: string }>();
  const { verifyOtp } = useAuth();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleVerify() {
    if (!phone || otp.length !== 6) return;
    setLoading(true);
    const { error } = await verifyOtp(phone, otp);
    setLoading(false);
    if (error) {
      Alert.alert("Erreur", error.message);
      return;
    }
    router.replace("/password");
  }

  if (!phone) {
    router.replace("/phone");
    return null;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Code de vérification</Text>
        <Text style={styles.subtitle}>
          Un code à 6 chiffres a été envoyé au {phone}
        </Text>
        <TextInput
          style={styles.input}
          placeholder="123456"
          placeholderTextColor="#999"
          value={otp}
          onChangeText={(t) => setOtp(t.replace(/\D/g, "").slice(0, 6))}
          keyboardType="number-pad"
          maxLength={6}
        />
        <TouchableOpacity
          style={[styles.button, (loading || otp.length !== 6) && styles.buttonDisabled]}
          onPress={handleVerify}
          disabled={loading || otp.length !== 6}
        >
          <Text style={styles.buttonText}>
            {loading ? "Vérification..." : "Valider"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backText}>Retour</Text>
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
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 16,
    fontSize: 24,
    textAlign: "center",
    letterSpacing: 8,
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
  backButton: {
    marginTop: 16,
    alignItems: "center",
  },
  backText: {
    color: "#0066CC",
    fontSize: 14,
  },
});
