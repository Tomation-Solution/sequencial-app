import { Pressable, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { memo, useContext } from "react";
import Text from "../../../ui/Typography/Text";
import { scale } from "react-native-size-matters";
import { COLORS } from "../../../../globals/constants/color";
import { Entypo, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { Image } from "react-native";
import { placeholders } from "../../../../assets/placeholders";
import themeContext from "../../../../config/theme/themeContext";
import ImageComponent from "../../../ui/Image/ImageComponent";
import { useNavigation } from "@react-navigation/native";

type Props = {
  jobTitle: string;
  companyName: string;
  location: string;
  jobType: string;
  salary: string;
  canApplyFromPhone: boolean;
  isHiringMultiple: boolean;
  whenPosted: string;
  image: string;
  navigation: any;
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
  image,
  navigation,
}) => {
  const theme = useContext(themeContext);

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => navigation.navigate("Jobs")}
      style={{
        backgroundColor: theme.background,
        padding: scale(10),
        borderRadius: 8,
        shadowColor: theme.text,
        position: "relative",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginBottom: scale(10),
        overflow: "hidden",
      }}
    >
      <Pressable
        onPress={() => {}}
        style={{
          position: "absolute",
          top: scale(5),
          right: scale(5),
        }}
      >
        <Ionicons name="heart-outline" size={24} color={theme.text} />
      </Pressable>
      <View
        style={{
          marginTop: scale(12),
        }}
      >
        <Text
          style={{
            fontSize: scale(16),
            // backgroundColor: theme.colors.primary,
            // borderBottomColor: COLORS.secondary,
            // borderBottomWidth: 1,
            color: theme.text,
            width: "100%",
            padding: scale(2),
            borderRadius: scale(5),
            marginTop: scale(5),
          }}
        >
          {jobTitle}
        </Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-end",
            marginTop: scale(4),
          }}
        >
          <View
            style={{
              width: scale(28),
              height: scale(28),
              borderRadius: scale(4),
              backgroundColor: theme.disabled,
              justifyContent: "center",
              alignItems: "center",
              marginRight: scale(5),
              overflow: "hidden",
              opacity: 0.8,
            }}
          >
            {/* <Image
              source={image ? { uri: image } : placeholders.company}
              style={{ width: scale(28), height: scale(28) }}
            /> */}

            <ImageComponent
              imageUrl={image}
              style={{ width: scale(28), height: scale(28) }}
            />
          </View>
          <View>
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
                fontSize: scale(12),
                // fontWeight: "bold",
              }}
            >
              {location}
            </Text>
          </View>
        </View>
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
              backgroundColor: theme.disabled,
              padding: scale(5),
              borderRadius: scale(5),
              marginRight: scale(10),
            }}
          >
            <Entypo name="suitcase" size={scale(12)} color={theme.secondary} />
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
              backgroundColor: theme.disabled,
              padding: scale(5),
              borderRadius: scale(5),
            }}
          >
            <FontAwesome5
              name="money-bill-wave"
              size={scale(10)}
              color={theme.secondary}
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
          }}
        >
          <View
            style={{
              flexDirection: "row",
              // alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FontAwesome5
              name="paper-plane"
              size={scale(11)}
              color={theme.primary}
            />
            <Text
              style={{
                fontSize: scale(12),
                fontWeight: "bold",
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
              justifyContent: "flex-end",
              marginLeft: scale(10),
            }}
          >
            <Ionicons
              name="md-person-circle-outline"
              size={scale(13)}
              color={theme.primary}
            />
            <Text
              style={{
                fontSize: scale(12),
                fontWeight: "bold",
                marginLeft: scale(5),
              }}
            >
              {isHiringMultiple
                ? "Hiring Multiple candidates"
                : "Not Hiring Multiple candidates"}
            </Text>
          </View>
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
            backgroundColor: theme.primary,
            borderBottomRightRadius: scale(6),
          }}
        >
          {whenPosted}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default memo(JobDetailsCard);

const styles = StyleSheet.create({});