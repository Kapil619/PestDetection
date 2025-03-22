// Home.tsx
import Ionicons from "@expo/vector-icons/Ionicons";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  Image,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppButton from "../components/AppButton";
import { homeStyles } from "../styles/homeStyles";
import {
  robotCaptureService,
  setCaptureBaseUrl,
  setUploadBaseUrl,
  uploadImageService,
} from "../utils/pestService";
import { HomeScreenRouteProp } from "../utils/types";
const Home: React.FC = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<HomeScreenRouteProp>();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current; // starts 50px lower
  const [loading, setLoading] = useState(false);
  const [uploadedImageUri, setUploadedImageUri] = useState<string | null>(null);
  const [detections, setDetections] = useState<
    { label: string; confidence: number }[]
  >([]);
  const [apiModalVisible, setApiModalVisible] = useState(false);
  const [newAppUrl, setNewAppUrl] = useState("");
  const [newCaptureUrl, setNewCaptureUrl] = useState("");

  const updateApiUrls = () => {
    // If a new App URL is provided, update uploadBaseUrl.
    if (newAppUrl.trim() !== "") {
      setUploadBaseUrl(newAppUrl);
    }
    if (newCaptureUrl.trim() !== "") {
      setCaptureBaseUrl(newCaptureUrl);
    }
    setApiModalVisible(false);
  };

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
      try {
        const newDetections = await uploadImageService(uri);
        setDetections(newDetections);
      } catch {
        console.log("Error uploading image");
      }
    }
  };

  const onClearUpload = () => {
    setUploadedImageUri(null);
    setDetections([]);
  };

  const handleRobotCapture = async () => {
    setLoading(true);
    try {
      const { detections: newDetections, imageUrl } =
        await robotCaptureService();
      setDetections(newDetections);
      setUploadedImageUri(imageUrl);
    } catch {
      console.log("Error capturing image");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <LinearGradient
          colors={["#A4B465", "#3D8D7A"]}
          style={homeStyles.container}
        >
          <Animated.View
            style={[
              homeStyles.content,
              { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
            ]}
          >
            <Image
              source={require("../../assets/guard.png")}
              style={homeStyles.image}
              resizeMode="cover"
            />
            <Text style={homeStyles.title}>Pest Identifier</Text>
            <Text style={homeStyles.subtitle}>
              Detect pests instantly using cutting-edge technology.
            </Text>

            {/* Interactive Capture Button */}
            {!uploadedImageUri && (
              <>
                <AppButton text="Capture Image" onPress={onCapturePress} />
                <AppButton text="Upload Image" onPress={pickImageAndUpload} />
                <AppButton
                  text="Robot Capture"
                  onPress={handleRobotCapture}
                  loading={loading}
                />
                <TouchableOpacity
                  style={{
                    backgroundColor: "#A4B465",
                    padding: 8,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 25,
                  }}
                  onPress={() => setApiModalVisible(true)}
                >
                  <View
                    style={{
                      backgroundColor: "#fff",
                      padding: 5,
                      borderRadius: 50,
                      marginRight: 10,
                    }}
                  >
                    <SimpleLineIcons name="wrench" size={24} color="black" />
                  </View>
                  <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                    Configure URL
                  </Text>
                </TouchableOpacity>
              </>
            )}
            <Modal visible={apiModalVisible} transparent animationType="slide">
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "rgba(0,0,0,0.5)",
                }}
              >
                <View
                  style={{
                    backgroundColor: "#fff",
                    padding: 20,
                    borderRadius: 10,
                    width: "80%",
                    position: "relative",
                  }}
                >
                  {/* Close Icon */}
                  <Pressable
                    onPress={() => setApiModalVisible(false)}
                    style={{
                      position: "absolute",
                      top: 10,
                      right: 10,
                      zIndex: 10,
                    }}
                  >
                    <Ionicons name="close-circle" size={30} color="#A4B465" />
                  </Pressable>

                  <Text style={{ marginBottom: 10, fontWeight: "bold" }}>
                    Configure API URLs
                  </Text>

                  <Text style={{ marginBottom: 5 }}>App API (/predict):</Text>
                  <TextInput
                    value={newAppUrl}
                    onChangeText={setNewAppUrl}
                    placeholder="e.g. 192.168.1.35:5000"
                    keyboardType="default"
                    style={{
                      borderWidth: 1,
                      borderColor: "#ccc",
                      padding: 8,
                      marginBottom: 20,
                    }}
                  />

                  <Text style={{ marginBottom: 5 }}>
                    Capture API: (/capture)
                  </Text>
                  <TextInput
                    value={newCaptureUrl}
                    onChangeText={setNewCaptureUrl}
                    placeholder="e.g. 192.168.1.12:5001"
                    keyboardType="default"
                    style={{
                      borderWidth: 1,
                      borderColor: "#ccc",
                      padding: 8,
                      marginBottom: 20,
                    }}
                  />

                  <TouchableOpacity
                    onPress={updateApiUrls}
                    style={{
                      backgroundColor: "#A4B465",
                      padding: 10,
                      borderRadius: 5,
                    }}
                  >
                    <Text style={{ textAlign: "center", color: "#fff" }}>
                      Save
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
            {uploadedImageUri && (
              <View style={homeStyles.uploadContainer}>
                <View style={homeStyles.imageWrapper}>
                  <Image
                    source={{ uri: uploadedImageUri }}
                    style={homeStyles.uploadedImage}
                  />
                  <Pressable
                    style={homeStyles.crossIcon}
                    onPress={onClearUpload}
                  >
                    <Ionicons name="close-circle" size={28} color="#ff6b6b" />
                  </Pressable>
                </View>
                <Text style={homeStyles.title}>Detection Results</Text>
                {detections.length > 0 ? (
                  detections.map((det, index) => (
                    <View style={homeStyles.detectionInfoRow} key={index}>
                      <Text style={homeStyles.detectionInfoLabel}>Class: </Text>
                      <Text style={homeStyles.detectionInfoValue}>
                        {det.label}
                      </Text>
                      <Text style={homeStyles.detectionInfoLabel}>
                        Confidence:{" "}
                      </Text>
                      <Text style={homeStyles.detectionInfoValue}>
                        {(det.confidence * 100).toFixed(2)}%
                      </Text>
                    </View>
                  ))
                ) : (
                  <Text style={homeStyles.noDetection}>No pests detected.</Text>
                )}
              </View>
            )}
          </Animated.View>
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
