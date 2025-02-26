import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { REACT_APP_API_URL } from "./login";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Reservation {
  id: number;
  start_time: string;
  end_time: string;
  total_cost: number;
  parking_spot_id: number;
  user_id: number;
  date: string;
}

const ReservationPage = () => {
  const router = useRouter(); // For navigation
  const { spotId, spotNumber, parkingArea, address, hourlyRate } =
    useLocalSearchParams();
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [datePickerMode, setDatePickerMode] = useState<"start" | "end">(
    "start"
  );
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [timePickerMode, setTimePickerMode] = useState<"start" | "end">(
    "start"
  );
  const [spotReservations, setSpotReservations] = useState<Reservation[]>([]);

  const showDatePicker = (mode: "start" | "end") => {
    setDatePickerMode(mode);
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => setDatePickerVisibility(false);

  const showTimePicker = (mode: "start" | "end") => {
    setTimePickerMode(mode);
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => setTimePickerVisibility(false);

  const fetchReservations = async (): Promise<Reservation[]> => {
    try {
      const response = await fetch(`${REACT_APP_API_URL}/reservations/page/0`);
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error("Error fetching reservations:", error);
      return [];
    }
  };

  const handleDateConfirm = async (selectedDate: Date) => {
    const selectedDateString = selectedDate.toISOString().split("T")[0];
    if (datePickerMode === "start") {
      setStartDate(selectedDateString);
    } else {
      setEndDate(selectedDateString);
    }
    hideDatePicker();

    const allReservations = await fetchReservations();
    const filteredReservations = allReservations.filter(
      (reservation: Reservation) =>
        Number(reservation.parking_spot_id) === Number(spotId) &&
        (reservation.date === selectedDateString ||
          reservation.date === startDate)
    );
    setSpotReservations(filteredReservations);
  };

  const handleTimeConfirm = (selectedTime: Date) => {
    const formattedTime = selectedTime
      .toTimeString()
      .split(" ")[0]
      .substring(0, 5);
    if (timePickerMode === "start") {
      setStartTime(formattedTime);
    } else {
      setEndTime(formattedTime);
    }
    hideTimePicker();
  };

  const handleReservation = async () => {
    if (!startDate || !startTime || !endDate || !endTime) {
          Alert.alert("Error", "Please select start and end date and time.");
          return;
        }
    router.push({
      pathname: "/payment",
      params: {
        spotNumber,
        parkingArea,
        address,
        startTime,
        endTime,
        hourlyRate,
        spotId,
        startDate,
        endDate,
      },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reserve Spot {spotId}</Text>

      <Button
        title="Select Start Date"
        onPress={() => showDatePicker("start")}
      />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        minimumDate={new Date()}
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
      />
      <Text style={styles.selectedText}>
        {startDate ? `Start Date: ${startDate}` : "No start date selected"}
      </Text>

      <Button
        title="Select Start Time"
        onPress={() => showTimePicker("start")}
      />
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleTimeConfirm}
        onCancel={hideTimePicker}
      />
      <Text style={styles.selectedText}>
        {startTime ? `Start Time: ${startTime}` : "No start time selected"}
      </Text>

      <Button title="Select End Date" onPress={() => showDatePicker("end")} />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        minimumDate={startDate ? new Date(startDate) : new Date()}
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
      />
      <Text style={styles.selectedText}>
        {endDate ? `End Date: ${endDate}` : "No end date selected"}
      </Text>

      <Button title="Select End Time" onPress={() => showTimePicker("end")} />
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleTimeConfirm}
        onCancel={hideTimePicker}
      />
      <Text style={styles.selectedText}>
        {endTime ? `End Time: ${endTime}` : "No end time selected"}
      </Text>

      <Button title="Reserve Now" onPress={handleReservation} />

      {spotReservations.length > 0 && (
        <View style={styles.reservationsContainer}>
          <Text style={styles.subtitle}>Reservations on selected dates:</Text>
          {spotReservations.map((res) => (
            <Text key={res.id} style={styles.reservationItem}>
              {`Start: ${res.start_time}, End: ${res.end_time}, Cost: ${res.total_cost}`}
            </Text>
          ))}
        </View>
      )}
    </View>
  );
};

export default ReservationPage;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    marginTop: 20,
  },
  selectedText: {
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
  },
  reservationsContainer: {
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  reservationItem: {
    fontSize: 14,
    marginBottom: 5,
  },
});
