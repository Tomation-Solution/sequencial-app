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

const CustomInput: React.FC<InputProps> = ({
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
    <View style={{ marginTop: scale(12) }}>
      {label && (
        <Text
          style={{
            fontSize: scale(13),
          }}
        >
          {label}
        </Text>
      )}
      <View
        style={{
          // height: scale(40),
          borderColor: "gray",
          borderWidth: 0.5,
          paddingHorizontal: 10,
          borderRadius: 5,
          position: "relative",
          flexDirection: "row",
          alignItems: "center",
          marginTop: scale(5),
        }}
      >
        <TextInput
          secureTextEntry={secureTextEntry ? !showPassword : false}
          style={{
            flex: 1,
            paddingHorizontal: scale(10),
            paddingVertical: scale(10),
            fontSize: scale(13),
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

export default CustomInput;
