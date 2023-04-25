import { Pressable, StyleSheet } from "react-native";
import React from "react";
import Text from "../Typography/Text";
import { COLORS } from "../../../globals/constants/color";
import { scale } from "react-native-size-matters";

type Props = {
  children: any;
  onPress?: () => void;
  styles?: {};
  textStyles?: {};
};

const Button: React.FC<Props> = ({ styles, textStyles, children }) => {
  return (
    <Pressable
      style={[
        {
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: COLORS.primary,
          paddingHorizontal: scale(12),
          paddingVertical: scale(9),
          borderRadius: 8,
        },
        { ...styles },
      ]}
    >
      <Text style={{ color: "white", ...textStyles }}>{children}</Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({});
