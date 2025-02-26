import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { REACT_APP_API_URL } from "../login"; 
import { router } from "expo-router";
import { ParkingArea } from "..";

export default function MapPage() {
  const [ParkingAreas, setParkingAreas] = useState<ParkingArea[]>([]);

  useEffect(() => {
    const fetchParkingSpots = async () => {
      try {
        const response = await fetch(
          `${REACT_APP_API_URL}/parking-areas/page/0`
        );
        const data = await response.json();
        const extractedAreas: ParkingArea[] = data.content || [];
        console.log("Fetched parking areas:", extractedAreas);

        setParkingAreas(extractedAreas);
      } catch (error) {
        console.error("Failed to fetch parking spots:", error);
      }
    };

    fetchParkingSpots();
  }, []);

  const handleAreaPress = (area: ParkingArea) => {
    router.push({
      pathname: "/(search)/parking_spots",
      params: { areaId: area.id, areaName: area.name },
    });
  }

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: 52.23,
          longitude: 21.065,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        showsUserLocation
        showsMyLocationButton
      >
        {ParkingAreas.map((area) => {
          if ((
            typeof area.latitude === "number" &&
            typeof area.longitude === "number"
          ) && (area.latitude !== null && area.longitude !== null)) {
            return (
              <Marker
                key={area.id}
                coordinate={{
                  latitude: area.latitude,
                  longitude: area.longitude,
                }}
                title={area.name}
              >
                <Callout onPress={() => handleAreaPress(area)}/>
              </Marker>
            );
          }
          return null;
        })}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  map: {
    width: "100%",
    height: "100%",
  },
});