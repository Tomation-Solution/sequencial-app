import { StyleSheet, View } from "react-native";
import React from "react";
import { scale } from "react-native-size-matters";
import Text from "../Typography/Text";
import { COLORS } from "../../../config/constants/color";

type Props = {
  job_title: string;
  company: string;
  date_picked: string;
  user_name: string;
  updateType: string;
  time_picked: string;
  remainigTime?: string;
};

const InterviewUpdateCard: React.FC<Props> = ({
  job_title,
  date_picked,
  updateType,
  user_name,
  company,
  time_picked,
  remainigTime,
}) => {
  return (
    <View
      style={{
        borderColor: COLORS.light_blue,
        borderWidth: scale(1),
        borderRadius: scale(8),
        paddingTop: scale(10),
        marginVertical: scale(2),
        overflow: "hidden",
      }}
    >
      <View
        style={{
          paddingHorizontal: scale(10),
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {remainigTime && (
            <Text
              style={{
                ...styles.badge,
                backgroundColor: COLORS.light_red,
              }}
            >
              {remainigTime}
            </Text>
          )}
          <Text
            style={{
              ...styles.badge,
              backgroundColor: COLORS.light_green,
            }}
          >
            {updateType}
          </Text>
        </View>

        <Text
          style={{
            marginVertical: scale(12),
            fontWeight: "600",
            fontSize: scale(15),
          }}
        >
          {company} has invited {user_name} for the position of {job_title}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        <Text
          style={{
            fontSize: scale(10),
            fontWeight: "bold",
            color: COLORS.gray,
            paddingHorizontal: scale(5),
            // paddingVertical: scale(2),
            backgroundColor: COLORS.secondary,
            borderTopLeftRadius: scale(10),
          }}
        >
          {date_picked}, {time_picked}
        </Text>
      </View>
    </View>
  );
};

export default InterviewUpdateCard;

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
