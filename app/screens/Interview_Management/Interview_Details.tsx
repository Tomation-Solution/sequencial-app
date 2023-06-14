import {
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect } from "react";
import {
  getInterviewFunc,
  scheduleInterviewFunc,
} from "../../providers/call-service/interview_mangement";
import ApiContext from "../../providers/context/api";
import { useFocusEffect } from "@react-navigation/native";
import themeContext from "../../config/theme/themeContext";
import { Seperator } from "../../components/ui/_helpers";
import { scale } from "react-native-size-matters";
import { Button, Text } from "../../components/ui";
import { useNotifications } from "../../hooks/app-hooks/useNotification";
import Loading from "../../components/ui/_helpers/Loading";

const Interview_Details = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const { interview_id } = route.params;

  const { useApiQuery, useApiMutation } = useContext(ApiContext);
  const theme = useContext(themeContext);
  const { showNotification } = useNotifications();

  const [selectedDate, setSelectedDate] = React.useState<any>();
  const [selectedTime, setSelectedTime] = React.useState<any>();

  const getInterview = useApiQuery({
    queryKey: "getInterview",
    queryFunction: () => getInterviewFunc(interview_id),
  });

  const scheduleInterview = useApiMutation({
    mutationFunction: scheduleInterviewFunc,
  });

  const chooseDate = (date: any) => {
    if (getInterview.data?.data?.date_picked) {
      showNotification({
        title: "Warning",
        type: 2,
        message: "You have already picked a date",
      });
      return;
    }
    setSelectedDate(date);
  };

  const chooseTime = (time: any) => {
    if (getInterview.data?.data?.time_picked) {
      showNotification({
        title: "Warning",
        type: 2,
        message: "You have already picked a time",
      });
      return;
    }
    setSelectedTime(time);
  };

  const handleScheduleInterview = () => {
    if (!selectedDate || !selectedTime) {
      showNotification({
        title: "Warning",
        type: 2,
        message: "Please select a date and time",
      });
      return;
    }
    scheduleInterview.mutate({
      interview_id,
      available_time: selectedTime,
      available_dates: selectedDate,
    });
  };

  useEffect(() => {
    if (scheduleInterview.isSuccess) {
      // showNotification({
      // title: "Success",
      // type: 1,
      // message: "Interview Scheduled",
      // });
      navigation.goBack();
    }
  }, [scheduleInterview.isSuccess]);

  useFocusEffect(
    React.useCallback(() => {
      getInterview.refetch();
    }, [])
  );

  const Bullet = ({ title, content }: { title: string; content: string }) => (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginVertical: scale(5),
      }}
    >
      <View
        style={{
          width: scale(5),
          height: scale(5),
          borderRadius: scale(5),
          backgroundColor: theme.accent,
          marginRight: scale(5),
        }}
      />
      <View>
        <Text style={{ fontWeight: "bold" }}>{title}</Text>
        <Text>{content}</Text>
      </View>
    </View>
  );

  const Dates = () => (
    <View>
      <Text>Available Dates: </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: scale(5),
          }}
        >
          {getInterview.data?.data?.interview?.dates_related_data?.dates.map(
            (date: any, index: number) => (
              <TouchableOpacity
                onPress={() => chooseDate(date.available_dates)}
                key={index}
                disabled={date.is_selected}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginVertical: scale(5),
                  backgroundColor:
                    date.is_selected || selectedDate === date.available_dates
                      ? theme.primary
                      : theme.background,
                  borderColor: theme.grayText,
                  borderWidth: scale(1),
                  padding: scale(5),
                  borderRadius: scale(5),
                  marginRight: scale(5),
                }}
              >
                <Text>{date.available_dates}</Text>
              </TouchableOpacity>
            )
          )}
        </View>
      </ScrollView>
    </View>
  );

  const Times = () => (
    <View>
      <Text>Available Times: </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: scale(5),
          }}
        >
          {getInterview.data?.data?.interview?.dates_related_data?.times.map(
            (time: any, index: number) => (
              <TouchableOpacity
                onPress={() => chooseTime(time.available_time)}
                key={index}
                disabled={time.is_selected}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginVertical: scale(5),
                  backgroundColor:
                    time.is_selected || selectedTime === time.available_time
                      ? theme.primary
                      : theme.background,
                  borderColor: theme.grayText,
                  borderWidth: scale(1),
                  padding: scale(5),
                  borderRadius: scale(5),
                  marginRight: scale(5),
                }}
              >
                <Text>{time.available_time}</Text>
              </TouchableOpacity>
            )
          )}
        </View>
      </ScrollView>
    </View>
  );

  return (
    <>
      {getInterview.isLoading ? (
        <Loading />
      ) : (
        <View
          style={{
            flex: 1,
            backgroundColor: theme.background,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.32,
            shadowRadius: 5.46,
            marginTop: scale(15),
            elevation: 9,
            borderColor: theme.grayText,
            borderRadius: scale(10),

            // paddingHorizontal: 20,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              marginVertical: scale(10),
            }}
          >
            Interview Details
          </Text>

          <View
            style={{
              paddingHorizontal: 20,
              backgroundColor: theme.primary,
              borderRadius: scale(10),
              paddingVertical: scale(8),
              borderColor: theme.grayText,
              borderWidth: scale(1),
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontWeight: "bold",
                color: theme.secondary,
              }}
            >
              Invitation to interview for the role of{" "}
              {getInterview.data?.data?.interview?.job?.job_title} at{" "}
              {getInterview.data?.data?.interview?.job?.org_name}{" "}
            </Text>
          </View>
          <ScrollView
            style={{
              paddingHorizontal: 20,
              paddingVertical: 10,
            }}
          >
            <View>
              <Bullet
                title="Job Title"
                content={getInterview.data?.data?.interview?.job.job_title}
              />
              <Bullet
                title="Salary"
                content={`N ${getInterview.data?.data?.interview?.job.salary}`}
              />
              <Bullet
                title="Company"
                content={getInterview.data?.data?.interview?.job.org_name}
              />
              <Bullet
                title="Job Type"
                content={getInterview.data?.data?.interview?.job.job_type}
              />
              <Bullet
                title="Country"
                content={`N ${getInterview.data?.data?.interview?.job.country}`}
              />
              <Bullet
                title="Date Picked"
                content={
                  getInterview.data?.data?.date_picked !== null
                    ? getInterview.data?.data?.date_picked
                    : "Pick from available dates"
                }
              />
              <Bullet
                title="Time Picked"
                content={
                  getInterview.data?.data?.time_picked !== null
                    ? getInterview.data?.data?.time_picked
                    : "Pick from available times"
                }
              />

              <Bullet
                title="Description"
                content={
                  getInterview.data?.data?.interview?.job
                    .description_content !== null &&
                  getInterview.data?.data?.interview?.job.description_content
                }
              />

              <Seperator height={scale(10)} />
              <Dates />
              <Seperator height={scale(10)} />
              <Times />
              <Seperator height={scale(10)} />

              <Button
                disabled={
                  (getInterview.data?.data?.date_picked &&
                    getInterview.data?.data?.time_picked) ||
                  scheduleInterview.isLoading
                }
                onPress={handleScheduleInterview}
                textStyles={{
                  color: theme.secondary,
                }}
              >
                Schedule Interview
              </Button>
            </View>
          </ScrollView>
        </View>
      )}
    </>
  );
};

export default Interview_Details;

const styles = StyleSheet.create({});
