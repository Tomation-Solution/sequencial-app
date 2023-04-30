import { StyleSheet } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Page1, Page2, Page3 } from "../../screens/auth/Signup";

const Stack = createStackNavigator();

const SignUpNavigations = () => {
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="page1"
      >
        <Stack.Screen name="page1" component={Page1} />
        <Stack.Screen name="page2" component={Page2} />
        <Stack.Screen name="page3" component={Page3} />
      </Stack.Navigator>
    </>
  );
};

export default SignUpNavigations;

const styles = StyleSheet.create({});
