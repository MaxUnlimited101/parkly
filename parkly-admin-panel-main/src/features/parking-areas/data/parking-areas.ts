import { ParkingArea } from "./schema";

export const parkingAreas: ParkingArea[] = [
  // New York (4 locations)
  {
    id: 1,
    name: "Manhattan Central Parking",
    address: "123 5th Avenue",
    city: "New York",
    hourlyRate: 25.00,
    longitude: -73.9857,
    latitude: 40.7484
  },
  {
    id: 2,
    name: "Times Square Garage",
    address: "234 Broadway",
    city: "New York",
    hourlyRate: 22.50,
    longitude: -73.9851,
    latitude: 40.7589
  },
  {
    id: 3,
    name: "Central Park Parking",
    address: "345 Central Park West",
    city: "New York",
    hourlyRate: 20.00,
    longitude: -73.9665,
    latitude: 40.7829
  },
  {
    id: 4,
    name: "SoHo District Parking",
    address: "456 Spring Street",
    city: "New York",
    hourlyRate: 18.00,
    longitude: -74.0021,
    latitude: 40.7243
  },
  // San Francisco (3 locations)
  {
    id: 5,
    name: "Fisherman's Wharf Parking",
    address: "567 Bay Street",
    city: "San Francisco",
    hourlyRate: 15.00,
    longitude: -122.4194,
    latitude: 37.8080
  },
  {
    id: 6,
    name: "Union Square Garage",
    address: "678 Post Street",
    city: "San Francisco",
    hourlyRate: 18.50,
    longitude: -122.4089,
    latitude: 37.7879
  },
  {
    id: 7,
    name: "Marina District Parking",
    address: "789 Marina Blvd",
    city: "San Francisco",
    hourlyRate: 12.00,
    longitude: -122.4367,
    latitude: 37.8037
  },
  // Los Angeles (3 locations)
  {
    id: 8,
    name: "Hollywood Boulevard Parking",
    address: "890 Hollywood Blvd",
    city: "Los Angeles",
    hourlyRate: 15.00,
    longitude: -118.3267,
    latitude: 34.1016
  },
  {
    id: 9,
    name: "Beverly Hills Garage",
    address: "901 Beverly Drive",
    city: "Los Angeles",
    hourlyRate: 20.00,
    longitude: -118.3998,
    latitude: 34.0736
  },
  {
    id: 10,
    name: "Downtown LA Parking",
    address: "012 Grand Avenue",
    city: "Los Angeles",
    hourlyRate: 16.00,
    longitude: -118.2468,
    latitude: 34.0522
  },
  // Chicago (3 locations)
  {
    id: 11,
    name: "Loop District Parking",
    address: "123 State Street",
    city: "Chicago",
    hourlyRate: 18.00,
    longitude: -87.6298,
    latitude: 41.8781
  },
  {
    id: 12,
    name: "Navy Pier Garage",
    address: "234 Grand Avenue",
    city: "Chicago",
    hourlyRate: 15.00,
    longitude: -87.6121,
    latitude: 41.8917
  },
  {
    id: 13,
    name: "Magnificent Mile Parking",
    address: "345 Michigan Avenue",
    city: "Chicago",
    hourlyRate: 22.00,
    longitude: -87.6244,
    latitude: 41.8902
  },
  // Miami (3 locations)
  {
    id: 14,
    name: "South Beach Parking",
    address: "456 Ocean Drive",
    city: "Miami",
    hourlyRate: 16.00,
    longitude: -80.1300,
    latitude: 25.7825
  },
  {
    id: 15,
    name: "Downtown Miami Garage",
    address: "567 Brickell Avenue",
    city: "Miami",
    hourlyRate: 14.00,
    longitude: -80.1918,
    latitude: 25.7617
  },
  {
    id: 16,
    name: "Coconut Grove Parking",
    address: "678 Grand Avenue",
    city: "Miami",
    hourlyRate: 12.00,
    longitude: -80.2428,
    latitude: 25.7297
  },
  // Boston (3 locations)
  {
    id: 17,
    name: "Fenway Park Garage",
    address: "789 Beacon Street",
    city: "Boston",
    hourlyRate: 25.00,
    longitude: -71.0972,
    latitude: 42.3467
  },
  {
    id: 18,
    name: "Faneuil Hall Parking",
    address: "890 Congress Street",
    city: "Boston",
    hourlyRate: 20.00,
    longitude: -71.0589,
    latitude: 42.3601
  },
  {
    id: 19,
    name: "Back Bay Parking",
    address: "901 Boylston Street",
    city: "Boston",
    hourlyRate: 18.00,
    longitude: -71.0822,
    latitude: 42.3491
  },
  // Seattle (3 locations)
  {
    id: 20,
    name: "Pike Place Market Garage",
    address: "012 Pike Street",
    city: "Seattle",
    hourlyRate: 12.00,
    longitude: -122.3421,
    latitude: 47.6097
  },
  {
    id: 21,
    name: "Space Needle Parking",
    address: "123 5th Avenue",
    city: "Seattle",
    hourlyRate: 15.00,
    longitude: -122.3499,
    latitude: 47.6205
  },
  {
    id: 22,
    name: "Pioneer Square Parking",
    address: "234 1st Avenue",
    city: "Seattle",
    hourlyRate: 10.00,
    longitude: -122.3345,
    latitude: 47.6015
  },
  // Las Vegas (3 locations)
  {
    id: 23,
    name: "Strip Central Parking",
    address: "345 Las Vegas Blvd",
    city: "Las Vegas",
    hourlyRate: 15.00,
    longitude: -115.1728,
    latitude: 36.1146
  },
  {
    id: 24,
    name: "Bellagio Casino Garage",
    address: "456 Flamingo Road",
    city: "Las Vegas",
    hourlyRate: 18.00,
    longitude: -115.1398,
    latitude: 36.1699
  },
  {
    id: 25,
    name: "Fremont Street Parking",
    address: "567 Fremont Street",
    city: "Las Vegas",
    hourlyRate: 10.00,
    longitude: -115.1398,
    latitude: 36.1699
  },
  // Austin (3 locations)
  {
    id: 26,
    name: "6th Street Garage",
    address: "678 6th Street",
    city: "Austin",
    hourlyRate: 8.00,
    longitude: -97.7431,
    latitude: 30.2672
  },
  {
    id: 27,
    name: "South Congress Parking",
    address: "789 Congress Avenue",
    city: "Austin",
    hourlyRate: 10.00,
    longitude: -97.7437,
    latitude: 30.2500
  },
  {
    id: 28,
    name: "University Garage",
    address: "890 Guadalupe Street",
    city: "Austin",
    hourlyRate: 6.00,
    longitude: -97.7417,
    latitude: 30.2849
  },
  // Denver (2 locations)
  {
    id: 29,
    name: "16th Street Mall Parking",
    address: "901 16th Street",
    city: "Denver",
    hourlyRate: 12.00,
    longitude: -104.9903,
    latitude: 39.7392
  },
  {
    id: 30,
    name: "LoDo District Garage",
    address: "012 Blake Street",
    city: "Denver",
    hourlyRate: 10.00,
    longitude: -104.9966,
    latitude: 39.7536
  }
];