import { StyleSheet } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./Home";
import Details from "./Details";
import DocumentUpload from "./DocumentUpload";

const Stack = createStackNavigator();

const Documentation_Management = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Home"
    >
      <Stack.Screen name="Home">{(props) => <Home {...props} />}</Stack.Screen>
      <Stack.Screen name="Details">
        {(props) => <Details {...props} />}
      </Stack.Screen>
      <Stack.Screen name="Document_Upload">
        {(props) => <DocumentUpload {...props} />}
      </Stack.Screen>
      {/* <Stack.Screen name="Job_Question">
        {(props) => <Job_Question {...props} />}
      </Stack.Screen> */}
    </Stack.Navigator>
  );
};

export default Documentation_Management;

const styles = StyleSheet.create({});
