import { Modal, ScrollView, StyleSheet, Text, View } from "react-native";
import React, {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useFocusEffect, useRoute } from "@react-navigation/native";
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
import Search from "./Search";
import { searchJobsFnc } from "../../providers/call-service/jobs";
import ApiContext from "../../providers/context/api";

const Stack = createStackNavigator();

const Dashboard = ({ navigation }: { navigation: any }) => {
  const { showLogoHandler } = React.useContext(HeaderContext);
  const { useApiQuery } = useContext(ApiContext);

  const theme = useContext(themeContext);
  const route = useRoute();

  const [activeId, setActiveId] = useState("001");
  const [activeId2, setActiveId2] = useState("");
  const [dashboardSummary, setDashboardSummary] = useState<any>(null);
  const [searchState, setSearchState] = useState<any>(false);
  const [job_title, setJob_title] = useState<any>(null);
  const [job_type, setJob_type] = useState<any>(null);

  const changeActiveId = (id: string) => {
    setActiveId(() => id);
    navigation.navigate(id);
  };
  const jobs_query = useApiQuery({
    queryKey: "searchJobs",
    queryFunction: () =>
      searchJobsFnc({
        job_title: job_title,
        job_type: job_type,
      }),
  });

  const _changeActiveId = (id: string, title: string) => {
    setJob_type(() => title);
    setActiveId2(() => id);
    jobs_query.refetch();
  };

  console.log("jobs_query", jobs_query);

  useFocusEffect(
    React.useCallback(() => {
      showLogoHandler();
    }, [])
  );
  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        const response = await getDashBoardSummary();
        setDashboardSummary(response.data);
      };

      fetchData();
    }, [])
  );

  const _navData = [
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

  const filterData = [
    {
      id: "001",
      title: "Remote",
      _count: "_",
    },
    {
      id: "002",
      title: "On Site",
      _count: "_",

      // _count: dashboardSummary?.jobs_applied_for ?? 0,
    },
    {
      id: "003",
      title: "Hybrid",
      _count: "_",

      // _count: dashboardSummary?.jobs_test_taken ?? 0,
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
  ];

  const navData = searchState ? filterData : _navData;

  const onFocusFnc = () => {
    navigation.navigate("search");
    setSearchState(true);
  };
  const onSearchFnc = () => {
    if (!job_title) return;
    jobs_query.refetch();
  };

  return (
    <View
      style={{
        backgroundColor: theme.background,
        flex: 1,
      }}
    >
      <Seperator height={10} />
      <SearchBar
        onFocusFnc={onFocusFnc}
        onSearchFnc={onSearchFnc}
        onChangeText={(text: string) => setJob_title(text)}
      />
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
                activeId={searchState ? activeId2 : activeId}
                changeActiveId={searchState ? _changeActiveId : changeActiveId}
                id={item.id}
                title={item.title}
                _count={item._count}
                key={item.id}
              />
            ))}

            {!searchState && (
              <NavButton
                activeId={activeId}
                changeActiveId={changeActiveId}
                id={"007"}
                title={"Interviews "}
                _count={dashboardSummary?.interview_scheduled ?? 0}
                key={"007"}
              />
            )}
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
            {(props) => <AllJobs {...props} setSearchState={setSearchState} />}
          </Stack.Screen>

          <Stack.Screen name="002">
            {(props) => (
              <JobsApplied {...props} setSearchState={setSearchState} />
            )}
          </Stack.Screen>

          <Stack.Screen name="004">
            {(props) => (
              <JobsTestScheduled {...props} setSearchState={setSearchState} />
            )}
          </Stack.Screen>

          <Stack.Screen name="003">
            {(props) => <Home {...props} setSearchState={setSearchState} />}
          </Stack.Screen>
          <Stack.Screen name="search">
            {(props) => (
              <Search
                {...props}
                searchData={jobs_query.data.data}
                isLoading={jobs_query.isLoading}
              />
            )}
          </Stack.Screen>
          {/* <Stack.Screen name="007">{(props) => <Home {...props} />}</Stack.Screen> */}
        </Stack.Navigator>
      </View>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({});
