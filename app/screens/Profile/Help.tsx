import { StyleSheet, View } from "react-native";
import React, { useContext } from "react";
import { HeaderContext } from "../../providers/context/header";
import { useFocusEffect } from "@react-navigation/native";
import themeContext from "../../config/theme/themeContext";
import { Seperator } from "../../components/ui/_helpers";
import { Text } from "../../components/ui";
import { scale } from "react-native-size-matters";

const Help = ({ navigation }: { navigation: any }) => {
  const { showHeaderTextHandler } = useContext(HeaderContext);
  const theme = useContext(themeContext);

  useFocusEffect(
    React.useCallback(() => {
      showHeaderTextHandler("Help & Support");
    }, [])
  );
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.background,
      }}
    >
      <Seperator height={20} />
      <View
        style={{
          paddingHorizontal: 20,
        }}
      >
        <Seperator height={10} />
        <View
          style={{
            backgroundColor: theme.background,
            padding: 20,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 5,
            },
            shadowOpacity: 0.34,
            shadowRadius: 6.27,

            elevation: 10,
          }}
        >
          <Text>Need Help? </Text>
          <Text
            style={{
              fontSize: scale(20),
              fontWeight: "bold",
            }}
          >
            Our Customer service agents are ready to assist{" "}
          </Text>
        </View>

        <Seperator height={20} />
        <View
          style={{
            backgroundColor: theme.background,
            padding: 20,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 5,
            },
            shadowOpacity: 0.34,
            shadowRadius: 6.27,

            elevation: 10,
          }}
        >
          <Text>Connect with us on Social Meida ? </Text>
          <Text
            style={{
              fontSize: scale(20),
              fontWeight: "bold",
            }}
          >
            Our Customer service agents are ready to assist{" "}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Help;

const styles = StyleSheet.create({});
