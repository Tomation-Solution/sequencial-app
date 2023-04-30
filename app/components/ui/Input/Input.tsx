import {
  Pressable,
  StyleSheet,
  TextInput,
  View,
  TextInputProps,
} from "react-native";
import React, { useContext } from "react";
import Text from "../Typography/Text";
import { scale } from "react-native-size-matters";
import themeContext from "../../../config/theme/themeContext";
import { Ionicons } from "@expo/vector-icons";

type InputProps = {
  label: string;
  placeholder: string;
  secureTextEntry?: boolean;
} & TextInputProps;

const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  secureTextEntry,
  ...rest
}) => {
  const theme = useContext(themeContext);
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <View style={{ marginTop: scale(18) }}>
      <Text
        style={{
          fontSize: scale(16),
        }}
      >
        {label}
      </Text>
      <View
        style={{
          position: "relative",
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: theme.accent_white,
          borderRadius: scale(5),
          marginTop: scale(8),
        }}
      >
        <TextInput
          secureTextEntry={secureTextEntry ? !showPassword : false}
          style={{
            flex: 1,
            paddingHorizontal: scale(10),
            paddingVertical: scale(10),
            fontSize: scale(16),
            color: "#000",
          }}
          placeholder={placeholder}
          {...rest}
        />

        {secureTextEntry && (
          <Pressable
            style={{
              position: "absolute",
              right: scale(10),
              //   top: scale(10),
            }}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Ionicons
              name={showPassword ? "eye-off" : "eye"}
              size={scale(18)}
              color={theme.secondary}
            />
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({});
