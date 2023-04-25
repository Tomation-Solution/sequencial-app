import React from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { scale, verticalScale } from "react-native-size-matters";
import { useNavigation } from "@react-navigation/native";
import { images } from "../../../assets";
import { COLORS } from "../../../globals/constants/color";

type HeaderProps = {
  navigation: any;
  showBackButton?: boolean;
  showLogo?: boolean;
};

const Header: React.FC<HeaderProps> = ({ navigation }) => {
  return (
    <View
      style={{
        // backgroundColor: "#fff",
        flexDirection: "row",
        width: "100%",
        paddingHorizontal: scale(16),
        height: scale(42),
        marginTop: scale(35),
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
      <Image
        source={images.logo}
        style={{
          width: scale(100),
          height: verticalScale(30),
        }}
      />
      <Pressable
        onPress={() => {
          navigation.openDrawer();
        }}
      >
        <Ionicons name="md-menu-sharp" size={24} color={COLORS.secondary} />
      </Pressable>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});
