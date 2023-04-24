import { StyleSheet, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Dashboard from "../../screens/Dashboard/Dashboard";
import Jobs from "../../screens/Jobs/Jobs";
import CV_Management from "../../screens/CV_Management/CV_Management";
import Test_Management from "../../screens/Test_Management/Test_Management";
import Interview_Management from "../../screens/Interview_Management/Interview_Management";
import Documentation_Management from "../../screens/Documentation_Management/Documentation_Management";
import Calender from "../../screens/Calender/Calender";
import Settings from "../../screens/Settings/Settings";
import Header from "../../components/Header/Header";

const Stack = createStackNavigator();

const StackNavigations = () => {
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="dashboard"
      >
        <Stack.Screen name="dashboard" component={Dashboard} />
        <Stack.Screen name="jobs" component={Jobs} />
        <Stack.Screen name="cv_management" component={CV_Management} />
        <Stack.Screen name="test_management" component={Test_Management} />
        <Stack.Screen
          name="interview_management"
          component={Interview_Management}
        />
        <Stack.Screen
          name="documentation_management"
          component={Documentation_Management}
        />
        <Stack.Screen name="calendar" component={Calender} />
        <Stack.Screen name="settings" component={Settings} />
      </Stack.Navigator>
    </>
  );
};

export default StackNavigations;

const styles = StyleSheet.create({});
