import React, { useContext } from "react";
import { Text } from "react-native";

import { useFonts, Ubuntu_400Regular } from "@expo-google-fonts/ubuntu";
import { scale } from "react-native-size-matters";
import themeContext from "../../../config/theme/themeContext";

type Props = {
  children: React.ReactNode;
  style?: any;
};

// react functional compnent type with props
const CustomText: React.FC<Props> = ({ children, style }) => {
  const theme = useContext(themeContext);

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
        color: theme.text,
        ...style,
      }}
    >
      {children}
    </Text>
  );
};

export default CustomText;
