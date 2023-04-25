import { StyleSheet, View } from "react-native";
import React from "react";
import { COLORS } from "../../../globals/constants/color";
import { scale } from "react-native-size-matters";
import Text from "../Typography/Text";

type Props = {
  name: string;
  date: string;
  type: string;
  applicants: string;
};

const StatsDetailsCard: React.FC<Props> = ({
  name,
  date,
  type,
  applicants,
}) => {
  return (
    <View
      style={{
        shadowColor: "#000",
        backgroundColor: "#fff",
        overflow: "hidden",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        position: "relative",
        borderTopLeftRadius: scale(10),
        borderBottomLeftRadius: scale(10),
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          padding: scale(10),
        }}
      >
        <View
          style={{
            backgroundColor: "gray",
            width: scale(6),
            height: "100%",
            marginRight: scale(6),
            borderRadius: 10,
          }}
        />

        <View
          style={{
            width: "100%",
            marginBottom: scale(10),
          }}
        >
          <View
            style={{
              marginTop: scale(12),
              width: "90%",
            }}
          >
            <Text
              style={{
                backgroundColor: COLORS.gray,
                paddingHorizontal: scale(5),
                paddingVertical: scale(2),
                borderRadius: scale(10),

                fontSize: scale(15),
                fontWeight: "bold",
                color: COLORS.secondary,
              }}
            >
              {name}
            </Text>
            <View
              style={{
                flexDirection: "row",
                marginVertical: scale(5),
                // justifyContent: "flex-end",
              }}
            >
              <Text
                style={{
                  fontSize: scale(10),
                  fontWeight: "bold",
                  color: "white",
                  paddingHorizontal: scale(5),
                  paddingVertical: scale(2),
                  backgroundColor: COLORS.light_blue,
                  borderRadius: scale(10),
                }}
              >
                {applicants}
              </Text>
            </View>

            <Text
              style={{
                fontSize: scale(13),
              }}
            >
              {type}
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          position: "absolute",
          right: 0,
          bottom: 0,
        }}
      >
        <Text
          style={{
            fontSize: scale(10),
            fontWeight: "bold",
            color: "white",
            paddingHorizontal: scale(5),
            // paddingVertical: scale(2),
            backgroundColor: COLORS.secondary,
            borderTopLeftRadius: scale(10),
          }}
        >
          {date}
        </Text>
      </View>
    </View>
  );
};

export default StatsDetailsCard;

const styles = StyleSheet.create({});
