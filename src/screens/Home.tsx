// Home.tsx
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HomeScreenRouteProp } from "../utils/types";
const { width } = Dimensions.get("window");
const Home: React.FC = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<HomeScreenRouteProp>();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current; // starts 50px lower
  const buttonScale1 = useRef(new Animated.Value(1)).current;
  const buttonScale2 = useRef(new Animated.Value(1)).current;

  const [uploadedImageUri, setUploadedImageUri] = useState<string | null>(null);
  const [detections, setDetections] = useState<
    { label: string; confidence: number }[]
  >([]);

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

  useEffect(() => {
    if (route.params?.photoUri) {
      setUploadedImageUri(route.params.photoUri);
      setDetections(route.params.detectedPests || []);
    }
  }, [route.params]);

  // Handle button press in/out animations
  const onButton1PressIn = () => {
    Animated.spring(buttonScale1, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const onButton1PressOut = () => {
    Animated.spring(buttonScale1, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  const onButton2PressIn = () => {
    Animated.spring(buttonScale2, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const onButton2PressOut = () => {
    Animated.spring(buttonScale2, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };
  const onCapturePress = () => {
    navigation.navigate("Camera");
  };

  const pickImageAndUpload = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission denied", "We need camera roll permissions.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      base64: false,
    });

    if (!result.canceled) {
      const { uri } = result.assets[0];
      setUploadedImageUri(uri);
      await uploadImage(uri);
    }
  };

  const uploadImage = async (uri: string) => {
    try {
      const formData = new FormData();
      formData.append("image", {
        uri: uri,
        name: "test.jpg",
        type: "image/jpeg",
      } as any);

      // API call (replace URL with your actual endpoint)
      const response = await axios.post(
        "http://192.168.1.17:5000/predict",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log("Response:", response.data);

      // Extract detections (filtering low-confidence if necessary)
      const detectedPests = response.data.detections
        .filter((det: any) => det.confidence >= 0.4)
        .map((det: any) => ({
          label: det.label,
          confidence: det.confidence,
        }));

      if (detectedPests.length === 0) {
        Alert.alert("No pest detected!");
      }
      setDetections(detectedPests);
    } catch (error) {
      console.error("Upload failed:", error);
      Alert.alert("Error", "Image upload failed");
    }
  };

  const onClearUpload = () => {
    setUploadedImageUri(null);
    setDetections([]);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <LinearGradient
          colors={["#A4B465", "#3D8D7A"]}
          style={styles.container}
        >
          <Animated.View
            style={[
              styles.content,
              { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
            ]}
          >
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
            {!uploadedImageUri && (
              <>
                <Animated.View style={{ transform: [{ scale: buttonScale1 }] }}>
                  <Pressable
                    onPressIn={onButton1PressIn}
                    onPressOut={onButton1PressOut}
                    onPress={onCapturePress}
                    style={styles.button}
                  >
                    <Text style={styles.buttonText}>Capture Pest Image</Text>
                  </Pressable>
                </Animated.View>

                <Animated.View style={{ transform: [{ scale: buttonScale2 }] }}>
                  <Pressable
                    onPressIn={onButton2PressIn}
                    onPressOut={onButton2PressOut}
                    onPress={pickImageAndUpload}
                    style={styles.button}
                  >
                    <Text style={styles.buttonText}>Upload Image</Text>
                  </Pressable>
                </Animated.View>
              </>
            )}
            {uploadedImageUri && (
              <View style={styles.uploadContainer}>
                <View style={styles.imageWrapper}>
                  <Image
                    source={{ uri: uploadedImageUri }}
                    style={styles.uploadedImage}
                  />
                  <Pressable style={styles.crossIcon} onPress={onClearUpload}>
                    <Ionicons name="close-circle" size={28} color="#ff6b6b" />
                  </Pressable>
                </View>
                <Text style={styles.title}>Detection Results</Text>
                {detections.length > 0 ? (
                  detections.map((det, index) => (
                    <View style={styles.detectionInfoRow} key={index}>
                      <Text style={styles.detectionInfoLabel}>Class: </Text>
                      <Text style={styles.detectionInfoValue}>{det.label}</Text>
                      <Text style={styles.detectionInfoLabel}>
                        Confidence:{" "}
                      </Text>
                      <Text style={styles.detectionInfoValue}>
                        {(det.confidence * 100).toFixed(2)}%
                      </Text>
                    </View>
                  ))
                ) : (
                  <Text style={styles.noDetection}>No pests detected.</Text>
                )}
              </View>
            )}
          </Animated.View>
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  detectionInfoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
  },
  detectionInfoLabel: {
    fontSize: 15,
    color: "#fff",
    fontWeight: "600",
    marginRight: 5,
  },
  detectionInfoValue: {
    fontSize: 19,
    color: "#FFD700", // highlighted color
    fontWeight: "700",
    marginRight: 15,
  },
  noDetection: {
    fontSize: 16,
    color: "#fff",
    marginTop: 10,
  },
  uploadContainer: {
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  imageWrapper: {
    width: 250,
    height: 180,
    borderRadius: 10,
    overflow: "hidden",
    position: "relative",
    marginBottom: 10,
  },
  uploadedImage: {
    width: "100%",
    height: "100%",
  },
  crossIcon: {
    position: "absolute",
    top: 5,
    right: 5,
  },
  detectionItem: {
    alignItems: "center",
    marginBottom: 5,
  },
  pestName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1B4D3E",
  },
  confidence: {
    fontSize: 16,
    color: "#555",
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    marginTop: 20,
    alignItems: "center",
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
    fontSize: 28,
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
    alignItems: "center",
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
