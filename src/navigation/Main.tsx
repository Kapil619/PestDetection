import { Ionicons } from "@expo/vector-icons";
import { User } from "@firebase/auth";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import CameraScreen from "../screens/Camera";
import LiveFeed from "../screens/feed";
import Home from "../screens/Home";
import Login from "../screens/Login";
import OfflineScreen from "../screens/Offline";
import Profile from "../screens/Profile";
import Search from "../screens/Search";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

type MainProps = {
  user: User | null;
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 4,
          color: "#333",
          fontWeight: "bold",
        },
        tabBarStyle: {
          backgroundColor: "#D0DDD0",
          height: 56, // Standard height for bottom tabs
          borderTopWidth: 0.5,
          borderTopColor: "#b0b0b0",
        },
        tabBarIcon: ({
          focused,
          color,
          size,
        }: {
          focused: boolean;
          color: string;
          size: number;
        }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "home";
          let label = "Home";
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
            label = "Home";
          } else if (route.name === "Search") {
            iconName = focused ? "search" : "search-outline";
            label = "Search";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
            label = "Profile";
          } else if (route.name === "Offline")
            iconName = focused ? "cloud-offline" : "cloud-offline-outline";
          return (
            <Ionicons
              name={iconName}
              size={26} // Slightly smaller for better fit
              color={focused ? "green" : color}
            />
          );
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Offline"
        component={OfflineScreen}
        options={{
          tabBarLabel: "Offline Info",
          tabBarBadge: "!",
          headerShown: false,
          tabBarBadgeStyle: {
            backgroundColor: "orange",
            color: "white",
            fontWeight: "bold",
          },
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

const Main = ({ user }: MainProps) => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={user ? "Main" : "Login"}>
        <Stack.Screen
          name="Main"
          component={TabNavigator}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Camera"
          component={CameraScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="LiveFeed"
          component={LiveFeed}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Main;
