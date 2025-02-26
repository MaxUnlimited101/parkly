import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage"; 

export const REACT_APP_API_URL = process.env.REACT_APP_API_URL;
export const REACT_APP_CARLY_URL = process.env.REACT_APP_CARLY_URL;

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      console.log(`${REACT_APP_API_URL}/users/login`);
      const response = await fetch(`${REACT_APP_API_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username }),
      });
      
      if (response.ok) {
        const data = await response.json();
        await AsyncStorage.setItem("userId", data.userId.toString());
        await AsyncStorage.setItem("username", data.username);
        await AsyncStorage.setItem("role", data.role);
        await AsyncStorage.setItem("email", data.email);
        router.replace("/home");
      } else {
        const errorMessage = await response.text();
        setError(errorMessage || "Invalid login credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred during login. Please try again.");
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Parkly</Text>
      <View style={styles.card}>
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Username..."
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#517A89", 
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    width: "90%",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  label: {
    alignSelf: "flex-start",
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#F9F9F9",
    borderRadius: 5,
    padding: 10,
    width: "100%",
    marginBottom: 15,
  },
  button: {
    backgroundColor: "black",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  error: {
    color: "red",
    marginBottom: 10,
    fontSize: 14,
    textAlign: "center",
  },
});
