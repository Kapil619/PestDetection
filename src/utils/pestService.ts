import axios from "axios";
import { Alert, ToastAndroid } from "react-native";
import { Detection } from "./types";

export let uploadBaseUrl = "http://65.1.91.195:5000"; // URL for the modal
export let captureBaseUrl = "http://10.241.79.63:5003"; // URL for capture service
export let liveFeedUrl = "http://10.241.79.63:5003/video_feed"; // URL for live feed

export function setUploadBaseUrl(urlDigits: string) {
    uploadBaseUrl = "http://" + urlDigits;
}
export function setCaptureBaseUrl(urlDigits: string) {
    captureBaseUrl = "http://" + urlDigits;
}
export function setLiveFeedUrl(url: string) {
    liveFeedUrl = url;
}

export async function uploadImageService(uri: string): Promise<{
    detections: Detection[];
    imageUrl: string;
}> {
    try {
        const formData = new FormData();
        formData.append("image", {
            uri,
            name: "test.jpg",
            type: "image/jpeg",
        } as any);

        const response = await axios.post(`${uploadBaseUrl}/predict`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        if (response.data.error) {
            throw new Error(response.data.error);
        }

        // Destructure the JSON response
        const { detections, image_url } = response.data;
        // Filter out low-confidence detections
        const filtered = detections.filter((det: Detection) => det.confidence >= 0.1);
        if (filtered.length === 0) {
            console.log("No pest detected!");
            ToastAndroid.show("No pest detected!", ToastAndroid.SHORT,);
        }
        // Return both the detection array + the URL to the bounding-box image
        return { detections: filtered, imageUrl: `http://65.1.91.195:5001${image_url}` };
    } catch (error) {
        console.error("Upload failed:", error);
        Alert.alert("Error", "Please configure the URL properly.");
        throw error;
    }
}

export async function robotCaptureService(): Promise<{
    detections: Detection[];
    imageUrl: string;
}> {
    try {
        const response = await axios.post(`${captureBaseUrl}/capture`);
        const data = response.data;
        console.log("robotCaptureService Response:", data);

        const detections = data.detections
            .filter((det: any) => det.confidence >= 0.1)
            .map((det: any) => ({ label: det.label, confidence: det.confidence }));

        const uniqueImageUrl = `${data.image_url}?t=${new Date().getTime()}`;
        return { detections, imageUrl: uniqueImageUrl };
    } catch (error) {
        console.error("Error", "Please configure the URL properly.", error);
        Alert.alert("Error", "Please configure the URL properly.");
        throw error;
    }
}

export async function predictImage(uri: string): Promise<Detection[]> {
    try {
        const formData = new FormData();
        formData.append("image", {
            uri,
            name: "test.jpg",
            type: "image/jpeg",
        } as any);

        const response = await axios.post(`${uploadBaseUrl}/predict`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        console.log("predictImage Response:", response.data);

        const detectedPests = response.data.detections
            .filter((det: any) => det.confidence >= 0.1)
            .map((det: any) => ({
                label: det.label,
                confidence: det.confidence,
            }));

        if (detectedPests.length === 0) {
            Alert.alert("No pest detected!");
        }
        return detectedPests;
    } catch (error) {
        console.error("Predict image failed:", error);
        Alert.alert("Error", "Please configure the URL properly.");
        throw error;
    }
}
