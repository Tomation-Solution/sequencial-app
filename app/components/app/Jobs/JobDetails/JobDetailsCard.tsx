import { Pressable, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { memo, useContext } from "react";
import Text from "../../../ui/Typography/Text";
import { scale } from "react-native-size-matters";
import { COLORS } from "../../../../config/constants/color";
import { Entypo, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { Image } from "react-native";
import { placeholders } from "../../../../assets/placeholders";
import themeContext from "../../../../config/theme/themeContext";
import ImageComponent from "../../../ui/Image/ImageComponent";
import { limitTextLength } from "../../../../helper_functions/miscs";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import ApiContext from "../../../../providers/context/api";
import { likeJob } from "../../../../providers/call-service/jobs";

type Props = {
  job_title: string;
  org_name: string;
  location: string;
  job_type: string;
  salary: string;
  currency: string;
  canApplyFromPhone: boolean;
  isHiringMultiple: boolean;
  whenPosted: string;
  image: string;
  navigation: any;
  id: number | string;
  job_variant?: string;
  is_like?: boolean;
};

const JobDetailsCard: React.FC<Props> = ({
  job_title,
  org_name,
  location,
  job_type,
  salary,
  currency,
  canApplyFromPhone,
  isHiringMultiple,
  whenPosted,
  image,
  // navigation,
  id,
  job_variant,
  is_like,
}) => {
  const theme = useContext(themeContext);
  const [liked, setLiked] = React.useState<any>(is_like);

  const navigation = useNavigation<any>();

  const { useApiMutation } = useContext(ApiContext);

  const likeAJob = useApiMutation({
    mutationFunction: likeJob,
  });

  const handleLikeJob = () => {
    setLiked(!liked);
    likeAJob.mutate({
      job_id: id,
    });
  };

  // const _liked = liked[id] || is_like;

  return (
    <View
      style={{
        backgroundColor: theme.background,
        padding: scale(10),
        paddingBottom: scale(5),
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
        marginBottom: scale(1),
        overflow: "hidden",
      }}
    >
      <TouchableOpacity
        onPress={() => {
          handleLikeJob();
        }}
        style={{
          position: "absolute",
          top: scale(7),
          right: scale(7),
          padding: scale(5),
          zIndex: 100,
          borderRadius: scale(20),
          backgroundColor: theme.placeholder,
        }}
      >
        <Ionicons
          name={liked ? "heart" : "heart-outline"}
          size={24}
          color={theme[liked ? "primary" : "text"]}
        />
      </TouchableOpacity>
      <View>
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
          }}
        >
          {limitTextLength(30, job_title)}
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
              {org_name}
              {limitTextLength(20, org_name)}
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
              {job_type}
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
              {currency === "naira" ? "₦" : "$"}
              {salary}
            </Text>
          </View>
        </View>
        {/* <View
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
                fontSize: scale(10),
                // fontWeight: "bold",
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
                fontSize: scale(10),
                // fontWeight: "bold",
                marginLeft: scale(5),
              }}
            >
              {isHiringMultiple
                ? "Hiring Multiple candidates"
                : "Not Hiring Multiple candidates"}
            </Text>
          </View>
        </View> */}
      </View>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() =>
          navigation.navigate("Jobs", {
            screen: "Job_Details",
            params: {
              is_like: is_like,
              job_id: id,
              job_variant,
            },
          })
        }
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          position: "absolute",
          right: 0,
          bottom: "35%",
        }}
      >
        <Text
          style={{
            fontSize: scale(10),
            fontWeight: "bold",
            color: "white",
            paddingHorizontal: scale(5),
            paddingVertical: scale(5),
            backgroundColor: theme.primary,
            borderTopLeftRadius: scale(6),
            borderBottomLeftRadius: scale(6),
            // borderBottomRightRadius: scale(6),
          }}
        >
          {/* {whenPosted} */}
          View Job
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default memo(JobDetailsCard);

const styles = StyleSheet.create({});
