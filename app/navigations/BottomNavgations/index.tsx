import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Jobs from "../../screens/Jobs/Jobs";
import Notifications from "../../screens/Notifications/Notifications";
import Profile from "../../screens/Profile/Profile";
import { COLORS } from "../../globals/constants/color";
import { scale } from "react-native-size-matters";
import { MaterialIcons } from "@expo/vector-icons";

import { useFonts, Ubuntu_400Regular } from "@expo-google-fonts/ubuntu";

const Tab = createBottomTabNavigator();

const BottomNavigations = () => {
  const [fontsLoaded] = useFonts({
    Ubuntu_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  // now to animating it
  return (
    <Tab.Navigator
      initialRouteName="Jobs"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLORS.secondary,
          height: scale(53),
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          position: "absolute",
        },

        tabBarLabelStyle: {
          fontSize: scale(11),
          fontFamily: "Ubuntu_400Regular",
          marginTop: scale(-13),
        },

        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: "white",
      }}
    >
      <Tab.Screen
        name="Jobs"
        component={Jobs}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="work" size={24} color={color} />
          ),
        }}
      />

      <Tab.Screen
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="notifications" size={24} color={color} />
          ),
        }}
        name="Notifications"
        component={Notifications}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="person" size={24} color={color} />
          ),
        }}
        name="Profile"
        component={Profile}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigations;

const styles = StyleSheet.create({});
