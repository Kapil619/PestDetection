// Home.tsx
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

const Home: React.FC = () => {
  const navigation = useNavigation<any>();
  // Animated values for fade-in and slide-up effects.
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current; // starts 50px lower
  // Animation for button press scaling
  const buttonScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Parallel animation: fading in and sliding up
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  // Handle button press in/out animations
  const onButtonPressIn = () => {
    Animated.spring(buttonScale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const onButtonPressOut = () => {
    Animated.spring(buttonScale, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  // Handle the capture button press (e.g., navigate to camera or capture action)
  const onCapturePress = () => {
    navigation.navigate("Camera");
    console.log("Capture button pressed");
    // TODO: Navigate to camera or trigger image capture functionality.
  };

  // Handle card button press (e.g., navigate to a detailed pest info screen)
  const onCardButtonPress = () => {
    console.log("Learn more button pressed");
    // TODO: Navigate to more details.
  };

  return (
    <LinearGradient colors={["#A4B465", "#3D8D7A"]} style={styles.container}>
      <Animated.View
        style={[
          styles.content,
          { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
        ]}
      >
        {/* A thematic image for your app */}
        <Image
          source={require("../../assets/guard.png")}
          style={styles.image}
          resizeMode="cover"
        />
        <Text style={styles.title}>Pest Identifier</Text>
        <Text style={styles.subtitle}>
          Detect pests instantly using cutting-edge technology.
        </Text>

        {/* Interactive Capture Button */}
        <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
          <Pressable
            onPressIn={onButtonPressIn}
            onPressOut={onButtonPressOut}
            onPress={onCapturePress}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Capture Pest Image</Text>
          </Pressable>
        </Animated.View>

        {/* A sample info card to give more interactivity */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Latest Pest Alert</Text>
          <Text style={styles.cardContent}>
            Stay updated with real-time alerts on pest outbreaks in your area.
          </Text>
          <Pressable onPress={onCardButtonPress} style={styles.cardButton}>
            <Text style={styles.cardButtonText}>Learn More</Text>
          </Pressable>
        </View>
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
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  image: {
    alignItems: "center",
    justifyContent: "center",
    width: width * 0.7,
    height: width * 0.7,
    borderRadius: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginBottom: 20,
    elevation: 2, // adds a slight shadow for Android
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  buttonText: {
    color: "#1B4D3E",
    fontSize: 16,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 15,
    padding: 20,
    marginTop: 20,
    width: "90%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1B4D3E",
    marginBottom: 10,
  },
  cardContent: {
    fontSize: 16,
    color: "#1B4D3E",

    textAlign: "center",
    marginBottom: 10,
  },
  cardButton: {
    backgroundColor: "#A4B465",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  cardButtonText: {
    color: "black",
    fontSize: 14,
    fontWeight: "600",
  },
});

export default Home;
