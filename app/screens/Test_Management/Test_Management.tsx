import { createStackNavigator } from "@react-navigation/stack";
import Home from "./Home";
import { useFocusEffect } from "@react-navigation/native";
import React, { useEffect } from "react";
import { HeaderContext } from "../../providers/context/header";

const Stack = createStackNavigator();

const Test_Management = ({ navigation }: any) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Home"
    >
      <Stack.Screen name="Home">{(props) => <Home {...props} />}</Stack.Screen>
    </Stack.Navigator>
  );
};

export default Test_Management;
