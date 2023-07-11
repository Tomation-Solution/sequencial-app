import { StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./Home";
import UploadCV from "./UploadCV";
import { useFocusEffect } from "@react-navigation/native";
import { HeaderContext } from "../../providers/context/header";

const Stack = createStackNavigator();

const CV_Management = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Home"
    >
      {/* <Stack.Screen name="Home">{(props) => <Test />}</Stack.Screen> */}
      <Stack.Screen name="Home">{(props) => <Home {...props} />}</Stack.Screen>
      <Stack.Screen name="Upload CV">
        {(props) => <UploadCV {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default CV_Management;

const styles = StyleSheet.create({});
