import { Pressable, StyleSheet, View } from "react-native";
import React, { useContext, useState } from "react";
import themeContext from "../../config/theme/themeContext";
import { ScrollView } from "react-native";
import { Text } from "../../components/ui";
import { scale } from "react-native-size-matters";
import SearchBar from "../../components/ui/Search/SearchBar";
import Filter from "../../components/ui/filter/FIlter";
import { Seperator } from "../../components/ui/_helpers";
import ApiContext from "../../providers/context/api";
import { getJobsFnc } from "../../providers/call-service/jobs";
import Loading from "../../components/ui/_helpers/Loading";
import JobsCardContainer from "../../components/app/Jobs/containers/JobsCardContainer";
import { HeaderContext } from "../../providers/context/header";
import { useFocusEffect } from "@react-navigation/native";

const Home = ({ navigation, jobs, searchState }: any) => {
  const theme = useContext(themeContext);

  const { showHeaderTextHandler } = React.useContext(HeaderContext);

  useFocusEffect(
    React.useCallback(() => {
      showHeaderTextHandler("Available Jobs");
    }, [])
  );

  return (
    <View
      style={{
        backgroundColor: theme.background,
        flex: 1,
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            paddingTop: scale(10),
            paddingBottom: scale(50),
            marginHorizontal: scale(10),
          }}
        >
          <JobsCardContainer cardData={jobs} navigation={navigation} />
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
