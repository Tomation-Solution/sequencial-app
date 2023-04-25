import { Dimensions, StyleSheet, View } from "react-native";
import React from "react";
import { scale } from "react-native-size-matters";
import Text from "../Typography/Text";

type Props = {
  color: string;
  count: number;
  title: string;
  smallCount?: number;
};

const { width } = Dimensions.get("window");

const StatsCard: React.FC<Props> = ({ color, count, smallCount, title }) => {
  return (
    <View
      style={{
        // flex: 1,
        width: scale(width * 0.6),
        borderRadius: scale(12),
        backgroundColor: "white",
        padding: scale(15),
        marginRight: scale(10),
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 1.84,
        elevation: 5,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color,
            fontWeight: "800",
            fontSize: scale(22),
          }}
        >
          {count}
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {smallCount && (
            <>
              <View
                style={{
                  backgroundColor: color,
                  height: scale(8),
                  width: scale(8),
                  borderRadius: scale(8),
                  marginRight: scale(2),
                }}
              />
              <Text
                style={{
                  fontSize: scale(11),
                  color,
                }}
              >
                +{smallCount}
              </Text>
            </>
          )}
        </View>
      </View>
      <Text
        style={{
          fontWeight: "600",
          marginTop: scale(10),
        }}
      >
        {title}
      </Text>
    </View>
  );
};

export default StatsCard;

const styles = StyleSheet.create({});
