import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { REACT_APP_API_URL } from "./login";
export default function PaymentPage() {
  const {
    spotNumber,
    parkingArea,
    address,
    startTime,
    endTime,
    hourlyRate,
    spotId,
    startDate,
    endDate,
  } = useLocalSearchParams();
  console.log("Booking details:", {
    spotNumber,
    parkingArea,
    address,
    startTime,
    spotId,
    endTime,
    hourlyRate,
    startDate,
    endDate,
  });

  // Calculate cost based on booking duration and hourly rate
  const start_Time = new Date(`${startDate}T${startTime}:00`);
  const end_Time = new Date(`${endDate}T${endTime}:00`);
  const hours = (end_Time.getTime() - start_Time.getTime()) / (1000 * 60 * 60);
  const cost = parseFloat(hourlyRate.toString()) * hours;

  const handleBookingConfirmation = async () => {
    const userId = await AsyncStorage.getItem("userId");
    try {
        console.log("Booking details:", {parkingSpotId: Number(spotId),
            userId: Number(userId),
            startTime: `${startDate}T${startTime}:00`,
            endTime: `${endDate}T${endTime}:00`,
            totalCost: 10,})
      const response = await fetch(`${REACT_APP_API_URL}/reservations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          parkingSpotId: Number(spotId),
          userId: Number(userId),
          startTime: `${startDate}T${startTime}:00`,
          endTime: `${endDate}T${endTime}:00`,
          totalCost: 10,
        }),
      });

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      // Show popup asking about car reservation
      Alert.alert(
        "Success",
        "Parking spot reserved successfully! Do you also want to reserve a car?",
        [
          {
            text: "No",
            style: "cancel",
          },
          {
            text: "Yes",
            onPress: () => {
              router.push(
                `/car-reservation?spotId=${spotId}&startDate=${startDate}&startTime=${startTime}&endDate=${endDate}&endTime=${endTime}`
              );
            },
          },
        ]
      );
    } catch (error) {
      console.error("Error reserving parking spot:", error);
      Alert.alert("Error", "Failed to reserve the parking spot.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Booking Details</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Spot Number:</Text>
          <Text style={styles.value}>{spotNumber}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Parking Area:</Text>
          <Text style={styles.value}>{parkingArea}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Address:</Text>
          <Text style={styles.value}>{address}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Start Date:</Text>
          <Text style={styles.value}>{startDate}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>End Date:</Text>
          <Text style={styles.value}>{endDate}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Start Time:</Text>
          <Text style={styles.value}>{startTime}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>End Time:</Text>
          <Text style={styles.value}>{endTime}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Cost:</Text>
          <Text style={styles.value}>${cost.toFixed(2)}</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={24} color="#fff" />
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={handleBookingConfirmation}
        >
          <MaterialIcons name="check" size={24} color="#fff" />
          <Text style={styles.buttonText}>Confirm Booking</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  card: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 15,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  value: {
    fontSize: 16,
    color: "#555",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    marginLeft: 5,
    fontSize: 16,
    fontWeight: "600",
  },
  updateForm: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#eef",
    borderRadius: 10,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginBottom: 10,
    borderRadius: 5,
  },
});
