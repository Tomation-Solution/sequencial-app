import { StyleSheet, Text, View } from "react-native";
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
  const { showHeaderTextHandler } = useContext(HeaderContext);
  const theme = useContext(themeContext);

  const [dropVal, setDropVal] = useState(null);

  const { data, isLoading, isSuccess } = useApiQuery({
    queryKey: "fetchTests",
    queryFunction: getTests,
  });

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
              padding: scale(15),
            }}
          >
            {
              <FlatList
                data={data}
                renderItem={({ item }: any) => (
                  <TestUpdateCard
                    notification={item.test_info.title}
                    date="dfiohdsoihf"
                    updateType="Test"
                    startTime="dhiofhdo"
                    endTime="ifjoisdf"
                    // remainigTime="diofhihdsf"
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
