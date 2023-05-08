import React, { useContext } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { scale, verticalScale } from "react-native-size-matters";
import { images } from "../../../assets";
import { Text } from "../../ui";
import themeContext from "../../../config/theme/themeContext";
import { HeaderContext } from "../../../providers/context/header";

type HeaderProps = {
  navigation: any;
  showBackButton?: boolean;
  showLogo?: boolean;
};

const Header: React.FC<HeaderProps> = ({ navigation }) => {
  // const [mode, setMode] = React.useState<"light" | "dark">("light");
  const { headerText, showBackButton, showLogo } =
    React.useContext(HeaderContext);

  const theme = useContext(themeContext);

  return (
    <View
      style={{
        backgroundColor: theme.background,
        flexDirection: "row",
        width: "100%",
        paddingHorizontal: scale(16),
        paddingLeft: scale(8),
        height: scale(42),
        marginTop: scale(0),
        justifyContent: "space-between",
        alignItems: "center",
        // shadowColor: "#000",
        // shadowOffset: {
        //   width: 0,
        //   height: 2,
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 3.84,
        // elevation: 5,
      }}
    >
      {showLogo && (
        <Image
          source={images.logo}
          style={{
            width: scale(100),
            height: verticalScale(30),
          }}
        />
      )}

      {headerText && (
        <Text
          style={{
            fontSize: scale(20),
            fontWeight: "bold",
            color: theme.text,
          }}
        >
          {headerText}
        </Text>
      )}

      {showBackButton && (
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons
            name="md-chevron-back-sharp"
            size={scale(24)}
            color={theme.text}
          />
        </Pressable>
      )}

      <Pressable
        onPress={() => {
          navigation.openDrawer();
        }}
      >
        <Ionicons name="menu-outline" size={scale(28)} color={theme.text} />
      </Pressable>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});
