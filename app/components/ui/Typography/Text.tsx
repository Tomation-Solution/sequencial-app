import React from "react";
import { View, Text } from "react-native";

import * as SplashScreen from "expo-splash-screen";
import { useFonts, Ubuntu_400Regular } from "@expo-google-fonts/ubuntu";
import { scale } from "react-native-size-matters";

type Props = {
  children: React.ReactNode;
  style?: any;
};

// react functional compnent type with props
const CustomText: React.FC<Props> = ({ children, style }) => {
  const [fontsLoaded] = useFonts({
    Ubuntu_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Text
      style={{
        fontFamily: "Ubuntu_400Regular",
        fontSize: scale(16),
        color: "#000",
        ...style,
      }}
    >
      {children}
    </Text>
  );
};

export default CustomText;
