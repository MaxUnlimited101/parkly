import { Stack } from "expo-router";

export default function BookingLayout() {
  return (
    <Stack>
      <Stack.Screen name="booking" options={{title:"BookingPage", headerShown: false }} />
    </Stack>
  );
}
