// SearchScreen.tsx
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface Pest {
  id: string;
  name: string;
  class: string;
  description: string;
  image: string;
}

// Dummy data for pests
const dummyData: Pest[] = [
  {
    id: "1",
    name: "Aphid",
    class: "Insect",
    description: "Small sap-sucking insects that can damage plants.",
    image:
      "https://media.istockphoto.com/id/185574314/photo/ladybird-attack-aphids.jpg?s=612x612&w=0&k=20&c=AcGtgfVnB7GAZUM00n7h0kQBB15xT36lQAaDgHMaA_4=",
  },
  {
    id: "2",
    name: "Mole",
    class: "Mammal",
    description: "Subterranean mammals that can cause damage to lawns.",
    image:
      "https://media.istockphoto.com/id/141213731/photo/laughing-mole.jpg?s=612x612&w=0&k=20&c=eoi2fxp_d5QIq0ZTZFvogYtdSl5zfjQVlxjeGkD1D8o=",
  },
  {
    id: "3",
    name: "Snail",
    class: "Mollusk",
    description: "Slow-moving creatures with a spiral shell.",
    image:
      "https://media.istockphoto.com/id/157618078/photo/roman-snail-on-piece-of-wood.jpg?s=2048x2048&w=is&k=20&c=sLPq7yNAtEE2hRAJoTW7NrLuH-LHj55IqyjTmbRjGw4=",
  },
  {
    id: "4",
    name: "Weevil",
    class: "Insect",
    description: "Small beetles known to damage crops.",
    image:
      "https://media.istockphoto.com/id/912267238/photo/rhynchophorus-ferrugineus-red-palm-weevil-close-up.jpg?s=612x612&w=0&k=20&c=fwJMuC1h_8sf0ha482FQKpgZ88MgIgfFobfRxv13a58=",
  },
];

const { width } = Dimensions.get("window");

const Search: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredData, setFilteredData] = useState<Pest[]>(dummyData);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Fade in animation when the screen loads
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  // Update filtered data whenever searchQuery changes
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredData(dummyData);
    } else {
      const filtered = dummyData.filter((pest) =>
        pest.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [searchQuery]);

  // Render each pest item
  const renderItem = ({ item }: { item: Pest }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemContent}>
        <Text style={styles.itemTitle}>{item.name}</Text>
        <Text style={styles.itemSubtitle}>{item.class}</Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
      </View>
    </View>
  );

  return (
    <LinearGradient colors={["#A4B465", "#3D8D7A"]} style={styles.container}>
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Search pests..."
            placeholderTextColor="black"
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchInput}
          />
          <TouchableOpacity style={styles.searchButton}>
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
        </View>

        {/* List of Pests */}
        <FlatList
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No results found</Text>
            </View>
          }
        />
      </Animated.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  searchContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  listContent: {
    paddingBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50,
  },
  emptyText: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
  },
  searchInput: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 16,
    color: "#333",
  },
  searchButton: {
    marginLeft: 10,
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  searchButtonText: {
    color: "#1B4D3E",
    fontSize: 16,
    fontWeight: "bold",
  },

  itemContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    marginVertical: 8,
    marginHorizontal: 8,
    overflow: "hidden",
    padding: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemImage: {
    width: width * 0.3,
    height: width * 0.3,
    borderRadius: 10,
  },
  itemContent: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
  },
  itemTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1B4D3E",
  },
  itemSubtitle: {
    fontSize: 16,
    color: "#333",
    marginVertical: 5,
  },
  itemDescription: {
    fontSize: 14,
    color: "#555",
  },
});

export default Search;
