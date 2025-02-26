import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { REACT_APP_API_URL } from "../login"; 
import { ParkingSpot } from "..";

const ParkingSpotsPage = () => {
  const { areaId, areaName, areaAddress, hourlyRate } = useLocalSearchParams();
  const [parkingSpots, setParkingSpots] = useState<ParkingSpot[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const fetchParkingSpots = async () => {
      try {
        const parsedAreaId = parseInt(areaId as string, 10);

        if (isNaN(parsedAreaId)) {
          console.error("Invalid areaId: not a number");
          return;
        }

        const response = await fetch(
          `${REACT_APP_API_URL}/parking-spots/pa?paId=${parsedAreaId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const extractedSpots: ParkingSpot[] = data || [];
        console.log("Fetched parking spots:", extractedSpots);

        setParkingSpots(extractedSpots || []);
      } catch (error) {
        console.error("Error fetching parking spots:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchParkingSpots();
  }, [areaId]);

  const handleSpotPress = (Spot: ParkingSpot) => {
    router.push({
      pathname: "/reservation",
      params: {
        spotNumber: Spot.spotNumber,
        parkingArea: areaName,
        address: areaAddress,
        spotId: Spot.Id,
        hourlyRate: hourlyRate

      },
    });
  };

  const renderSpot = ({ item }: { item: ParkingSpot }) => (
    <TouchableOpacity
      style={styles.spotItem}
      onPress={() => handleSpotPress(item)}
    >
      <Text style={styles.spotName}>Spot {item.spotNumber}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Parking Spots in {areaName}</Text>
      {loading ? (
      <ActivityIndicator style={styles.loader} />
      ) : parkingSpots.length === 0 ? (
      <Text>No available parking spots</Text>
      ) : (
      <FlatList
        data={parkingSpots}
        keyExtractor={(item) => item.Id.toString()}
        renderItem={renderSpot}
      />
      )}
    </View>
  );
};

export default ParkingSpotsPage;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 20, marginBottom: 20, textAlign: "center", marginTop: 20 },
  loader: { marginTop: 10 },
  spotItem: {
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  spotName: { fontSize: 16, fontWeight: "bold" },
});
