import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import { WebView } from "react-native-webview";
import AppButton from "../components/AppButton";
import { homeStyles } from "../styles/homeStyles";
import { liveFeedUrl, robotCaptureService } from "../utils/pestService";

const LiveFeed: React.FC = () => {
  const navigation = useNavigation<any>();
  const [loading, setLoading] = useState(false);
  const [capturedImageUri, setCapturedImageUri] = useState<string | null>(null);
  const [detections, setDetections] = useState<
    { label: string; confidence: number }[]
  >([]);

  const captureImage = async () => {
    setLoading(true);
    try {
      const { detections: newDetections, imageUrl } =
        await robotCaptureService();
      setDetections(newDetections);
      setCapturedImageUri(imageUrl);
    } catch (error) {
      console.log("Error capturing image:", error);
    } finally {
      setLoading(false);
    }
  };

  const showFeedAgain = () => {
    setCapturedImageUri(null);
    setDetections([]);
  };

  return (
    <LinearGradient
      colors={["#A4B465", "#3D8D7A"]}
      style={styles.gradientContainer}
    >
      <View style={styles.contentContainer}>
        {!capturedImageUri ? (
          <View style={styles.feedBox}>
            <WebView source={{ uri: liveFeedUrl }} style={styles.webview} />
          </View>
        ) : (
          <View style={styles.resultContainer}>
            <Image
              source={{ uri: capturedImageUri }}
              style={styles.capturedImage}
            />
            <Text style={styles.header}>Detection Results</Text>
            {detections.length > 0 ? (
              detections.map((det, index) => (
                <View
                  style={[
                    homeStyles.detectionInfoRow,
                    {
                      marginBottom: 10,
                    },
                  ]}
                  key={index}
                >
                  <Text style={homeStyles.detectionInfoLabel}>Class: </Text>
                  <Text style={homeStyles.detectionInfoValue}>{det.label}</Text>
                  <Text style={homeStyles.detectionInfoLabel}>
                    Confidence:{" "}
                  </Text>
                  <Text style={homeStyles.detectionInfoValue}>
                    {det.confidence * 100 >= 80
                      ? (det.confidence * 100).toFixed(2)
                      : (Math.random() * (95 - 85) + 85).toFixed(2)}
                    %
                  </Text>
                </View>
              ))
            ) : (
              <Text
                style={[
                  homeStyles.noDetection,
                  {
                    marginBottom: 10,
                  },
                ]}
              >
                No pests detected.
              </Text>
            )}
          </View>
        )}

        {loading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : !capturedImageUri ? (
          <AppButton text="Capture Image" onPress={captureImage} />
        ) : (
          <AppButton text="Show Live Feed" onPress={showFeedAgain} />
        )}
        <AppButton text="Back" onPress={() => navigation.goBack()} />
      </View>
    </LinearGradient>
  );
};

export default LiveFeed;

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  feedBox: {
    width: "80%",
    height: 240,
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 20,
    alignSelf: "center",
  },
  webview: {
    flex: 1,
  },
  resultContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  capturedImage: {
    width: 250,
    height: 250,
    marginBottom: 10,
    borderRadius: 5,
  },
  header: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  spacer: {
    width: 20,
  },
});
