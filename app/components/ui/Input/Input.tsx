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
  placeholder: string;
  secureTextEntry?: boolean;
  label?: string;
} & TextInputProps;

const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  secureTextEntry,
  ...rest
}) => {
  const theme = useContext(themeContext);
  const [showPassword, setShowPassword] = React.useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <View style={{ marginTop: scale(10) }}>
      {label && (
        <Text
          style={{
            fontSize: scale(14),
          }}
        >
          {label}
        </Text>
      )}

      <View
        style={{
          position: "relative",
          flexDirection: "row",
          alignItems: "center",

          borderRadius: scale(10),
          borderWidth: scale(1),
          borderColor: theme.placeholder,
          marginTop: scale(4),
        }}
      >
        <TextInput
          secureTextEntry={secureTextEntry ? !showPassword : false}
          style={{
            flex: 1,
            paddingHorizontal: scale(10),
            paddingVertical: scale(4),
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
            onPress={toggleShowPassword}
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
