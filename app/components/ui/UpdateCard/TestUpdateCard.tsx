import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import { scale } from "react-native-size-matters";
import Text from "../Typography/Text";
import { COLORS } from "../../../config/constants/color";
import themeContext from "../../../config/theme/themeContext";

type Props = {
  // notification: string;
  // date: string;
  updateType: string;
  // startTime: string;
  // endTime: string;
  // remainigTime?: string;
  org_name: string;
  title: string;
  job_title: string;
  onPress: () => void;
};

const TestUpdateCard: React.FC<Props> = ({
  // notification,
  // date,
  updateType,
  // startTime,
  // endTime,
  // remainigTime,
  org_name,
  title,
  job_title,
  onPress,
}) => {
  const theme = useContext(themeContext);
  return (
    <View
      style={{
        position: "relative",
      }}
    >
      <View
        style={{
          borderColor: theme.primary,
          borderWidth: scale(1),
          borderRadius: scale(8),
          // paddingTop: scale(10),
          marginVertical: scale(2),

          backgroundColor: theme.background,
          padding: 1,
        }}
      >
        <View
          style={{
            paddingRight: scale(10),
            position: "relative",
            borderRadius: scale(8),
            overflow: "hidden",
          }}
        >
          <View
            style={{
              backgroundColor: theme.primary,
              position: "absolute",
              height: "100%",
              zIndex: 10,
              top: 0,
              alignContent: "center",
              justifyContent: "center",
              paddingHorizontal: scale(3),
            }}
          >
            <View
              style={{
                width: scale(10),
                height: scale(10),
                backgroundColor: theme.background,
                borderRadius: scale(5),
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.22,
                shadowRadius: 2.22,

                elevation: 3,
              }}
            />
          </View>

          <Text
            style={{
              marginVertical: scale(8),
              marginLeft: scale(20),
              fontWeight: "600",
              fontSize: scale(13),
            }}
          >
            {org_name} has invited you to take {title} for the position of{" "}
            {job_title}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={onPress}
        style={{
          backgroundColor: theme.primary,
          padding: scale(5),
          paddingHorizontal: scale(10),
          alignSelf: "flex-end",
          marginTop: scale(-12),
          marginRight: scale(10),
          borderRadius: scale(5),
          marginBottom: scale(3),
        }}
      >
        <Text
          style={{
            color: theme.background,
            fontSize: scale(12),
            fontWeight: "bold",
          }}
        >
          View
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default TestUpdateCard;

const styles = StyleSheet.create({
  badge: {
    borderRadius: scale(13),
    paddingHorizontal: scale(10),
    paddingVertical: scale(5),
    color: "white",
    fontSize: scale(12),
    fontWeight: "bold",
    marginRight: scale(7),
  },
});
