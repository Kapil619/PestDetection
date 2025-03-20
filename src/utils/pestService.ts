import axios from "axios";
import { Alert } from "react-native";
import { Detection } from "./types";


export async function uploadImageService(uri: string): Promise<Detection[]> {
    try {
        const formData = new FormData();
        formData.append("image", {
            uri,
            name: "test.jpg",
            type: "image/jpeg",
        } as any);

        const response = await axios.post("http://192.168.1.12:5000/predict", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        const data = response.data;
        console.log("uploadImageService Response:", data);
        const detectedPests = data.detections
            .filter((det: any) => det.confidence >= 0.4)
            .map((det: any) => ({ label: det.label, confidence: det.confidence }));

        if (detectedPests.length === 0) {
            Alert.alert("No pest detected!");
        }
        return detectedPests;
    } catch (error) {
        console.error("Upload failed:", error);
        Alert.alert("Error", "Image upload failed");
        throw error;
    }
}

export async function robotCaptureService(): Promise<{
    detections: Detection[];
    imageUrl: string;
}> {
    try {
        const response = await axios.post("http://192.168.1.12:5001/capture");
        const data = response.data;
        console.log("robotCaptureService Response:", data);

        const detections = data.detections
            .filter((det: any) => det.confidence >= 0.4)
            .map((det: any) => ({ label: det.label, confidence: det.confidence }));

        const uniqueImageUrl = `${data.image_url}?t=${new Date().getTime()}`;
        return { detections, imageUrl: uniqueImageUrl };
    } catch (error) {
        console.error("Error capturing image:", error);
        throw error;
    }
}