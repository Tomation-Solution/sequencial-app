import {
  Pressable,
  StyleSheet,
  TextInput,
  View,
  TextInputProps,
  Platform,
} from "react-native";
import React, { useContext, useState } from "react";
import Text from "../Typography/Text";
import { scale } from "react-native-size-matters";
import themeContext from "../../../config/theme/themeContext";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";

type InputProps = {
  placeholder: string;
  secureTextEntry?: boolean;
  label?: string;
  onChangeText: any;
} & TextInputProps;

const DateInput: React.FC<InputProps> = ({
  label,
  placeholder,
  secureTextEntry,
  onChangeText,

  ...rest
}) => {
  const theme = useContext(themeContext);
  const [showPassword, setShowPassword] = React.useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
    if (Platform.OS === "android") {
      const formattedDate = currentDate.toISOString();
      onChangeText(formattedDate.split("T")[0]); // Pass the selected date as the argument to onChangeText
    }
  };

  const showMode = (currentMode: any) => {
    // if (Platform.OS === "android") {
    //   setShow(false);
    //   // for iOS, add a button that closes the picker
    // }
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  return (
    <Pressable onPress={showDatepicker} style={{ marginTop: scale(10) }}>
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
          editable={false}
          value={date.toLocaleDateString() || ""}
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

        <Pressable
          style={{
            position: "absolute",
            right: scale(10),
            //   top: scale(10),
          }}
          onPress={showDatepicker}
        >
          <Ionicons
            name="calendar-outline"
            size={scale(18)}
            color={theme.secondary}
          />
        </Pressable>

        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={"date"}
            is24Hour={true}
            onChange={onChange}
            display="spinner"
          />
        )}
      </View>
    </Pressable>
  );
};

export default DateInput;
