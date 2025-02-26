import { createStackNavigator } from "@react-navigation/stack";
import BookingPage from "../(home)/booking";
import HomePage from "../(tabs)/home";

const Stack = createStackNavigator();

const BookingStack = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen
        name="Home"
        component={HomePage}
        options={{ title: "Home" }}
        />
      <Stack.Screen
        name="Booking"
        component={BookingPage}
        options={{ title: "Booking" }}
      />
    </Stack.Navigator>
  );
}