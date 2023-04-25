import { Pressable, StyleSheet, View } from "react-native";
import React from "react";
import Text from "../Typography/Text";
import { scale } from "react-native-size-matters";
import { COLORS } from "../../../globals/constants/color";
import { Entypo, FontAwesome5, Ionicons } from "@expo/vector-icons";

type Props = {
  jobTitle: string;
  companyName: string;
  location: string;
  jobType: string;
  salary: string;
  canApplyFromPhone: boolean;
  isHiringMultiple: boolean;
  whenPosted: string;
};

const JobDetailsCard: React.FC<Props> = ({
  jobTitle,
  companyName,
  location,
  jobType,
  salary,
  canApplyFromPhone,
  isHiringMultiple,
  whenPosted,
}) => {
  return (
    <View
      style={{
        backgroundColor: "#fff",
        padding: scale(20),
        borderRadius: 8,
        shadowColor: "#000",
        position: "relative",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginBottom: scale(20),
        overflow: "hidden",
      }}
    >
      <Pressable
        onPress={() => {}}
        style={{
          position: "absolute",
          top: scale(10),
          right: scale(10),
        }}
      >
        <Ionicons name="heart-outline" size={24} color={COLORS.secondary} />
      </Pressable>
      <View
        style={{
          marginTop: scale(10),
        }}
      >
        <Text
          style={{
            fontSize: scale(15),
            fontWeight: "bold",
          }}
        >
          {companyName}
        </Text>
        <Text
          style={{
            fontSize: scale(16),
            backgroundColor: COLORS.secondary,
            color: "#fff",
            width: "100%",
            padding: scale(5),
            borderRadius: scale(5),
            marginTop: scale(5),
          }}
        >
          {jobTitle}
        </Text>
        <Text
          style={{
            fontSize: scale(12),
            fontWeight: "bold",
          }}
        >
          {location}
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: scale(5),
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
              backgroundColor: COLORS.light_gray,
              padding: scale(5),
              borderRadius: scale(5),
              marginRight: scale(10),
            }}
          >
            <Entypo name="suitcase" size={scale(12)} color={COLORS.secondary} />
            <Text
              style={{
                fontSize: scale(10),
                fontWeight: "bold",
                marginLeft: scale(5),
              }}
            >
              {jobType}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
              backgroundColor: COLORS.light_gray,
              padding: scale(5),
              borderRadius: scale(5),
            }}
          >
            <FontAwesome5
              name="money-bill-wave"
              size={scale(10)}
              color={COLORS.secondary}
            />
            <Text
              style={{
                fontSize: scale(10),
                fontWeight: "bold",
                marginLeft: scale(5),
              }}
            >
              ${salary}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",

            borderRadius: scale(5),
          }}
        >
          <FontAwesome5
            name="paper-plane"
            size={scale(11)}
            color={COLORS.light_blue}
          />
          <Text
            style={{
              fontSize: scale(12),
              fontWeight: "bold",
              marginBottom: scale(5),
              marginLeft: scale(5),
            }}
          >
            {canApplyFromPhone
              ? "Apply from your phone"
              : "Apply on the company's site"}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",

            borderRadius: scale(5),
          }}
        >
          <Ionicons
            name="md-person-circle-outline"
            size={scale(13)}
            color={COLORS.light_blue}
          />
          <Text
            style={{
              fontSize: scale(12),
              fontWeight: "bold",
              marginBottom: scale(5),
              marginLeft: scale(5),
            }}
          >
            {isHiringMultiple
              ? "Hiring Multiple candidates"
              : "Not Hiring Multiple candidates"}
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          position: "absolute",
          left: 0,
          top: 0,
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
            borderBottomRightRadius: scale(6),
          }}
        >
          {whenPosted}
        </Text>
      </View>
    </View>
  );
};

export default JobDetailsCard;

const styles = StyleSheet.create({});
