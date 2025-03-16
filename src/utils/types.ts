//// filepath: d:\Codes\PestDetection\src\navigation\types.ts
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// Define your main stack's routes and parameters
export type RootStackParamList = {
    Main: {
        screen: string;
        params?: {
            photoUri?: string;
            detectedPests?: { label: string; confidence: number }[];
        };
    };
    Home: {
        photoUri?: string;
        detectedPests?: { label: string; confidence: number }[];
    };
    Camera: undefined; // no params for the Camera screen
};
export type HomeScreenRouteProp = RouteProp<RootStackParamList, "Home">;
export type CameraScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "Camera"
>;