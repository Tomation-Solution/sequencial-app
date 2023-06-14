import { createStackNavigator } from "@react-navigation/stack";
import Home from "./Home";
import { useFocusEffect } from "@react-navigation/native";
import React, { useEffect } from "react";
import { HeaderContext } from "../../providers/context/header";
import Interview_Details from "./Interview_Details";

const Stack = createStackNavigator();

const Interview_Management = ({ navigation }: any) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Home"
    >
      <Stack.Screen name="Home">{(props) => <Home {...props} />}</Stack.Screen>
      <Stack.Screen name="Interview_details">
        {(props) => <Interview_Details {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default Interview_Management;
