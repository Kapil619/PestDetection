import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from "firebase/auth";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import { Alert } from "react-native";

export const signIn = async (email: string, password: string) => {
    try {
        await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
    } catch (error: any) {
        Alert.alert("Login Error", error.message);
        console.error(error);
        throw error;
    }
}

export const signUp = async (email: string, password: string) => {
    try {
        await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
    } catch (error: any) {
        Alert.alert("Signp Error", error.message);
        console.error(error);
        throw error;
    }
}
export const logOut = async () => {
    try {
        await signOut(FIREBASE_AUTH);
        console.log("Logged out");
    } catch (error: any) {
        Alert.alert("Logout Error", error.message);
        console.error(error);
        throw error;

    }
}

export const AuthChanged = (callback: (user: User | null) => void) => {
    return onAuthStateChanged(FIREBASE_AUTH, callback);
}