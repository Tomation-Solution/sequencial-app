import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Seperator } from "../../components/ui/_helpers";
import themeContext from "../../config/theme/themeContext";
import { scale } from "react-native-size-matters";

import JobsCardContainer from "../../components/app/Jobs/containers/JobsCardContainer";
import { useFocusEffect } from "@react-navigation/native";
import ApiContext from "../../providers/context/api";
import { getJobsFnc } from "../../providers/call-service/jobs";
import Loading from "../../components/ui/_helpers/Loading";

const AllJobs = ({ navigation }: any) => {
  const theme = useContext(themeContext);

  const { useApiQuery } = useContext(ApiContext);

  const jobs_query = useApiQuery({
    queryKey: "fetchAllJobs",
    queryFunction: getJobsFnc,
  });

  // const handleNavPress = ({ item }: any) => {
  //   if (type !== item.type) {
  //     setType(item.type);
  //   }
  // };

  useFocusEffect(
    React.useCallback(() => {
      jobs_query.refetch();
    }, [])
  );

  return (
    <>
      {jobs_query.isLoading ? (
        <Loading />
      ) : (
        <View
          style={{
            backgroundColor: theme.background,
            flex: 1,
          }}
        >
          <Seperator height={15} />

          <View
            style={{
              paddingHorizontal: scale(15),
              paddingBottom: scale(15),
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: scale(16),
                color: theme.text,
              }}
            >
              All Jobs
            </Text>
          </View>

          <ScrollView>
            <View
              style={{
                flex: 1,
                paddingHorizontal: scale(15),

                paddingBottom: scale(65),
              }}
            >
              <JobsCardContainer
                cardData={jobs_query.data?.data}
                navigation={navigation}
              />
              {/* <JobOfferContainer cardData={test} navigation={navigation} /> */}
            </View>
          </ScrollView>
        </View>
      )}
    </>
  );
};

export default AllJobs;

const styles = StyleSheet.create({});
