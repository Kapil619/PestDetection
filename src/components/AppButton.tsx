import React, { useRef } from "react";
import {
  ActivityIndicator,
  Animated,
  Pressable,
  StyleSheet,
  Text,
} from "react-native";

interface AnimatedButtonProps {
  text: string;
  onPress: () => void;
  loading?: boolean;
}

const AppButton: React.FC<AnimatedButtonProps> = ({
  text,
  onPress,
  loading,
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <Pressable
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        onPress={onPress}
        style={styles.button}
      >
        <Text style={styles.buttonText}>{text}</Text>
        {loading && (
          <ActivityIndicator style={{ marginLeft: 6 }} color="#1B4D3E" />
        )}
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    flexDirection: "row",
  },
  buttonText: {
    color: "#1B4D3E",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AppButton;
