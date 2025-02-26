import { Stack } from "expo-router";

export default function SearchLayout() {
  return (
    <Stack>
      <Stack.Screen name="parking_spots" options={{title:"ParkingSpotsPage", headerShown: false }} />
    </Stack>
  );
}
