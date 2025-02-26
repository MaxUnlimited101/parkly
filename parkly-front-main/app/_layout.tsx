import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="(search)" options={{ title: "Search Spots" }} />
      <Stack.Screen name="car-reservation" options={{ title: "Car Reservation" }} />
      <Stack.Screen name="payment" options={{ title: "Payment" }} />
      <Stack.Screen name="car-reservation-confirm" options={{ title: "Car Reservation Confirm" }} />
    </Stack>
  );
}
