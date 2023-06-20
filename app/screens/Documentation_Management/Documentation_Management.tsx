import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { HeaderContext } from "../../providers/context/header";
import { useFocusEffect } from "@react-navigation/native";

const Documentation_Management = () => {
  const { showHeaderTextHandler } = React.useContext(HeaderContext);

  useFocusEffect(
    React.useCallback(() => {
      showHeaderTextHandler("Documentation Management");
    }, [])
  );

  return (
    <View>
      <Text>Documentation_Management</Text>
    </View>
  );
};

export default Documentation_Management;

const styles = StyleSheet.create({});
