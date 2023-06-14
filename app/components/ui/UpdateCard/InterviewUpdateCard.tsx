import { StyleSheet, Touchable, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import { scale } from "react-native-size-matters";
import Text from "../Typography/Text";
import { COLORS } from "../../../config/constants/color";
import themeContext from "../../../config/theme/themeContext";
import { Seperator } from "../_helpers";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  job_title: string;
  company: string;
  date_picked: string;
  user_name: string;
  // updateType: string;
  time_picked: string;
  remainigTime?: string;
  onPress: () => void;
};

const InterviewUpdateCard: React.FC<Props> = ({
  job_title,
  date_picked,
  // updateType,
  user_name,
  company,
  time_picked,
  onPress,
  // remainigTime,
}) => {
  const theme = useContext(themeContext);

  return (
    <View
      style={{
        overflow: "hidden",
        backgroundColor: theme.primary,
        borderRadius: scale(10),
        marginVertical: scale(8),
        borderColor: theme.grayText,
        shadowColor: theme.text,
        borderWidth: scale(1),
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 4,
        paddingVertical: scale(10),
        flexDirection: "row",
        alignItems: "center",
        position: "relative",
      }}
    >
      <View
        style={{
          width: scale(5),
          height: "70%",
          borderRadius: scale(10),

          backgroundColor: theme.background,
          justifyContent: "center",
          alignItems: "center",
          marginLeft: scale(6),
          marginRight: scale(10),
          borderColor: theme.text,
          borderWidth: StyleSheet.hairlineWidth,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

          elevation: 5,
        }}
      />
      <View>
        <Text
          style={{
            // marginVertical: scale(12),
            fontSize: scale(13),
            paddingRight: scale(15),
          }}
        >
          <Text
            style={{
              fontSize: scale(13),
              fontWeight: "bold",
            }}
          >
            {company}{" "}
          </Text>
          has invited{" "}
          <Text
            style={{
              fontSize: scale(13),
              fontWeight: "bold",
            }}
          >
            {user_name}{" "}
          </Text>
          for the position of{" "}
          <Text
            style={{
              fontSize: scale(13),
              fontWeight: "bold",
            }}
          >
            {job_title}.
          </Text>
        </Text>
        <Seperator height={scale(5)} />

        <View
          style={{
            flex: 1,
            height: 1,
            backgroundColor: theme.text,
            opacity: 0.2,
          }}
        />

        <Seperator height={scale(5)} />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingRight: scale(15),
          }}
        >
          <Text
            style={{
              fontSize: scale(13),
              fontWeight: "bold",
            }}
          >
            Date:{" "}
          </Text>
          <Text
            style={{
              fontSize: scale(13),
            }}
          >
            {date_picked === null ? "Not Specified" : date_picked}
          </Text>

          <Seperator width={scale(5)} />

          <Text
            style={{
              fontSize: scale(13),
              fontWeight: "bold",
            }}
          >
            Time:{" "}
          </Text>
          <Text
            style={{
              fontSize: scale(13),
            }}
          >
            {time_picked === null ? "Not Specified" : time_picked}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        onPress={onPress}
        style={{
          position: "absolute",
          bottom: scale(5),
          right: scale(5),
          backgroundColor: theme.background,
          borderRadius: scale(50),
        }}
      >
        <Ionicons
          name="arrow-forward-circle-outline"
          size={scale(20)}
          color={theme.text}
          style={{}}
        />
      </TouchableOpacity>
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
