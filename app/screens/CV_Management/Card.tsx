import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import { scale } from "react-native-size-matters";
import { Ionicons } from "@expo/vector-icons";
import themeContext from "../../config/theme/themeContext";

const Card = ({
  children,
  handler,
  index,
  header,
}: {
  children: any;
  handler: any;
  index: number;
  header: string;
}) => {
  const theme = useContext(themeContext);
  return (
    <View
      style={{
        marginLeft: scale(10),
        backgroundColor: index % 2 !== 0 ? theme.light_blue : "",
        borderColor: theme.primary,
        borderWidth: index % 2 === 0 ? StyleSheet.hairlineWidth : 0,
        padding: scale(10),
        borderRadius: scale(10),
        marginBottom: scale(10),
        width: scale(270),
        flex: 1,
      }}
      key={index}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text>
          {header} {index + 1}
        </Text>
        <TouchableOpacity
          onPress={() => {
            handler(index);
          }}
        >
          <Ionicons name="trash-outline" size={scale(20)} color={theme.text} />
        </TouchableOpacity>
      </View>

      {children}
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({});
