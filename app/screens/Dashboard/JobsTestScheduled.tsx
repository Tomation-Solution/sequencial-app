import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Seperator } from "../../components/ui/_helpers";
import themeContext from "../../config/theme/themeContext";
import { scale } from "react-native-size-matters";

import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import ApiContext from "../../providers/context/api";
import { AppContext } from "../../providers/context/app";
import { jobsTestScheduled } from "../../providers/call-service/jobs";
import JobTestContainer from "../../components/app/Jobs/containers/JobTestContainer";
import Loading from "../../components/ui/_helpers/Loading";
import { isLoading } from "expo-font";

const JobsTestScheduled = ({ navigation, setSearchState }: any) => {
  const theme = useContext(themeContext);
  const { setModalVisible } = useContext(AppContext);

  const { useApiQuery } = useContext(ApiContext);

  const jobs_query = useApiQuery({
    queryKey: "fetchJobsTestsSchedulde",
    queryFunction: jobsTestScheduled,
  });

  useFocusEffect(
    React.useCallback(() => {
      jobs_query.refetch();
      setSearchState(false);
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
                Jobs Test Scheduled
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                paddingHorizontal: scale(15),

                paddingBottom: scale(65),
              }}
            >
              {/* <JobsCardContainer
            cardData={jobs_query.data?.data}
            navigation={navigation}
          /> */}
              <JobTestContainer
                cardData={jobs_query?.data?.data}
                navigation={navigation}
              />
            </View>
          </ScrollView>
        </View>
      )}
    </>
  );
};

export default JobsTestScheduled;

const styles = StyleSheet.create({});
