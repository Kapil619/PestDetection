import { User } from "@firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import { logOut } from "../utils/firebaseMethods";

const Profile: React.FC = () => {
  const navigation = useNavigation<any>();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const currentUser = FIREBASE_AUTH.currentUser;
    setUser(currentUser);
  }, []);

  const handleLogout = async () => {
    try {
      await logOut();
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <LinearGradient colors={["#A4B465", "#3D8D7A"]} style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>
      <View style={styles.cardContainer}>
        <Image
          source={require("../../assets/logo.png")} // Replace with dynamic source if available
          style={styles.avatar}
          resizeMode="cover"
        />
        <Text style={styles.name}>
          {user?.displayName || "Pest identification"}
        </Text>
        <Text style={styles.email}>
          {user?.email || "pestdentification@gmail.com"}
        </Text>
        {/* Sample statistics row */}
        {/* <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Text style={styles.infoValue}>10</Text>
            <Text style={styles.infoLabel}>Posts</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoValue}>250</Text>
            <Text style={styles.infoLabel}>Followers</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoValue}>180</Text>
            <Text style={styles.infoLabel}>Following</Text>
          </View>
        </View> */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
  },
  cardContainer: {
    flex: 0.7,
    backgroundColor: "rgba(255,255,255,0.95)",
    marginTop: -40,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingTop: 80,
    paddingHorizontal: 30,
    alignItems: "center",
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "#3D8D7A",
    position: "absolute",
    top: -60,
    backgroundColor: "#fff",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#3D8D7A",
    marginTop: 10,
  },
  email: {
    fontSize: 16,
    color: "#888",
    marginVertical: 8,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginVertical: 20,
  },
  infoItem: {
    alignItems: "center",
  },
  infoValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#3D8D7A",
  },
  infoLabel: {
    fontSize: 14,
    color: "#888",
  },
  logoutButton: {
    backgroundColor: "#3D8D7A",
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 40,
    marginTop: 30,
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Profile;
