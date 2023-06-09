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

const Home = ({ navigation }: { navigation: any }) => {
  const { useApiQuery } = useContext(ApiContext);
  const [user, set_user] = useState<any>();
  const { showHeaderTextHandler } = useContext(HeaderContext);
  const theme = useContext(themeContext);

  const { data, isLoading, isSuccess } = useApiQuery({
    queryKey: "fetchInterviews",
    queryFunction: getInterviews,
  });

  var token: any = retrieveAppData("token");

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
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Drop />

            <Drop />
          </View>
          <View
            style={{
              paddingHorizontal: scale(15),
            }}
          >
            {
              <FlatList
                data={data.data}
                renderItem={({ item }: any) => (
                  <InterviewUpdateCard
                    user_name={user?.full_name}
                    date_picked="dfiohdsoihf"
                    updateType="Interview"
                    time_picked="dhiofhdo"
                    remainigTime="diofhihdsf"
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
