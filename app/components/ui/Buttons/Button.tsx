import { Pressable, PressableProps, StyleSheet } from "react-native";
import React, { useContext } from "react";
import Text from "../Typography/Text";
import { COLORS } from "../../../config/constants/color";
import { scale } from "react-native-size-matters";
import themeContext from "../../../config/theme/themeContext";

type Props = {
  children: any;
  onPress?: () => void;
  styles?: {};
  textStyles?: {};
} & PressableProps;

const Button: React.FC<Props> = ({
  styles,
  textStyles,
  children,
  onPress,
  ...rest
}) => {
  const theme = useContext(themeContext);
  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: "rgba(0, 0, 0, 0.1)" }}
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.8 : 1,
          backgroundColor: pressed ? "#fff" : "#4CAF50",
        },
        {
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: rest.disabled ? theme.light_blue : theme.primary,
          paddingHorizontal: scale(12),
          paddingVertical: scale(9),
          borderRadius: 8,
        },
        { ...styles },
      ]}
      {...rest}
    >
      <Text style={{ color: "white", ...textStyles }}>{children}</Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({});
