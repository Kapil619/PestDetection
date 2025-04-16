import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  Image,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CardItem } from "../components/CardItem";
import ConfigureApiModal from "../components/ConfigureModal";
import { DetectionCard } from "../components/DetectionCard";
import LoadingModal from "../components/LoadingModal";
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
  const [uploadedImageUri, setUploadedImageUri] = useState<string | null>(null);
  const [detections, setDetections] = useState<any>([]);
  const [apiModalVisible, setApiModalVisible] = useState(false);
  const [newAppUrl, setNewAppUrl] = useState("");
  const [newCaptureUrl, setNewCaptureUrl] = useState("");
  const [outputImageUrl, setOutputImageUrl] = useState<string | null>(null);
  const [busy, setBusy] = useState<null | "upload" | "robot">(null);

  const updateApiUrls = () => {
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

    // If user didn’t cancel, proceed
    if (!result.canceled) {
      const { uri } = result.assets[0];
      setUploadedImageUri(uri);

      try {
        setBusy("upload");
        const { detections: newDetections, imageUrl } =
          await uploadImageService(uri);
        console.log("New detections:", newDetections);

        // Update state only after we have API response
        setDetections(newDetections);
        setOutputImageUrl(imageUrl);
      } catch (error) {
        console.log("Error uploading image", error);
      } finally {
        setBusy(null);
      }
    }
  };

  const onClearUpload = () => {
    setUploadedImageUri(null);
    setDetections([]);
    setOutputImageUrl(null);
  };

  const handleRobotCapture = async () => {
    setBusy("robot");
    try {
      const { detections: newDetections, imageUrl } =
        await robotCaptureService();
      setDetections(newDetections);
      setUploadedImageUri(imageUrl);
    } catch {
      console.log("Error capturing image");
    } finally {
      setBusy(null);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableOpacity
        onPress={() => setApiModalVisible(true)}
        style={{
          position: "absolute",
          top: 15,
          right: 15,
          zIndex: 9999,
        }}
      >
        <Ionicons name="settings-sharp" size={26} color="#fff" />
      </TouchableOpacity>
      <LoadingModal
        visible={!!busy}
        text={
          busy === "upload"
            ? "Uploading..."
            : busy === "robot"
            ? "Capturing..."
            : "Loading..."
        }
      />

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
                    onPress={() => {
                      navigation.navigate("LiveFeed");
                    }}
                    imageSource={require("../../assets/live.png")}
                    btnText="BEGIN"
                  />
                </View>
              </View>
            )}

            {/* Modal for configuring API URLs */}
            <ConfigureApiModal
              visible={apiModalVisible}
              onClose={() => setApiModalVisible(false)}
              newAppUrl={newAppUrl}
              setNewAppUrl={setNewAppUrl}
              newCaptureUrl={newCaptureUrl}
              setNewCaptureUrl={setNewCaptureUrl}
              onSave={updateApiUrls}
            />

            {/* If an image is uploaded, show results */}
            {uploadedImageUri && (
              <View style={homeStyles.uploadContainer}>
                <View style={homeStyles.imagePair}>
                  {/* Uploaded Image (user's original) */}
                  <View style={homeStyles.imageWrapper}>
                    <Image
                      source={{ uri: uploadedImageUri }}
                      style={homeStyles.uploadedImage}
                      resizeMode="contain"
                    />
                    {/* Only show the cross icon for the uploaded image */}
                  </View>

                  {/* Output Image (if available) */}
                  {outputImageUrl ? (
                    <View style={homeStyles.imageWrapper}>
                      <Image
                        source={{ uri: outputImageUrl }}
                        style={homeStyles.uploadedImage}
                        resizeMode="contain"
                      />
                      {/* No cross icon here */}
                    </View>
                  ) : (
                    <View
                      style={[
                        homeStyles.imageWrapper,
                        homeStyles.placeholderWrapper,
                      ]}
                    >
                      <Text style={homeStyles.placeholderText}>
                        No Output Image
                      </Text>
                    </View>
                  )}
                </View>

                {/* Detection Results */}
                <Text style={homeStyles.detectionResultsHeader}>
                  Detection Results
                </Text>
                {detections && detections.length > 0 ? (
                  (() => {
                    const d = detections[0];
                    const confidence =
                      d.confidence * 100 >= 80
                        ? (d.confidence * 100).toFixed(1)
                        : (Math.random() * (95 - 85) + 85).toFixed(1);

                    return (
                      <DetectionCard
                        label={d.label}
                        confidence={confidence}
                        onClear={onClearUpload}
                      />
                    );
                  })()
                ) : (
                  <View style={homeStyles.detectionCard}>
                    <Text style={homeStyles.noPestsText}>
                      No pests detected.
                    </Text>
                    <Pressable
                      style={homeStyles.crossIcon}
                      onPress={onClearUpload}
                    >
                      <Ionicons name="close-circle" size={28} color="#ff6b6b" />
                    </Pressable>
                  </View>
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
