import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../../config/constants/color";
import { scale } from "react-native-size-matters";

const AuthHeader = ({ navigation }: { navigation: any }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        width: "100%",
        paddingHorizontal: scale(10),
        height: scale(40),
        marginTop: scale(28),
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Pressable
        // disabled={!canGoback}
        style={{
          height: scale(26),
          width: scale(26),
          borderRadius: 10,
          backgroundColor: "white",
        }}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Ionicons
          name="chevron-back"
          size={scale(23)}
          color={COLORS.secondary}
        />
      </Pressable>
    </View>
  );
};

export default AuthHeader;

const styles = StyleSheet.create({});
