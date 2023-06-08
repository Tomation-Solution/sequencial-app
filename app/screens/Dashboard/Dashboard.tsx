import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useFocusEffect } from "@react-navigation/native";
import { HeaderContext } from "../../providers/context/header";
import AllJobs from "./AllJobs";
import { scale } from "react-native-size-matters";
import ApiContext from "../../providers/context/api";
import { getDashBoardSummary } from "../../providers/call-service/dashboard";
import NavButton from "../../components/app/Dashboard/NavButton";
import SearchBar from "../../components/ui/Search/SearchBar";
import { Seperator } from "../../components/ui/_helpers";
import themeContext from "../../config/theme/themeContext";
import JobsApplied from "./JobsApplied";
import JobsTestScheduled from "./JobsTestScheduled";

const Stack = createStackNavigator();

const Dashboard = ({ navigation }: { navigation: any }) => {
  const { useApiQuery } = useContext(ApiContext);
  const theme = useContext(themeContext);

  const [activeId, setActiveId] = useState("001");
  const [dashboardSummary, setDashboardSummary] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getDashBoardSummary();
      setDashboardSummary(response.data);
    };

    fetchData();
  }, []);

  const changeActiveId = (id: string) => {
    setActiveId(() => id);
    navigation.navigate(id);
  };

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
    {
      id: "007",
      title: "Interviews Scheduled",
      _count: dashboardSummary?.interview_scheduled ?? 0,
    },
    {
      id: "005",
      title: "Interviews Attended",
      _count: dashboardSummary?.interviews_attended ?? 0,
    },
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
      <Seperator height={15} />

      <View>
        <ScrollView
          style={{
            backgroundColor: "#ccc",
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
          </View>
        </ScrollView>

        <Seperator height={17} />

        <SearchBar />
      </View>
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
      </Stack.Navigator>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({});
