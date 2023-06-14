import { createStackNavigator } from "@react-navigation/stack";
import Home from "./Home";
import { useFocusEffect } from "@react-navigation/native";
import React, { useEffect } from "react";
import { HeaderContext } from "../../providers/context/header";
import Test_Questions from "./Test_Questions";

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
      <Stack.Screen name="Test_Questions">
        {(props) => <Test_Questions {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default Test_Management;
