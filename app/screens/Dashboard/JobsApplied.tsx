import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Seperator } from "../../components/ui/_helpers";
import themeContext from "../../config/theme/themeContext";
import { scale } from "react-native-size-matters";

import JobsCardContainer from "../../components/app/Jobs/containers/JobsCardContainer";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import ApiContext from "../../providers/context/api";
import {
  getJobsFnc,
  jobsApplied,
  jobsTestScheduled,
} from "../../providers/call-service/jobs";
import { AppContext } from "../../providers/context/app";
import Loading from "../../components/ui/_helpers/Loading";
import JobDetailsCard from "../../components/app/Jobs/JobDetails/JobDetailsCard";

const JobsApplied = ({ navigation }: any) => {
  const theme = useContext(themeContext);
  const { setModalVisible } = useContext(AppContext);

  const { useApiQuery } = useContext(ApiContext);

  const jobs_query = useApiQuery({
    queryKey: "fectJobsApplied",
    queryFunction: jobsApplied,
  });

  const [type, setType] = useState("jobs");

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
              Jobs Applied
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
              {jobs_query.data?.data.map((item: any) => (
                <JobDetailsCard
                  canApplyFromPhone={item?.job?.more_on_job?.canApplyFromPhone}
                  org_name={item?.job?.more_on_job?.org_name}
                  isHiringMultiple={item?.job?.more_on_job?.isHiringMultiple}
                  job_title={item?.job?.more_on_job?.job_title}
                  job_type={item?.job?.more_on_job?.job_type}
                  location={item?.job?.more_on_job?.location}
                  salary={item?.job?.more_on_job?.salary}
                  currency={item?.job?.more_on_job?.currency}
                  whenPosted={item?.job?.more_on_job?.whenPosted}
                  image={item?.job?.more_on_job?.image}
                  key={item?.job?.more_on_job?.id}
                  navigation={navigation}
                />
              ))}
            </View>
          </ScrollView>
        </View>
      )}
    </>
  );
};

export default JobsApplied;

const styles = StyleSheet.create({});
