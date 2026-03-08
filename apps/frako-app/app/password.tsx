import { useState, useEffect } from "react";
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
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MOCK_MODE } from "../lib/config";

const PASSWORD_KEY = "frako_app_password";

async function getStoredPassword(): Promise<string | null> {
  if (MOCK_MODE) {
    return AsyncStorage.getItem(`@${PASSWORD_KEY}`);
  }
  try {
    return await SecureStore.getItemAsync(PASSWORD_KEY);
  } catch {
    return await AsyncStorage.getItem(`@${PASSWORD_KEY}`);
  }
}

async function setStoredPassword(value: string): Promise<void> {
  if (MOCK_MODE) {
    await AsyncStorage.setItem(`@${PASSWORD_KEY}`, value);
    return;
  }
  try {
    await SecureStore.setItemAsync(PASSWORD_KEY, value);
  } catch {
    await AsyncStorage.setItem(`@${PASSWORD_KEY}`, value);
  }
}

export default function PasswordScreen() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    getStoredPassword().then((existing) => {
      setChecked(true);
      if (existing) {
        router.replace("/personal-info");
      }
    });
  }, []);

  async function handleSubmit() {
    if (password.length < 6) {
      Alert.alert("Erreur", "Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }
    if (password !== confirm) {
      Alert.alert("Erreur", "Les mots de passe ne correspondent pas.");
      return;
    }
    setLoading(true);
    try {
      await setStoredPassword(password);
      router.replace("/personal-info");
    } catch {
      Alert.alert("Erreur", "Impossible d'enregistrer le mot de passe.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Définir votre mot de passe</Text>
        <Text style={styles.subtitle}>
          Choisissez un mot de passe pour sécuriser l'accès à l'application.
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Mot de passe (min. 6 caractères)"
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Confirmer le mot de passe"
          placeholderTextColor="#999"
          value={confirm}
          onChangeText={setConfirm}
          secureTextEntry
          autoCapitalize="none"
        />
        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleSubmit}
          disabled={loading || password.length < 6 || password !== confirm}
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
