import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SearchPage from '../(tabs)/search'; 
import ParkingSpotsPage from '../(search)/parking_spots';

const Stack = createStackNavigator();

const SearchStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Search"
        component={SearchPage}
        options={{ title: 'Search Areas' }}
      />
      <Stack.Screen
        name="ParkingSpots"
        component={ParkingSpotsPage}
        options={{ title: 'Parking Spots' }}
      />
    </Stack.Navigator>
  );
};

export default SearchStack;
