import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { REACT_APP_API_URL } from "../login";
import { ParkingArea } from "..";


const SearchPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [areas, setAreas] = useState<ParkingArea[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const fetchAreas = async (query: string) => {
    if (!query.trim()) {
      setAreas([]);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${REACT_APP_API_URL}/parking-areas/page/0?searchQuery=${query}&size=10`);
      if (!response.ok) throw new Error("Error fetching areas");
      const data = await response.json();
      
      const extractedAreas: ParkingArea[] = data.content || [];
      setAreas(extractedAreas);
    } catch (error) {
      console.error("Error fetching areas:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    fetchAreas(text);
  };

  const handleAreaPress = (area: ParkingArea) => {
    router.push({
      pathname: "/(search)/parking_spots",
      params: { areaId: area.id, areaName: area.name, areaAddress: area.address, hourlyRate: area.hourlyRate },
    });
  };

  const renderArea = ({ item }: { item: ParkingArea }) => (
    <TouchableOpacity style={styles.areaItem} onPress={() => handleAreaPress(item)}>
      <Text style={styles.areaName}>{item.name}</Text>
      <Text style={styles.areaDetails}>{item.address}</Text>
      <Text style={styles.areaDetails}>{item.city}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search for Areas</Text>
      <TextInput
        style={styles.searchBar}
        placeholder="Search..."
        value={searchQuery}
        onChangeText={handleSearch}
      />
      {loading && <ActivityIndicator style={styles.loader} />}
      <FlatList
        data={areas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderArea}
        style={styles.resultsBox}
      />
    </View>
  );
};

export default SearchPage;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 20, marginBottom: 20, textAlign: "center", marginTop: 20 },
  searchBar: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  loader: { marginTop: 10 },
  resultsBox: { marginTop: 10, maxHeight: 300 },
  areaItem: {
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  areaName: { fontSize: 16, fontWeight: "bold" },
  areaDetails: { fontSize: 14, color: "#555" },
});