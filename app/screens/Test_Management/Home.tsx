import { StyleSheet, View } from "react-native";
import React, { useContext, useState } from "react";
import ApiContext from "../../providers/context/api";
import { getTests } from "../../providers/call-service/test_mangement";
import Loading from "../../components/ui/_helpers/Loading";
import { FlatList } from "react-native-gesture-handler";
import { HeaderContext } from "../../providers/context/header";
import { useFocusEffect } from "@react-navigation/native";
import { Dropdown } from "react-native-element-dropdown";
import Drop from "../../components/ui/Input/Drop";
import { scale } from "react-native-size-matters";
import themeContext from "../../config/theme/themeContext";
import TestUpdateCard from "../../components/ui/UpdateCard/TestUpdateCard";
import { Text } from "../../components/ui";
import NotifcationCard from "../../components/app/Notification/NotifcationCard";

const OPTIONS = [
  { label: "Option 1", value: "option1" },
  { label: "Option 2", value: "option2" },
  { label: "Option 3", value: "option3" },
  { label: "Option 3", value: "option3" },
  { label: "Option 3", value: "option3" },
  { label: "Option 3", value: "option3" },
  { label: "Option 3", value: "option3" },
  { label: "Option 3", value: "option3" },
];

const Home = ({ navigation }: { navigation: any }) => {
  const { useApiQuery } = useContext(ApiContext);
  const theme = useContext(themeContext);

  const { data, isLoading, isSuccess, refetch } = useApiQuery({
    queryKey: "fetchTests",
    queryFunction: getTests,
  });

  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, [])
  );

  console.log(data);

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
              paddingHorizontal: scale(12),
            }}
          >
            <Text
              style={{
                fontSize: scale(20),
                fontWeight: "bold",
                color: theme.secondary,
                marginBottom: scale(10),
              }}
            >
              Test Line-Up
            </Text>
            {data.length > 0 ? (
              <FlatList
                data={data}
                renderItem={({ item }: any) => (
                  <NotifcationCard
                    onPress={() =>
                      navigation.navigate("Test_Questions", {
                        test_id: item.test_info.job_id,
                      })
                    }
                    company={item?.test_info.org_name}
                    image={item.image}
                    isOpened={item?.isOpened}
                    role={item?.job_title}
                    type="interview"
                    key={item.test_info.job_id}
                  />
                  // <TestUpdateCard
                  //   onPress={() =>
                  //     navigation.navigate("Test_Questions", {
                  //       test_id: item.test_info.job_id,
                  //     })
                  //   }
                  //   title={item.test_info.title}
                  //   org_name={item?.test_info.org_name}
                  //   job_title={item?.job_title}
                  //   // date="dfiohdsoihf"
                  //   updateType="Test"
                  //   // startTime="dhiofhdo"
                  //   // endTime="ifjoisdf"
                  //   // remainigTime="diofhihdsf"
                  // />
                )}
              />
            ) : (
              <Text
                style={{
                  fontSize: scale(16),
                  color: theme.secondary,
                  textAlign: "center",
                }}
              >
                No Tests Available
              </Text>
            )}
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
