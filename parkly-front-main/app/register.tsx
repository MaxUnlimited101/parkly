import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { REACT_APP_API_URL } from '@env';

interface User {
  username: string;
  email: string;
  firstName: string;
  role: string;
  lastName: string;
}

export default function RegisterPage() {
  const router = useRouter();
  const [username, setUsername] = useState("testMaster");
  const [firstName, setFirstName] = useState("Testee");
  const [lastName, setLastName] = useState("Testerson");
  const [email, setEmail] = useState("Test.ticles@test.com");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    if (!username || !email || !firstName || !lastName) {
      alert("All fields are required!");
      return;
    }

    setIsLoading(true);

    const user: User = {
      username,
      email,
      firstName,
      role: "USER",
      lastName,
    };

    try {
      const response = await fetch(`${REACT_APP_API_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        alert("Registered successfully!");
        router.replace("/login");
      } else {
        const errorData = await response.json();
        alert(`Failed to register: ${errorData.message || "Unknown error"}`);
      }
    } catch (error) {
      alert("Username or email already exists!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Parkly</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Username..."
          value={username}
          onChangeText={setUsername}
        />
        <Text style={styles.label}>First Name</Text>
        <TextInput
          style={styles.input}
          placeholder="First name..."
          value={firstName}
          onChangeText={setFirstName}
        />
        <Text style={styles.label}>Last Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Last name..."
          value={lastName}
          onChangeText={setLastName}
        />
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Email..."
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={handleRegister}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? "Signing Up..." : "Sign Up"}
          </Text>
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
    elevation: 5, // Adds shadow for Android
    shadowColor: "#000", // Shadow for iOS
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
});
