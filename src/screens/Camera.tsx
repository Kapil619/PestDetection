import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { Camera, CameraView } from "expo-camera";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { CameraScreenNavigationProp } from "../utils/types";

const { width } = Dimensions.get("window");

const CameraScreen: React.FC = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const cameraRef = useRef<CameraView>(null);
  const navigation = useNavigation<CameraScreenNavigationProp>();
  const [isProcessing, setIsProcessing] = useState(false);
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const onCameraReady = () => {
    setIsCameraReady(true);
  };

  const takePicture = async () => {
    if (cameraRef.current && isCameraReady && !isProcessing) {
      try {
        setIsProcessing(true);
        const photo = await cameraRef.current.takePictureAsync();
        if (photo?.uri) {
          setCapturedPhoto(photo.uri);
        }
      } catch (error) {
        console.log("Failed to take picture:", error);
      }
    }
  };

  const handleConfirm = async () => {
    if (!capturedPhoto) return;
    setIsProcessing(true);
    try {
      const formData = new FormData();
      formData.append("image", {
        uri: capturedPhoto,
        name: "test.jpg",
        type: "image/jpeg",
      } as any);

      const response = await axios.post(
        "http://192.168.1.17:5000/predict",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      console.log("Response:", response.data);

      // Filter detections, same as in Home.tsx
      const detectedPests = response.data.detections
        .filter((det: any) => det.confidence >= 0.4)
        .map((det: any) => ({
          label: det.label,
          confidence: det.confidence,
        }));

      if (detectedPests.length === 0) {
        Alert.alert("No pest detected!");
      } else {
        console.log("Pests detected:", detectedPests);
      }
      navigation.navigate("Main", {
        screen: "Home",
        params: {
          photoUri: capturedPhoto,
          detectedPests,
        },
      });

      setCapturedPhoto(null);
    } catch (error) {
      console.error("Upload failed:", error);
      Alert.alert("Error", "Image upload failed");
    } finally {
      setIsProcessing(false);
    }
  };

  if (hasPermission === null) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0072ff" />
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>No access to camera</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        ref={cameraRef}
        onCameraReady={onCameraReady}
      />

      {/* Top Left: Close/Back Button */}
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="close-circle" size={50} color="#fff" />
      </TouchableOpacity>

      {/* Bottom Center: Capture Button */}
      <View style={styles.controlContainer}>
        <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
          <Ionicons name="camera" size={40} color="#fff" />
        </TouchableOpacity>
      </View>

      {isProcessing && (
        <View style={styles.processingOverlay}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.processingText}>Processing...</Text>
        </View>
      )}
      {/* Preview Overlay */}
      {capturedPhoto && (
        <View style={styles.previewContainer}>
          <Image
            source={{ uri: capturedPhoto }}
            style={styles.previewImage}
            resizeMode="cover"
            onLoadEnd={() => setIsProcessing(false)}
          />
          <View style={styles.previewButtons}>
            <TouchableOpacity
              style={styles.acceptButton}
              onPress={handleConfirm}
            >
              <Text style={styles.acceptText}>Confirm </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.rejectButton}
              onPress={() => setCapturedPhoto(null)}
            >
              <Text style={styles.rejectText}>Retake</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  processingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 3,
  },
  processingText: {
    color: "#fff",
    fontSize: 18,
    marginTop: 10,
  },
  container: { flex: 1, backgroundColor: "#000" },
  camera: { flex: 1 },
  closeButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 2,
  },
  controlContainer: {
    position: "absolute",
    bottom: 30,
    width: "100%",
    alignItems: "center",
  },
  captureButton: {
    backgroundColor: "rgba(0, 114, 255, 0.6)",
    padding: 20,
    borderRadius: 50,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  permissionContainer: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  permissionText: {
    color: "#fff",
    fontSize: 18,
  },
  previewContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  previewImage: {
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: 10,
    marginBottom: 20,
  },
  previewButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
  acceptButton: {
    backgroundColor: "#0072ff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  acceptText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  rejectButton: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  rejectText: {
    color: "#0072ff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CameraScreen;
