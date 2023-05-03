import { Pressable, StyleSheet, View } from "react-native";
import React, { useContext, useState } from "react";
import { Text } from "../../ui";
import themeContext from "../../../config/theme/themeContext";
import { scale } from "react-native-size-matters";

import { SimpleLineIcons } from "@expo/vector-icons";

type Props = {
  id: string;
  title: string;
  activeId: string;
  changeActiveId: any;
  onPress?: () => void;
};

const NavButton: React.FC<Props> = ({
  id,
  title,
  activeId,
  changeActiveId,
  onPress,
}) => {
  const theme = useContext(themeContext);

  const handlePress = () => {
    changeActiveId(id);
    onPress;
  };

  const active = activeId === id;

  return (
    <Pressable
      onPress={handlePress}
      style={{
        paddingHorizontal: scale(8),
        paddingRight: active ? scale(25) : scale(8),
        paddingVertical: scale(2),
        borderRadius: scale(8),
        marginHorizontal: scale(3.5),
        backgroundColor: active ? theme.primary : theme.disabled,
        alignItems: "center",
        flexDirection: "row",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Text
        style={{
          color: active ? theme.background : theme.text,
          fontWeight: active ? "bold" : "400",
          fontSize: scale(12),
        }}
      >
        {title}
      </Text>
      {active && (
        <View
          style={{
            position: "absolute",
            backgroundColor: theme.background,
            height: scale(30),
            width: scale(40),
            borderRadius: scale(15),
            right: -scale(20),
            marginLeft: scale(8),
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: active ? theme.text : theme.background,
              fontWeight: active ? "bold" : "400",
              fontSize: scale(12),
              marginLeft: scale(7),
              textAlign: "center",
            }}
          >
            5
          </Text>
        </View>
      )}
    </Pressable>
  );
};

export default NavButton;

const styles = StyleSheet.create({});
