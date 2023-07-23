import { Pressable, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import { scale } from "react-native-size-matters";
import themeContext from "../../config/theme/themeContext";
import { Seperator } from "../../components/ui/_helpers";
import { Button, Text } from "../../components/ui";
import { Ionicons, Entypo } from "@expo/vector-icons";
import JobWrapper from "./JobWrapper";
import { HeaderContext } from "../../providers/context/header";
import { useFocusEffect } from "@react-navigation/native";
import { useWindowDimensions } from "react-native";
import RenderHtml from "react-native-render-html";
import ApiContext from "../../providers/context/api";
import { getSingleJobFnc, likeJob } from "../../providers/call-service/jobs";
import { calculateDaysToToday } from "../../helper_functions/dateFormater";

const BulletPoint = ({ children, params }: any) => {
  const theme = useContext(themeContext);
  const { showHeaderTextHandler } = React.useContext(HeaderContext);
  const { job_id: id, job_variant } = params;

  useFocusEffect(
    React.useCallback(() => {
      showHeaderTextHandler("Job Details");
    }, [])
  );

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "flex-start",
        marginVertical: scale(2),
        //   justifyContent: "flex-end",
      }}
    >
      <View
        style={{
          height: scale(6),
          width: scale(6),
          borderRadius: scale(4),
          backgroundColor: theme.text,
          marginTop: scale(5),
          marginRight: scale(10),
        }}
      />
      <Text
        style={{
          fontSize: scale(14),
          color: theme.grayText,
        }}
      >
        {children}
      </Text>
    </View>
  );
};

const Details = ({
  navigation,
  route,
  setShowHeader,
}: {
  navigation: any;
  route: any;
  setShowHeader: any;
}) => {
  const theme = useContext(themeContext);
  const { width } = useWindowDimensions();

  const { useApiMutation } = useContext(ApiContext);
  const { useApiQuery } = useContext(ApiContext);

  const { job_id, job_variant, is_like } = route.params;
  const [liked, setLiked] = React.useState<any>(is_like);

  const likeAJob = useApiMutation({
    mutationFunction: likeJob,
  });

  const handleLikeJob = () => {
    setLiked(!liked);
    likeAJob.mutate({
      job_id: job_id,
    });
  };

  useFocusEffect(
    React.useCallback(() => {
      navigation.navigate("Jobs");
      if (!job_id) {
      }
      setShowHeader(false);
    }, [navigation])
  );

  const job_query = useApiQuery({
    queryKey: "fetchAllJobs",
    queryFunction: getSingleJobFnc(job_id),
  });

  const { location, org_name, job_title, org_logo, created_on } =
    job_query.data.data[0];

  console.log("job query", job_query);

  const extraData = {
    location,
    org_name,
    job_title,
    org_logo,
    created_on,
  };

  const source = {
    html: job_query.data.data[0]?.description_content,
  };
  return (
    <JobWrapper
      navigation={navigation}
      company={org_name}
      location={location}
      org_logo={org_logo}
      job_title={job_title}
      posted_on={calculateDaysToToday(created_on)}
    >
      <View
        style={{
          borderColor: theme.placeholder,
          borderWidth: scale(2),
          borderRadius: scale(8),
          padding: scale(12),
          borderStyle: "dashed",
        }}
      >
        <RenderHtml contentWidth={width} source={source} />

        <View
          style={{
            marginTop: scale(30),
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={handleLikeJob}>
            <Ionicons
              name={liked ? "heart" : "heart-outline"}
              size={28}
              color={theme[liked ? "primary" : "text"]}
            />
          </TouchableOpacity>
          <Button
            onPress={() =>
              navigation.navigate("Apply", { job_id, job_variant, extraData })
            }
            styles={{
              flex: 1,
              marginLeft: scale(10),
            }}
          >
            APPLY NOW
          </Button>
        </View>
      </View>
    </JobWrapper>
  );
};

export default Details;

const styles = StyleSheet.create({});
