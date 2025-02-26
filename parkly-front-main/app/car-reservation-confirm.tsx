import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, Alert, ActivityIndicator } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { REACT_APP_API_URL } from "./login";

const CarReservationConfirm = () => {
  const router = useRouter();
  const { carId, carName, carBrand, dailyRate, startDate, startTime, endDate, endTime } = useLocalSearchParams();

  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserEmail = async () => {
      try {
        const storedEmail = await AsyncStorage.getItem("email");
        if (storedEmail) {
          setUserEmail(storedEmail);
        } else {
          Alert.alert("Error", "User email not found.");
        }
      } catch (error) {
        console.error("Error fetching user email:", error);
      }
    };

    fetchUserEmail();
  }, []);

  const handleReservation = async () => {
    if (!userEmail) {
      Alert.alert("Error", "User email is required.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${REACT_APP_API_URL}/cars`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userEmail: userEmail,
          carId: carId,
          startTime: `${startDate}T${startTime}:00`,
          endTime: `${endDate}T${endTime}:00`,
        }),
      });

      if (!response.ok) {
        throw new Error(`Reservation failed: ${response.status}`);
      }

      Alert.alert("Success", "Car reserved successfully!");
      router.push("/(tabs)/home");
    } catch (error) {
      console.error("Error reserving car:", error);
      Alert.alert("Error", "Failed to reserve the car.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Confirm Reservation</Text>
      <Text style={styles.carDetails}>{carBrand} {carName}</Text>
      <Text style={styles.carDetails}>Daily Rate: ${dailyRate}</Text>
      <Text style={styles.carDetails}>Start Time: {startDate} {startTime}</Text>
      <Text style={styles.carDetails}>End Time: {endDate} {endTime}</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button title="Confirm Reservation" onPress={handleReservation} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  carDetails: { fontSize: 16, marginBottom: 10 },
});

export default CarReservationConfirm;
