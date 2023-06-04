import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Jobs from "../../screens/Jobs/Jobs";
import Notifications from "../../screens/Notifications/Notifications";
import Profile from "../../screens/Profile/Profile";
import { scale } from "react-native-size-matters";
import { MaterialIcons } from "@expo/vector-icons";

import { useFonts, Ubuntu_400Regular } from "@expo-google-fonts/ubuntu";
import Dashboard from "../../screens/Dashboard/Dashboard";
import themeContext from "../../config/theme/themeContext";

const Tab = createBottomTabNavigator();

const BottomNavigations = ({ navigation }: any) => {
  const [fontsLoaded] = useFonts({
    Ubuntu_400Regular,
  });

  const theme = useContext(themeContext);

  if (!fontsLoaded) {
    return null;
  }

  // now to animating it
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.background,
          height: scale(53),
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          position: "absolute",
        },

        tabBarLabelStyle: {
          fontSize: scale(11),
          fontFamily: "Ubuntu_400Regular",
          marginTop: scale(-13),
          marginBottom: scale(7),
        },

        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.text,
      }}
    >
      <Tab.Screen
        name="Home"
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="home" size={24} color={color} />
          ),
        }}
      >
        {(props) => <Dashboard drawer_props={navigation} {...props} />}
      </Tab.Screen>
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
