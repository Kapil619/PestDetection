import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Modal,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { homeStyles } from "../styles/homeStyles";

type ConfigureApiModalProps = {
  visible: boolean;
  onClose: () => void;
  newAppUrl: string;
  setNewAppUrl: (url: string) => void;
  newCaptureUrl: string;
  setNewCaptureUrl: (url: string) => void;
  onSave: () => void;
};

const ConfigureApiModal: React.FC<ConfigureApiModalProps> = ({
  visible,
  onClose,
  newAppUrl,
  setNewAppUrl,
  newCaptureUrl,
  setNewCaptureUrl,
  onSave,
}) => {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={homeStyles.modalOverlay}>
        <View style={homeStyles.modalContent}>
          <Pressable onPress={onClose} style={homeStyles.closeIcon}>
            <Ionicons name="close-circle" size={30} color="#A4B465" />
          </Pressable>

          <Text style={{ marginBottom: 10, fontWeight: "bold", fontSize: 18 }}>
            Configure API URLs
          </Text>

          <Text style={{ marginBottom: 5, fontWeight: "600" }}>
            App API (/predict):
          </Text>
          <TextInput
            value={newAppUrl}
            onChangeText={setNewAppUrl}
            placeholder="e.g. 192.168.1.12:5000"
            style={homeStyles.modalInput}
          />

          <Text style={{ marginBottom: 5, fontWeight: "600" }}>
            Capture API (/capture):
          </Text>
          <TextInput
            value={newCaptureUrl}
            onChangeText={setNewCaptureUrl}
            placeholder="e.g. 192.168.1.12:5001"
            style={homeStyles.modalInput}
          />

          <TouchableOpacity onPress={onSave} style={homeStyles.modalSaveButton}>
            <Text style={homeStyles.modalSaveText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ConfigureApiModal;
