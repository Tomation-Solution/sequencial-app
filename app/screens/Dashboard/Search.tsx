import { StyleSheet, Text, View } from "react-native";
import React, { memo, useContext, useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Seperator } from "../../components/ui/_helpers";
import themeContext from "../../config/theme/themeContext";
import { scale } from "react-native-size-matters";

import JobsCardContainer from "../../components/app/Jobs/containers/JobsCardContainer";
import { useFocusEffect } from "@react-navigation/native";
import ApiContext from "../../providers/context/api";
import { getJobsFnc } from "../../providers/call-service/jobs";
import Loading from "../../components/ui/_helpers/Loading";
import { useNotifications } from "../../hooks/app-hooks/useNotification";

const Search = ({ navigation, searchData, isLoading }: any) => {
  const theme = useContext(themeContext);
  const { showNotification } = useNotifications();

  const { useApiQuery } = useContext(ApiContext);

  const jobs_query = useApiQuery({
    queryKey: "searchJobs",
    queryFunction: getJobsFnc,
  });

  // const handleNavPress = ({ item }: any) => {
  //   if (type !== item.type) {
  //     setType(item.type);
  //   }
  // };

  //   useFocusEffect(
  //     React.useCallback(() => {
  //       jobs_query.refetch();
  //     }, [])
  //   );

  //   useEffect(() => {
  //     if (jobs_query.isError) {
  //       if (jobs_query.error?.response?.data?.error?.cv) {
  //         navigation.navigate("CV Management");
  //         showNotification({
  //           title: "Error",
  //           type: 0,
  //           message: "You Need to upload your cv",
  //         });
  //       }
  //     }
  //   }, [jobs_query.isError]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <View
          style={{
            backgroundColor: theme.background,
            flex: 1,
          }}
        >
          <ScrollView>
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
                Search Jobs
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                paddingHorizontal: scale(15),

                paddingBottom: scale(65),
              }}
            >
              {searchData ? (
                <JobsCardContainer
                  cardData={searchData}
                  navigation={navigation}
                />
              ) : (
                <Text>Search Jobs</Text>
              )}
              {/* <JobOfferContainer cardData={test} navigation={navigation} /> */}
            </View>
          </ScrollView>
        </View>
      )}
    </>
  );
};

export default memo(Search);

const styles = StyleSheet.create({});
