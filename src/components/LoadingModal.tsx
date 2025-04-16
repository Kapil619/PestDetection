import React from "react";
import { ActivityIndicator, Modal, Text, View } from "react-native";

type LoadingModalProps = {
  visible: boolean;
  text?: string;
};

const LoadingModal: React.FC<LoadingModalProps> = ({ visible, text }) => (
  <Modal transparent visible={visible} animationType="none">
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 9999,
      }}
    >
      <View
        style={{
          backgroundColor: "#FFFFFF",
          height: 100,
          width: 200,
          borderRadius: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator size="large" color={"#000"} />
        <Text style={{ color: "#000", marginTop: 8, zIndex: 9999 }}>
          {text || "Loading..."}
        </Text>
      </View>
    </View>
  </Modal>
);

export default LoadingModal;
