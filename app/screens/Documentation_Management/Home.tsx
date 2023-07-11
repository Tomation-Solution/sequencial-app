import { FlatList, StyleSheet, View } from "react-native";
import React, { useContext } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { HeaderContext } from "../../providers/context/header";
import { Text } from "../../components/ui";
import NotifcationCard from "../../components/app/Notification/NotifcationCard";
import ApiContext from "../../providers/context/api";
import { getDocsFnc } from "../../providers/call-service/documentation";
import { scale } from "react-native-size-matters";
import themeContext from "../../config/theme/themeContext";

const Home = ({ navigation }: { navigation: any }) => {
  const { showHeaderTextHandler } = React.useContext(HeaderContext);
  const { useApiQuery } = useContext(ApiContext);

  const theme = useContext(themeContext);

  const { data, isLoading, isSuccess, refetch } = useApiQuery({
    queryKey: "fetchDocs",
    queryFunction: getDocsFnc,
  });

  if (data) {
    console.log("datas: ", data);
  }

  useFocusEffect(
    React.useCallback(() => {
      showHeaderTextHandler("Documentation Management");
      //   refetch();
    }, [])
  );
  return (
    <View
      style={{
        paddingHorizontal: scale(18),
        paddingTop: scale(20),
        backgroundColor: theme.background,
        flex: 1,
      }}
    >
      {data?.data.length > 0 ? (
        <FlatList
          data={data?.data}
          renderItem={({ item }: any) => (
            <NotifcationCard
              onPress={() =>
                navigation.navigate("Details", {
                  doc_obj: item,
                })
              }
              company={item?.company?.name}
              image={item.image}
              isOpened={item?.accept_application}
              role={item?.company?.job_title}
              type="offer"
              key={item?.id}
            />
          )}
        />
      ) : (
        <Text>No Data</Text>
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
