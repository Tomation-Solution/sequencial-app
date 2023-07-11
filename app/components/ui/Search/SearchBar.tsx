import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Animated,
  Dimensions,
  ViewStyle,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useRef, useState } from "react";
import themeContext from "../../../config/theme/themeContext";
import { Ionicons } from "@expo/vector-icons";
import { scale } from "react-native-size-matters";
import { TextInput } from "react-native-gesture-handler";

const SearchBar = ({
  outlineType,
  onFocusFnc,
  onBlurFnc,
  onSearchFnc,
  onChangeText,
}: {
  outlineType?: "outline" | "filled";
  onFocusFnc?: any;
  onBlurFnc?: any;
  onSearchFnc?: any;
  onChangeText?: any;
}) => {
  const theme = useContext(themeContext);
  const searchAnim = useRef(new Animated.Value(0)).current;

  const [isFocused, setIsFocused] = useState(false);

  const { height } = Dimensions.get("screen");

  const handleFocus = () => {
    setIsFocused(true);
    if (onFocusFnc) onFocusFnc();
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (onBlurFnc) onBlurFnc();
  };

  return (
    <View
      style={{
        paddingHorizontal: scale(20),
      }}
    >
      <View
        style={{
          backgroundColor:
            outlineType === "outline" ? theme.background : theme.placeholder,
          borderColor: theme.primary,
          borderWidth: outlineType === "outline" ? scale(1) : 0,

          paddingHorizontal: scale(8),
          paddingVertical: scale(5),
          borderRadius: scale(12),
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {!isFocused && (
          <TouchableOpacity

          // style={{ pointerEvents: "auto" } as ViewStyle}
          >
            <Ionicons
              name="search"
              size={scale(21)}
              color={isFocused ? theme.primary : theme.text}
            />
          </TouchableOpacity>
        )}

        <TextInput
          placeholderTextColor={theme.text}
          returnKeyType="search"
          style={{
            flex: 1,
            color: theme.text,
          }}
          placeholder="Search"
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChangeText={onChangeText}
        />

        {isFocused && (
          <TouchableOpacity
            onPress={() => {
              if (onSearchFnc) onSearchFnc();
            }}
            // style={{ pointerEvents: "auto" } as ViewStyle}
          >
            <Ionicons
              name="search"
              size={scale(21)}
              color={isFocused ? theme.primary : theme.text}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({});
