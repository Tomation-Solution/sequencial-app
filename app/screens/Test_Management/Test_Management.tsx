import { StyleSheet, View, useColorScheme } from "react-native";
import React, { useLayoutEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { HeaderContext } from "../../providers/context/header";

import { Text } from "../../components/ui";

const Test_Management = () => {
  const { showHeaderTextHandler } = React.useContext(HeaderContext);
  const colorScheme = useColorScheme();

  useFocusEffect(
    React.useCallback(() => {
      showHeaderTextHandler("Test Management");
    }, [])
  );
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Test_Management</Text>
    </View>
  );
};

export default Test_Management;

const styles = StyleSheet.create({});
