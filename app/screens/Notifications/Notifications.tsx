import { View, Text } from "react-native";
import React from "react";
import { HeaderContext } from "../../providers/context/header";
import { useFocusEffect } from "@react-navigation/native";

const Notifications = () => {
  const { showHeaderTextHandler } = React.useContext(HeaderContext);

  useFocusEffect(
    React.useCallback(() => {
      showHeaderTextHandler("Notifications");
    }, [])
  );

  return (
    <View>
      <Text>Notifications</Text>
    </View>
  );
};

export default Notifications;
