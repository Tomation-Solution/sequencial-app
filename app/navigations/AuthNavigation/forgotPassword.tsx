import { StyleSheet } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { EmailPage, ResetPage } from "../../screens/auth/ForgotPassword";

const Stack = createStackNavigator();

const ForgotPasswordNavigations = () => {
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="emailPage"
      >
        <Stack.Screen name="emailPage" component={EmailPage} />
        <Stack.Screen name="resetPage" component={ResetPage} />
      </Stack.Navigator>
    </>
  );
};

export default ForgotPasswordNavigations;

const styles = StyleSheet.create({});
