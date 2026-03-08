import { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useAuth } from "../contexts/AuthContext";
import { createFrakoOrder } from "../lib/api";

export default function ConfirmScreen() {
  const { session } = useAuth();
  const params = useLocalSearchParams<{
    merchantId?: string;
    amount?: string;
    installments?: string;
  }>();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const merchantId = params.merchantId;
  const amount = params.amount ? parseFloat(params.amount) : 0;
  const installments = params.installments === "6" ? 6 : 3;

  useEffect(() => {
    if (!merchantId || !amount || !session) {
      if (!session) {
        router.replace("/phone");
      } else if (!merchantId || !amount) {
        setError("Paramètres invalides");
      }
      return;
    }
  }, [merchantId, amount, session]);

  async function handleConfirm() {
    if (!session || !merchantId || amount <= 0) return;
    setLoading(true);
    setError(null);
    try {
      await createFrakoOrder(session.access_token, {
        merchantId,
        amount,
        installments,
      });
      setSuccess(true);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  if (!session) return null;

  if (error && !merchantId) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>{error}</Text>
        <TouchableOpacity style={styles.button} onPress={() => router.replace("/home")}>
          <Text style={styles.buttonText}>Retour</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (success) {
    return (
      <View style={styles.container}>
        <Text style={styles.success}>✅ Paiement confirmé</Text>
        <Text style={styles.amount}>
          {amount} USD en {installments}x
        </Text>
        <TouchableOpacity style={styles.button} onPress={() => router.replace("/home")}>
          <Text style={styles.buttonText}>Retour à l&apos;accueil</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Confirmer le paiement</Text>
      <Text style={styles.amount}>
        {amount} USD en {installments}x
      </Text>
      <Text style={styles.merchant}>Marchand : {merchantId}</Text>
      {error && <Text style={styles.error}>{error}</Text>}
      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleConfirm}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Confirmer</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity style={styles.cancelButton} onPress={() => router.replace("/home")}>
        <Text style={styles.cancelText}>Annuler</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 24,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 16,
  },
  amount: {
    fontSize: 20,
    color: "#0066CC",
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 8,
  },
  merchant: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 24,
  },
  error: {
    fontSize: 14,
    color: "#c00",
    textAlign: "center",
    marginBottom: 16,
  },
  success: {
    fontSize: 24,
    color: "#0a0",
    textAlign: "center",
    marginBottom: 16,
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
  cancelButton: {
    marginTop: 16,
    alignItems: "center",
  },
  cancelText: {
    color: "#666",
    fontSize: 14,
  },
});
