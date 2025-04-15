import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import {
  Image,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

type IconFamily = "Ionicons" | "Entypo" | "Feather";

interface CardItemProps {
  title: string;
  subtitle: string;
  iconFamily: IconFamily; // which icon set
  iconName: any; // exact icon name
  onPress: () => void;
  imageSource: any; // require(...) or URI
  containerStyle?: StyleProp<ViewStyle>;
  btnText?: string;
}

export const CardItem: React.FC<CardItemProps> = ({
  title,
  subtitle,
  iconFamily,
  iconName,
  onPress,
  imageSource,
  containerStyle,
  btnText = "Go",
}) => {
  const renderIcon = () => {
    switch (iconFamily) {
      case "Ionicons":
        return <Ionicons name={iconName} size={20} color="#3E3F5B" />;
      case "Entypo":
        return <Entypo name={iconName} size={20} color="#3E3F5B" />;
      default:
        return <Feather name={iconName} size={20} color="#3E3F5B" />;
    }
  };

  return (
    <View style={[cardItemStyles.card, containerStyle]}>
      <Text style={cardItemStyles.cardTitle}>{title}</Text>
      <Text style={cardItemStyles.cardSubtitle}>{subtitle}</Text>
      <TouchableOpacity
        style={cardItemStyles.cardActionButton}
        onPress={onPress}
      >
        {renderIcon()}
        <Text style={cardItemStyles.cardActionText}>{btnText}</Text>
      </TouchableOpacity>
      <View style={cardItemStyles.cardImageContainer}>
        <Image
          source={imageSource}
          style={cardItemStyles.cardImage}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

export const cardItemStyles = StyleSheet.create({
  card: {
    width: "48%",
    backgroundColor: "#FBFBFB",
    borderRadius: 16,
    paddingVertical: 15,
    paddingHorizontal: 12,
    position: "relative",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 4,
    flexDirection: "column",
    marginBottom: 0,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 2,
  },
  cardSubtitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#727D73",
    marginBottom: 10,
    maxWidth: "90%",
  },
  cardActionButton: {
    backgroundColor: "#C1D8C3",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    marginTop: 5,
  },
  cardActionText: {
    color: "#3E3F5B",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 6,
  },
  cardImageContainer: {
    // place the image below text
    marginTop: "auto",
    alignSelf: "flex-end",
    marginRight: -5,
    marginBottom: -10,
  },
  cardImage: {
    width: 60,
    height: 60,
  },
});
