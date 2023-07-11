import { Pressable, StyleSheet, View } from "react-native";
import React, { useContext, useState } from "react";
import { Text } from "../../ui";
import themeContext from "../../../config/theme/themeContext";
import { scale } from "react-native-size-matters";

import { SimpleLineIcons } from "@expo/vector-icons";
import { convertToTitleCase } from "../../../helper_functions/miscs";

type Props = {
  id: string;
  title: string;
  activeId: string;
  changeActiveId: any;
  _count: number | string;
  onPress?: () => void;
};

const NavButton: React.FC<Props> = ({
  id,
  title,
  activeId,
  changeActiveId,
  _count,
  onPress,
}) => {
  const theme = useContext(themeContext);

  const handlePress = () => {
    changeActiveId(id, convertToTitleCase(title));
    onPress;
  };

  const active = activeId === id;

  return (
    <Pressable
      onPress={handlePress}
      style={{
        paddingHorizontal: scale(8),
        paddingRight: _count === "_" ? scale(8) : scale(25),
        paddingVertical: scale(5),
        borderRadius: scale(8),
        marginHorizontal: scale(3.5),
        backgroundColor: active ? theme.primary : theme.placeholder,
        alignItems: "center",
        flexDirection: "row",
        position: "relative",
        overflow: "hidden",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
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
      {_count !== "_" && (
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
              color: theme.text,
              fontWeight: active ? "bold" : "400",
              fontSize: scale(12),
              marginLeft: scale(7),
              textAlign: "center",
            }}
          >
            {_count}
          </Text>
        </View>
      )}
    </Pressable>
  );
};

export default NavButton;

const styles = StyleSheet.create({});
