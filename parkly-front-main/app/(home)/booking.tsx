import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { REACT_APP_API_URL } from "../login";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function BookingPage() {
    const { spotNumber, parkingArea, address, startTime, endTime, hourlyRate, resID, spotID } = useLocalSearchParams();
    console.log("Booking details:", { spotNumber, parkingArea, address, startTime, endTime, hourlyRate, resID, spotID });

    // Calculate cost based on booking duration and hourly rate
    const start_Time = new Date(startTime as string);
    const end_Time = new Date(endTime as string);
    const hours = (end_Time.getTime() - start_Time.getTime()) / (1000 * 60 * 60);
    const cost = parseFloat(hourlyRate as string) * hours;

    // State to manage update form visibility and values
    const [isUpdating, setIsUpdating] = useState(false);
    const [newStartTime, setNewStartTime] = useState(startTime as string);
    const [newEndTime, setNewEndTime] = useState(endTime as string);

    const handleCancelBooking = async () => {
        try {
            const response = await fetch(`${REACT_APP_API_URL}/reservations/${resID}`, {
                method: "DELETE",
            });
            if (response.ok) {
                Alert.alert("Success", "Booking canceled successfully.");
                router.back();
            } else {
                Alert.alert("Error", "Failed to cancel booking.");
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "Error canceling booking.");
        }
    };

    const handleModifyBooking = async () => {
        try {
            console.log(resID)
            const response = await fetch(`${REACT_APP_API_URL}/reservations/${resID}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    parkingSpotID: spotID,
                    userID: await AsyncStorage.getItem("userId"),
                    startTime: newStartTime,
                    endTime: newEndTime,
                    totalCost: cost,
                }),
            });
            const data = await response.json();
            console.log("Modify booking response:", data);
            if (response.ok) {
                Alert.alert("Success", "Booking updated successfully.");
                router.back();
            } else {
                Alert.alert("Error", "Failed to update booking.");
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "Error updating booking.");
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
                <TouchableOpacity style={styles.button} onPress={handleCancelBooking}>
                    <MaterialIcons name="cancel" size={24} color="#fff" />
                    <Text style={styles.buttonText}>Cancel Booking</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => setIsUpdating(true)}>
                    <MaterialIcons name="edit" size={24} color="#fff" />
                    <Text style={styles.buttonText}>Modify Booking</Text>
                </TouchableOpacity>

                {isUpdating && (
                    <View style={styles.updateForm}>
                        <Text style={styles.formTitle}>Modify Booking</Text>
                        <TextInput
                            style={styles.input}
                            value={newStartTime}
                            onChangeText={setNewStartTime}
                            placeholder="New Start Time"
                        />
                        <TextInput
                            style={styles.input}
                            value={newEndTime}
                            onChangeText={setNewEndTime}
                            placeholder="New End Time"
                        />
                        <TouchableOpacity style={styles.button} onPress={handleModifyBooking}>
                            <MaterialIcons name="save" size={24} color="#fff" />
                            <Text style={styles.buttonText}>Save Changes</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => setIsUpdating(false)}>
                            <MaterialIcons name="cancel" size={24} color="#fff" />
                            <Text style={styles.buttonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                )}

                <TouchableOpacity style={styles.button} onPress={() => router.back()}>
                    <MaterialIcons name="arrow-back" size={24} color="#fff" />
                    <Text style={styles.buttonText}>Go Back</Text>
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