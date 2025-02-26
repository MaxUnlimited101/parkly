import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert, Image, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { REACT_APP_API_URL, REACT_APP_CARLY_URL } from "./login";
import { ParkingArea, ParkingSpot } from "./index";

interface Car {
  id: string;
  model: {
    brandName: string;
    name: string;
    dailyRate: number;
  };
  location: {
    fullAddress: string;
  };
  imageUrl: string;
}

const CarReservationPage = () => {
  const router = useRouter();
  const { spotId, startDate, startTime, endDate, endTime} = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const [cars, setCars] = useState<Car[]>([]);
  const [parkingAreaDetails, setParkingAreaDetails] = useState<ParkingArea | null>(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        console.log(`Fetching parking spot details for spotId: ${spotId}`);

        // Fetch Parking Spot Details
        const spotResponse = await fetch(`${REACT_APP_API_URL}/parking-spots/${spotId}`);
        if (!spotResponse.ok) throw new Error("Failed to fetch parking spot details.");
        const spotData: ParkingSpot = await spotResponse.json();
        const parkingAreaId = spotData.parkingAreaId;

        // Fetch Parking Area Details
        const areaResponse = await fetch(`${REACT_APP_API_URL}/parking-areas/${parkingAreaId}`);
        if (!areaResponse.ok) throw new Error("Failed to fetch parking area details.");
        const areaData: ParkingArea = await areaResponse.json();
        setParkingAreaDetails(areaData);

        // Fetch Cars based on parking area coordinates
        const { longitude, latitude } = areaData;
        const carsResponse = await fetch(
          `${REACT_APP_API_URL}/cars/search/0?size=10&sortDirection=asc&long=${longitude}&lat=${latitude}`
        );
        if (!carsResponse.ok) throw new Error("Failed to fetch cars.");
        
        const carsData = await carsResponse.json();
        setCars(carsData.content || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [spotId]);

  const handleCarSelection = (car: Car) => {
    router.push({
      pathname: "/car-reservation-confirm",
      params: {
        carId: car.id,
        carName: car.model.name,
        carBrand: car.model.brandName,
        dailyRate: car.model.dailyRate,
        startDate,
        startTime,
        endDate,
        endTime
      },
    });
  };

  const renderCar = ({ item }: { item: Car }) => (
    <TouchableOpacity style={styles.carCard} onPress={() => handleCarSelection(item)}>
      <Image source={{ uri: `${REACT_APP_CARLY_URL}${item.imageUrl}` }} style={styles.carImage} />
      <Text style={styles.carTitle}>{item.model.brandName} {item.model.name}</Text>
      <Text style={styles.carDescription}>Daily Rate: ${item.model.dailyRate}</Text>
      <Text style={styles.carDescription}>Location: {item.location.fullAddress}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading cars...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cars Near {parkingAreaDetails?.name}</Text>
      <FlatList
        data={cars}
        renderItem={renderCar}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
  carCard: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    alignItems: "center",
  },
  carTitle: { fontSize: 18, fontWeight: "bold", color: "#333", marginTop: 5 },
  carDescription: { fontSize: 14, color: "#666", marginTop: 5 },
  loaderContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  listContainer: { paddingBottom: 20 },
  carImage: {
    width: 200,
    height: 120,
    borderRadius: 8,
  },
});

export default CarReservationPage;
