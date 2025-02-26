import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";


export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tabs.Screen name="home" />
      <Tabs.Screen name="search" />
      <Tabs.Screen name="map" />
    </Tabs>
  );
}

interface CustomTabBarProps {
  state: {
    index: number;
    routes: {
      key: string;
      name: string;
    }[];
  };
  navigation: {
    navigate: (routeName: string) => void;
  };
}

function CustomTabBar({ state, navigation }: CustomTabBarProps) {
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;

        const getIconName = (routeName: string): keyof typeof MaterialIcons.glyphMap => {
          switch (routeName) {
            case "home":
              return "home";
            case "search":
              return "search";
            case "favourites":
              return "star";
            case "map":
              return "map";
            default:
              return "circle";
          }
        };

        const handlePress = (event: GestureResponderEvent): void => {
          navigation.navigate(route.name);
        };

        return (
          <TouchableOpacity
            key={route.name}
            onPress={handlePress}
            style={styles.tabButton}
          >
            <MaterialIcons
              name={getIconName(route.name)}
              size={28}
              color={isFocused ? "black" : "#aaa"}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#517A89",
    paddingVertical: 10,
  },
  tabButton: {
    alignItems: "center",
  },
});
