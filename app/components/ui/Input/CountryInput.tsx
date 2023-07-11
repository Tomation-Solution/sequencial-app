import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import CountryPicker from "react-native-country-picker-modal";

import Input from "./Input";
import { scale } from "react-native-size-matters";
import themeContext from "../../../config/theme/themeContext";

type InputProps = {
  placeholder: string;
  secureTextEntry?: boolean;
  label?: string;
  country: any;
  setCountry: any;
  value: string;
} & TextInputProps;

const CountryInput = ({
  label,
  placeholder,
  country,
  setCountry,
  secureTextEntry,
  value,
  ...rest
}: InputProps) => {
  const theme = useContext(themeContext);
  const [isVsible, setIsVisible] = useState(false);

  return (
    <View>
      {isVsible && (
        <CountryPicker
          onSelect={(country) => setCountry(country)}
          withCloseButton={true}
          withFilter={true}
          withFlag={true}
          withCountryNameButton={true}
          withCallingCode={true}
          withCallingCodeButton={true}
          withCurrency={true}
          withCurrencyButton={true}
          withEmoji={true}
          visible={isVsible}
          onClose={() => setIsVisible(false)}
          onOpen={() => setIsVisible(true)}
          countryCode="US"
        />
      )}
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
            paddingLeft: scale(10),
          }}
        >
          <TouchableOpacity onPress={() => setIsVisible(true)}>
            <Text style={{ fontSize: scale(14) }}>
              {country?.callingCode
                ? "+" + country?.callingCode
                : "Select Country"}
            </Text>
          </TouchableOpacity>

          <TextInput
            style={{
              flex: 1,
              paddingHorizontal: scale(10),
              paddingVertical: scale(4),
              fontSize: scale(16),
              color: "#000",
            }}
            placeholder={placeholder}
            {...rest}
            value={value}
          />
        </View>
      </View>
    </View>
  );
};

export default CountryInput;

const styles = StyleSheet.create({});
