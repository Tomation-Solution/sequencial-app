import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ForgotPassword, SignIn } from "../../screens/auth";
import SignUpNavigations from "./signup";
import OTP from "../../screens/auth/OTP";
import ForgotPasswordNavigations from "./forgotPassword";
import CV_Management from "../../screens/CV_Management/CV_Management";

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
        <Stack.Screen name="configure_cv" component={CV_Management} />
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
