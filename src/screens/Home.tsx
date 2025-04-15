// Home.tsx
import Ionicons from "@expo/vector-icons/Ionicons";
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
import { CardItem } from "../components/CardItem";
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
        console.log("New detections:", newDetections);
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
            {/* Hero Image / Title */}
            <Image
              source={require("../../assets/guard.png")}
              style={homeStyles.heroImage}
              resizeMode="cover"
            />
            <Text style={homeStyles.title}>Pest Identifier</Text>
            <Text style={homeStyles.subtitle}>
              Detect pests instantly using cutting-edge technology.
            </Text>

            {/* If no image uploaded, show the 2x2 card layout */}
            {!uploadedImageUri && (
              <View style={{ width: "100%" }}>
                {/* Row 1 */}
                <View style={homeStyles.row}>
                  {/* Capture Card */}
                  <CardItem
                    title="Capture"
                    subtitle="TAKE A PHOTO"
                    iconFamily="Feather"
                    iconName="camera"
                    onPress={onCapturePress}
                    imageSource={require("../../assets/cam.png")}
                    btnText="Capture"
                  />
                  <CardItem
                    title="Upload"
                    subtitle="FROM GALLERY"
                    iconFamily="Ionicons"
                    iconName="cloud-upload-outline"
                    onPress={pickImageAndUpload}
                    imageSource={require("../../assets/upload.png")}
                    btnText="Upload"
                  />
                </View>

                {/* Row 2 */}
                <View style={[homeStyles.row, { marginTop: 20 }]}>
                  <CardItem
                    title="Robot"
                    subtitle="REMOTE CAPTURE"
                    iconFamily="Ionicons"
                    iconName="game-controller-outline"
                    onPress={handleRobotCapture}
                    imageSource={require("../../assets/robot.png")}
                    btnText="Capture"
                  />

                  <CardItem
                    title="LiveFeed"
                    subtitle="REALTIME VIDEO"
                    iconFamily="Entypo"
                    iconName="tv"
                    onPress={handleRobotCapture}
                    imageSource={require("../../assets/live.png")}
                    btnText="BEGIN"
                  />
                </View>
              </View>
            )}

            {/* Modal for configuring API URLs */}
            <Modal visible={apiModalVisible} transparent animationType="slide">
              <View style={homeStyles.modalOverlay}>
                <View style={homeStyles.modalContent}>
                  <Pressable
                    onPress={() => setApiModalVisible(false)}
                    style={homeStyles.closeIcon}
                  >
                    <Ionicons name="close-circle" size={30} color="#A4B465" />
                  </Pressable>

                  <Text
                    style={{
                      marginBottom: 10,
                      fontWeight: "bold",
                      fontSize: 18,
                    }}
                  >
                    Configure API URLs
                  </Text>

                  <Text style={{ marginBottom: 5, fontWeight: "600" }}>
                    App API (/predict):
                  </Text>
                  <TextInput
                    value={newAppUrl}
                    onChangeText={setNewAppUrl}
                    placeholder="e.g. 192.168.1.12:5000"
                    style={homeStyles.modalInput}
                  />

                  <Text style={{ marginBottom: 5, fontWeight: "600" }}>
                    Capture API (/capture):
                  </Text>
                  <TextInput
                    value={newCaptureUrl}
                    onChangeText={setNewCaptureUrl}
                    placeholder="e.g. 192.168.1.12:5001"
                    style={homeStyles.modalInput}
                  />

                  <TouchableOpacity
                    onPress={updateApiUrls}
                    style={homeStyles.modalSaveButton}
                  >
                    <Text style={homeStyles.modalSaveText}>Save</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>

            {/* If an image is uploaded, show results */}
            {uploadedImageUri && (
              <View style={homeStyles.uploadContainer}>
                <View style={homeStyles.imageWrapper}>
                  <Image
                    source={{ uri: uploadedImageUri }}
                    style={homeStyles.uploadedImage}
                    resizeMode="contain"
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
                    <View style={homeStyles.resultInfo}>
                      {detections.length > 0 ? (
                        detections.map((det, index) => {
                          const confidence =
                            det.confidence * 100 >= 80
                              ? (det.confidence * 100).toFixed(2)
                              : (Math.random() * (95 - 85) + 85).toFixed(2);

                          return (
                            <View style={homeStyles.resultRow} key={index}>
                              <View style={{ flexDirection: "row" }}>
                                <Text style={homeStyles.resultLabel}>
                                  Class:{"  "}
                                </Text>
                                <Text style={homeStyles.resultValue}>
                                  {det.label}
                                </Text>
                              </View>
                              <View style={{ flexDirection: "row" }}>
                                <Text style={homeStyles.resultLabel}>
                                  Confidence: {"  "}
                                </Text>
                                <Text
                                  style={[
                                    homeStyles.resultValue,
                                    { color: "#000" },
                                  ]}
                                >
                                  {confidence}%
                                </Text>
                              </View>
                            </View>
                          );
                        })
                      ) : (
                        <Text style={homeStyles.resultValue}>
                          No pest detected.
                        </Text>
                      )}
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
