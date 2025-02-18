// LoginSignupScreen.tsx
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { signIn, signUp } from "../utils/firebaseMethods";

const Login: React.FC = () => {
  const navigation = useNavigation<any>();
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleAuth = async () => {
    setLoading(true);
    if (isLogin) {
      await signIn(email, password);
    } else {
      await signUp(email, password);
    }
    navigation.navigate("Main");
    setLoading(false);
  };

  return (
    <LinearGradient colors={["#141E30", "#243B55"]} style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../../assets/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.title}>{isLogin ? "Login" : "Sign Up"}</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#ccc"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#ccc"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {loading ? (
          <ActivityIndicator size="large" color="#fff" style={styles.loader} />
        ) : (
          <TouchableOpacity style={styles.authButton} onPress={handleAuth}>
            <Text style={styles.authButtonText}>
              {isLogin ? "Login" : "Sign Up"}
            </Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          onPress={() => setIsLogin((prev) => !prev)}
          style={styles.switchContainer}
        >
          <Text style={styles.switchText}>
            {isLogin
              ? "Don't have an account? Sign Up"
              : "Already have an account? Login"}
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: "center",
    marginTop: 60,
  },
  logo: {
    width: 150,
    height: 150,
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  formContainer: {
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 40,
  },
  input: {
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 15,
    fontSize: 16,
    color: "#fff",
    marginBottom: 20,
  },
  authButton: {
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 10,
  },
  authButtonText: {
    color: "#243B55",
    fontSize: 18,
    fontWeight: "bold",
  },
  switchContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  switchText: {
    color: "#fff",
    fontSize: 16,
  },
  loader: {
    marginVertical: 20,
  },
});

export default Login;
