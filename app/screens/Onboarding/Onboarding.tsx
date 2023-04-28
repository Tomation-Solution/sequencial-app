import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { scale } from "react-native-size-matters";
import { Button } from "../../components/ui";

const { width, height } = Dimensions.get("screen");

const SLIDE_HEIGHT = 0.61 * height;

const Onboarding = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        paddingVertical: scale(20),
        paddingRight: scale(20),
      }}
    >
      <Image
        source={require("../../assets/logo/logo.png")}
        style={{ width: scale(180), height: scale(100) }}
      />

      <Image
        source={require("./assets/onboarding.png")}
        style={{
          width: "100%",
          height: SLIDE_HEIGHT,
        }}
        resizeMode="contain"
      />

      <Button>Get Started</Button>
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({});
