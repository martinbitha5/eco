import { useState, useEffect } from "react";
import { MOCK_MODE } from "../lib/config";
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
import { supabase } from "../lib/supabase";
import { setMockProfile } from "../lib/mock-profile";

export default function PersonalInfoScreen() {
  const { session } = useAuth();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [nin, setNin] = useState("");
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!session?.user?.id) return;
    if (MOCK_MODE) {
      setChecked(true);
      return;
    }
    supabase
      .from("profiles")
      .select("full_name")
      .eq("id", session.user.id)
      .single()
      .then(({ data }) => {
        setChecked(true);
        if (data?.full_name) {
          router.replace("/register");
        }
      })
      .catch(() => setChecked(true));
  }, [session?.user?.id]);

  async function handleSubmit() {
    if (!session?.user?.id) {
      router.replace("/phone");
      return;
    }
    if (!fullName.trim()) {
      Alert.alert("Erreur", "Veuillez entrer votre nom complet.");
      return;
    }
    if (!nin.trim()) {
      Alert.alert("Erreur", "Veuillez entrer votre numéro NIN (identité nationale).");
      return;
    }
    setLoading(true);
    try {
      if (MOCK_MODE) {
        await setMockProfile({
          fullName: fullName.trim(),
          email: email.trim(),
          nin: nin.trim(),
        });
        router.replace("/register");
        return;
      }
      const { error } = await supabase.from("profiles").upsert(
        {
          id: session.user.id,
          phone: session.user.phone ?? "",
          full_name: fullName.trim(),
          email: email.trim() || null,
          nin: nin.trim() || null,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "id" }
      );
      if (error) throw error;
      router.replace("/register");
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
      <View style={styles.content}>
        <Text style={styles.title}>Vos informations</Text>
        <Text style={styles.subtitle}>
          Renseignez vos informations personnelles pour finaliser votre inscription.
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Nom complet"
          placeholderTextColor="#999"
          value={fullName}
          onChangeText={setFullName}
          autoCapitalize="words"
        />
        <TextInput
          style={styles.input}
          placeholder="NIN (numéro d'identité nationale)"
          placeholderTextColor="#999"
          value={nin}
          onChangeText={setNin}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Email (optionnel)"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleSubmit}
          disabled={loading || !fullName.trim() || !nin.trim()}
        >
          <Text style={styles.buttonText}>
            {loading ? "Enregistrement..." : "Continuer"}
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
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#0066CC",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
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
