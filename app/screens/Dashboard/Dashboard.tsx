import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useFocusEffect } from "@react-navigation/native";
import { HeaderContext } from "../../providers/context/header";
import AllJobs from "./AllJobs";
import { scale } from "react-native-size-matters";
import { getDashBoardSummary } from "../../providers/call-service/dashboard";
import NavButton from "../../components/app/Dashboard/NavButton";
import SearchBar from "../../components/ui/Search/SearchBar";
import { Seperator } from "../../components/ui/_helpers";
import themeContext from "../../config/theme/themeContext";
import JobsApplied from "./JobsApplied";
import JobsTestScheduled from "./JobsTestScheduled";
import Home from "../Test_Management/Home";

const Stack = createStackNavigator();

const Dashboard = ({ navigation }: { navigation: any }) => {
  const { showLogoHandler } = React.useContext(HeaderContext);
  const theme = useContext(themeContext);

  const [activeId, setActiveId] = useState("001");
  const [dashboardSummary, setDashboardSummary] = useState<any>(null);

  const changeActiveId = (id: string) => {
    setActiveId(() => id);
    navigation.navigate(id);
  };

  useFocusEffect(
    React.useCallback(() => {
      showLogoHandler();
    }, [])
  );
  useFocusEffect(() => {
    const fetchData = async () => {
      const response = await getDashBoardSummary();
      setDashboardSummary(response.data);
    };

    fetchData();
  });

  const navData = [
    {
      id: "001",
      title: "All Jobs",
      _count: "_",
    },
    {
      id: "002",
      title: "Jobs Applied",
      _count: dashboardSummary?.jobs_applied_for ?? 0,
    },
    {
      id: "003",
      title: "Jobs Test Taken",
      _count: dashboardSummary?.jobs_test_taken ?? 0,
    },
    {
      id: "004",
      title: "Jobs Test Scheduled",
      _count: dashboardSummary?.jobs_test_scheduled ?? 0,
    },
    // {
    //   id: "007",
    //   title: "Interviews Scheduled",
    //   _count: dashboardSummary?.interview_scheduled ?? 0,
    // },
    // {
    //   id: "005",
    //   title: "Interviews Attended",
    //   _count: dashboardSummary?.interviews_attended ?? 0,
    // },
    {
      id: "006",
      title: "Job Offers",
      _count: dashboardSummary?.job_offers ?? 0,
    },
  ];

  return (
    <View
      style={{
        backgroundColor: theme.background,
        flex: 1,
      }}
    >
      <Seperator height={10} />
      <SearchBar />
      <Seperator height={10} />
      <View>
        <ScrollView
          style={{
            backgroundColor: theme.background,
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          <View
            style={{
              paddingLeft: scale(10),
              paddingRight: scale(20),
              flexDirection: "row",
              paddingVertical: scale(5),
            }}
          >
            {navData.map((item: any) => (
              <NavButton
                activeId={activeId}
                changeActiveId={changeActiveId}
                id={item.id}
                title={item.title}
                _count={item._count}
                key={item.id}
              />
            ))}

            <NavButton
              activeId={activeId}
              changeActiveId={changeActiveId}
              id={"007"}
              title={"Interviews "}
              _count={dashboardSummary?.interview_scheduled ?? 0}
              key={"007"}
            />
          </View>
        </ScrollView>

        {/* <Seperator height={17} /> */}
      </View>
      <View
        style={{
          flex: 1,
          borderColor: theme.primary,
          borderTopLeftRadius: scale(20),
          borderTopRightRadius: scale(20),
          borderWidth: 2,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.23,
          shadowRadius: 2.62,

          elevation: 4,
          overflow: "hidden",
        }}
      >
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName="001"
        >
          <Stack.Screen name="001">
            {(props) => <AllJobs {...props} />}
          </Stack.Screen>

          <Stack.Screen name="002">
            {(props) => <JobsApplied {...props} />}
          </Stack.Screen>

          <Stack.Screen name="004">
            {(props) => <JobsTestScheduled {...props} />}
          </Stack.Screen>

          <Stack.Screen name="003">
            {(props) => <Home {...props} />}
          </Stack.Screen>
          {/* <Stack.Screen name="007">{(props) => <Home {...props} />}</Stack.Screen> */}
        </Stack.Navigator>
      </View>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({});
