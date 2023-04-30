import { Pressable, StyleSheet, View } from "react-native";
import React from "react";
import { Text } from "../../components/ui";
import { scale } from "react-native-size-matters";
import { Seperator } from "../../components/ui/_helpers";

const OTP = ({ navigation }: { navigation: any }) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
      }}
    >
      <View
        style={{
          width: "100%",
          paddingHorizontal: scale(20),
        }}
      >
        <Text>
          An email with a verification code was sent to the specified number
          email@email.com
        </Text>
        <Seperator height={scale(20)} />
        <Text
          style={{
            fontSize: scale(16),
            color: "#000",
          }}
        >
          If this email is not yours and you misspelled it, click
        </Text>
        <Pressable onPress={() => navigation.goBack()}>
          <Text style={{ color: "blue" }}>edit</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default OTP;

const styles = StyleSheet.create({});
