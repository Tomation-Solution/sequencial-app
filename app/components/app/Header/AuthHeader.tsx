import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../../globals/constants/color";
import { scale } from "react-native-size-matters";

const AuthHeader = ({ navigation }: any) => {
  return (
    <View
      style={{
        flexDirection: "row",
        width: "100%",
        paddingHorizontal: scale(16),
        height: scale(42),
        marginTop: scale(35),
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Pressable
        // disabled={!canGoback}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Ionicons name="chevron-back" size={24} color={COLORS.secondary} />
      </Pressable>
    </View>
  );
};

export default AuthHeader;

const styles = StyleSheet.create({});
