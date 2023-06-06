import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import Home from "./Home";
import Settings from "./Settings";
import Help from "./Help";

const Stack = createStackNavigator();

const Profile = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Home"
    >
      <Stack.Screen name="Home">{(props) => <Home {...props} />}</Stack.Screen>
      <Stack.Screen name="Help">{(props) => <Help {...props} />}</Stack.Screen>
      <Stack.Screen name="Settings">
        {(props) => <Settings {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default Profile;

const styles = StyleSheet.create({});
