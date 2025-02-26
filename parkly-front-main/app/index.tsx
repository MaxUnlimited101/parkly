import './gesture-handler';
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Link, useRouter } from "expo-router";

export interface ParkingSpot {
  Id: number;
  isAvailable: boolean;
  spotNumber: string;
  parkingAreaId: string;
}

export interface Reservation {
  id: number;
  endTime: Date;
  startTime: Date;
  totalCost: number;
  parkingSpotId: string;
  userId: string;
}

export interface ParkingArea {
  id: number;
  address: string;
  city: string;
  hourlyRate: number;
  name: string;
  latitude: number;
  longitude: number;
}

export interface Booking {
  parkingSpot: ParkingSpot;
  parkingArea: ParkingArea;
  reservation: Reservation;
}

export default function Index() {

  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>PARKLY</Text>
      <View style={styles.buttons}>
          <TouchableOpacity style={styles.loginButton} onPress={() =>router.push("/login")}>
            <Text style={styles.loginButtonText}>Log in</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.signupButton} onPress={() =>router.push("/register")}>
            <Text style={styles.signupButtonText}>Sign Up</Text>
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
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
    color: "white",
    marginBottom: 100,
  },
  buttons: {
    alignItems: "center",
  },
  loginButton: {
    backgroundColor: "white",
    width: 200,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 50,
    marginBottom: 20,
    alignItems: "center",
  },
  loginButtonText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
  },
  signupButton: {
    backgroundColor: "black",
    width: 200,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 50,
    alignItems: "center",
  },
  signupButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
