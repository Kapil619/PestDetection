import React from "react";
import {
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const GITHUB_URL = "https://github.com/kapil619/PestDetection";
const DEMO_URL = "https://github.com/Kapil619/PestDetection#readme";

const OfflineScreen: React.FC = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Backend Offline</Text>
    <Text style={styles.message}>
      The backend server for this app is currently turned off.
      {"\n\n"}
      If you'd like to see how the app worked when it was functional, please
      visit:
    </Text>
    <TouchableOpacity onPress={() => Linking.openURL(GITHUB_URL)}>
      <Text style={styles.link}>GitHub Repository</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => Linking.openURL(DEMO_URL)}>
      <Text style={styles.link}>Demo Video / Screenshots</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#F5F5F5",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#3D8D7A",
  },
  message: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 24,
    color: "#333",
  },
  link: {
    fontSize: 18,
    color: "#1B4D3E",
    textDecorationLine: "underline",
    marginBottom: 12,
  },
});

export default OfflineScreen;
