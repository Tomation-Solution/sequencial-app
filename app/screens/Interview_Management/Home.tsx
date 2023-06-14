import { StyleSheet, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import ApiContext from "../../providers/context/api";
import Loading from "../../components/ui/_helpers/Loading";
import { FlatList } from "react-native-gesture-handler";
import { HeaderContext } from "../../providers/context/header";
import { useFocusEffect } from "@react-navigation/native";
import { scale } from "react-native-size-matters";
import themeContext from "../../config/theme/themeContext";
import Drop from "../../components/ui/Input/Drop";
import InterviewUpdateCard from "../../components/ui/UpdateCard/InterviewUpdateCard";
import { getInterviews } from "../../providers/call-service/interview_mangement";
import jwt_decode from "jwt-decode";
import { retrieveAppData } from "../../helper_functions/storingAppData";
import { Seperator } from "../../components/ui/_helpers";
import { Text } from "../../components/ui";

const Home = ({ navigation }: { navigation: any }) => {
  const { useApiQuery } = useContext(ApiContext);
  const [user, set_user] = useState<any>();
  const { showHeaderTextHandler } = useContext(HeaderContext);
  const theme = useContext(themeContext);

  const { data, isLoading, isSuccess } = useApiQuery({
    queryKey: "fetchInterviews",
    queryFunction: getInterviews,
  });

  async function decodeToken() {
    const token = await retrieveAppData("token");
    var decoded = jwt_decode(token?.access);

    set_user(decoded);
  }

  useEffect(() => {
    decodeToken();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <View
          style={{
            flex: 1,
            backgroundColor: theme.background,
          }}
        >
          <Seperator height={scale(10)} />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: scale(10),

              backgroundColor: theme.primary,
              paddingVertical: scale(5),
              paddingHorizontal: scale(10),
              borderRadius: scale(10),
              width: "90%",
              alignSelf: "center",
              borderColor: theme.text,
              borderWidth: 1,
            }}
          >
            {/* <Drop />
            <Drop /> */}
            <Text
              style={{
                textAlign: "center",
              }}
            >
              Hi 👋 {user?.full_name} {user?.role} - Your newest interviews
            </Text>
          </View>
          <View
            style={{
              paddingHorizontal: scale(15),
            }}
          >
            {
              <FlatList
                data={data?.data}
                renderItem={({ item }: any) => (
                  <InterviewUpdateCard
                    user_name={user?.full_name}
                    date_picked={item.date_picked}
                    time_picked={item.time_picked}
                    // updateType="Interview"
                    // remainigTime="diofhihdsf"
                    job_title={item.interview.job_title}
                    company={item.interview.company}
                    onPress={() =>
                      navigation.navigate("Interview_details", {
                        interview_id: item.interview.interview_id,
                      })
                    }
                  />
                )}
              />
            }
          </View>
        </View>
      )}
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
