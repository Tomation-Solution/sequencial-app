import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import { NativeWindStyleSheet } from "nativewind";
import { Text } from "./app/globals/Typography";
import StackNavigations from "./app/navigations/StackNavigations";
import DrawerNavigations from "./app/navigations/DrawerNavigation";

NativeWindStyleSheet.setOutput({
  default: "native",
});

export default function App() {
  return (
    <NavigationContainer>
      <DrawerNavigations />
    </NavigationContainer>
  );
}
