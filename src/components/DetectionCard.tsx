import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable, Text, View } from "react-native";
import { homeStyles } from "../styles/homeStyles";
type DetectionCardProps = {
  label: string;
  confidence: string;
  onClear: () => void;
};

export const DetectionCard: React.FC<DetectionCardProps> = ({
  label,
  confidence,
  onClear,
}) => (
  <>
    <View style={homeStyles.detectionCard}>
      <View>
        <Text style={homeStyles.detectionHighlight}>{label}</Text>
        <Text style={homeStyles.smallLabel}>
          Confidence: <Text style={homeStyles.boldValue}>{confidence}%</Text>
        </Text>
      </View>
      <Pressable style={homeStyles.crossIcon} onPress={onClear}>
        <Ionicons name="close-circle" size={28} color="#ff6b6b" />
      </Pressable>
    </View>
  </>
);
