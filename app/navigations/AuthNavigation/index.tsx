import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ForgotPassword, SignIn } from "../../screens/auth";
import SignUpNavigations from "./signup";
import OTP from "../../screens/auth/OTP";
import ForgotPasswordNavigations from "./forgotPassword";

const Stack = createStackNavigator();

const AuthNavigations = () => {
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="signin"
      >
        <Stack.Screen name="signin" component={SignIn} />
        <Stack.Screen name="signup" component={SignUpNavigations} />
        <Stack.Screen
          name="forgotpassword"
          component={ForgotPasswordNavigations}
        />
        <Stack.Screen name="otp" component={OTP} />
      </Stack.Navigator>
    </>
  );
};

export default AuthNavigations;

const styles = StyleSheet.create({});
