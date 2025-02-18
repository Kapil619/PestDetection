import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Search from "../screens/Search";
import Login from "../screens/Login";
import CameraScreen from "../screens/Camera";
import { User } from "@firebase/auth";
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
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Search") {
            iconName = focused ? "search" : "search-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }
          return (
            <Ionicons
              name={iconName}
              size={size}
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Main;
