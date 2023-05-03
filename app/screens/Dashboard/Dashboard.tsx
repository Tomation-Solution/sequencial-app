import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { HeaderContext } from "../../providers/header";
import { navData } from "./dashboardData";
import NavButton from "../../components/app/Dashboard/NavButton";
import { ScrollView } from "react-native-gesture-handler";
import { Seperator } from "../../components/ui/_helpers";
import themeContext from "../../config/theme/themeContext";
import { scale } from "react-native-size-matters";
import SearchBar from "../../components/ui/Search/SearchBar";
import data from "./MOCK_DATA.json";
import JobDetailsCard from "../../components/app/Jobs/JobDetails/JobDetailsCard";
import JobsCardContainer from "../../components/app/Jobs/containers/JobsCardContainer";

const Dashboard = ({ navigation }: any) => {
  const { showHeaderTextHandler } = React.useContext(HeaderContext);
  const theme = useContext(themeContext);

  const [cardData, setCardData] = useState(data);

  const [activeId, setActiveId] = useState("001");

  const changeActiveId = (id: string) => {
    setActiveId(() => id);
  };

  const currentActive = navData.filter((item: any) => item.id === activeId);

  useEffect(() => {
    showHeaderTextHandler("Dashboard");
  }, []);
  return (
    <View
      style={{
        backgroundColor: theme.background,
        flex: 1,
      }}
    >
      <Seperator height={17} />
      <View>
        <ScrollView
          style={{
            paddingLeft: scale(5),
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {navData.map((item: any) => (
            <NavButton
              activeId={activeId}
              changeActiveId={changeActiveId}
              id={item.id}
              title={item.title}
              key={item.id}
            />
          ))}
        </ScrollView>
      </View>

      <Seperator height={17} />

      <SearchBar />

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
          {currentActive[0]?.title}
        </Text>
      </View>

      <ScrollView>
        <View
          style={{
            flex: 1,
            paddingHorizontal: scale(15),

            marginBottom: scale(65),
          }}
        >
          <JobsCardContainer cardData={data} navigation={navigation} />
        </View>
      </ScrollView>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({});
