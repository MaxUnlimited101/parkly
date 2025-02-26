import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ListRenderItem } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { REACT_APP_API_URL } from "../login";
import { router } from "expo-router";
import { Booking, ParkingArea, ParkingSpot, Reservation } from "@/app";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function HomePage() {

  const [bookings, setBookings] = useState<Booking[]>([]);

  

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const user_id = await AsyncStorage.getItem("userId");
        console.log(`${REACT_APP_API_URL}/reservations/user/${user_id}/page/0`);
        const reservationsResponse = await fetch(
          `${REACT_APP_API_URL}/reservations/user/${user_id}/page/0`
        );
        const data = await reservationsResponse.json();

        const reservationsData: Reservation[] = data.content || [];
        console.log("Fetched reservations:", reservationsData);



        const bookings: Booking[] = await Promise.all(
          reservationsData.map(async (reservation) => {
            const spotResponse = await fetch(
              `${REACT_APP_API_URL}/parking-spots/${reservation.parkingSpotId}`
            );
            const spotData: ParkingSpot = await spotResponse.json();

            const areaResponse = await fetch(
              `${REACT_APP_API_URL}/parking-areas/${spotData.parkingAreaId}`
            );
            const areaData: ParkingArea = await areaResponse.json();

            return {
              parkingSpot: spotData,
              parkingArea: areaData,
              reservation: reservation,
            };
          })
        );

        setBookings(bookings);
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
      }
    };

    fetchBookings();
  }, []);

  const handleBookingPress = (booking: Booking) => {
    router.push({
      pathname: "/(home)/booking",
      params: { 
        spotNumber: booking.parkingSpot.spotNumber,
        parkingArea: booking.parkingArea.name,
        address: booking.parkingArea.address,
        startTime: booking.reservation.startTime.toString(),
        endTime: booking.reservation.endTime.toString(),
        hourlyRate: booking.parkingArea.hourlyRate.toString(),
        resID: booking.reservation.id.toString(),
        spotID: booking.parkingSpot.Id.toString(),
      },
    });
  }

  const renderBooking: ListRenderItem<Booking> = ({ item }) => (
    <TouchableOpacity style={styles.bookingCard} onPress={() => handleBookingPress(item)} >
      <View>
        <Text style={styles.bookingTitle}>Spot Number: {item.parkingSpot.spotNumber}</Text>
        <Text style={styles.bookingDescription}>Parking Area: {item.parkingArea.name}</Text>
        <Text style={styles.bookingDescription}>Address: {item.parkingArea.address}</Text>
        <Text style={styles.bookingDescription}>Start Time: {item.reservation.startTime.toString()}</Text>
        <Text style={styles.bookingDescription}>End Time: {item.reservation.endTime.toString()}</Text>
      </View>
      <MaterialIcons name="chevron-right" size={24} color="black" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Current bookings</Text>
      <FlatList
        data={bookings}
        renderItem={renderBooking}
        keyExtractor={(item) => item.reservation.id.toString()}
        contentContainerStyle={styles.bookingsList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    backgroundColor: "#517A89",
    paddingBottom: 20,
    paddingTop: 40,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginLeft: 10,
  },
  sectionTitle: {
    backgroundColor: "#E0E0E0", 
    textAlign: "center",
    padding: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  bookingsList: {
    padding: 10,
  },
  bookingCard: {
    backgroundColor: "#F9F9F9",
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3, 
  },
  bookingTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  bookingDescription: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
  },
});