import { createStackNavigator } from "@react-navigation/stack";
import Details from "./Details";
import Home from "./Home";
import Apply from "./Apply";
import { useFocusEffect } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { HeaderContext } from "../../providers/context/header";
import Job_Question from "./Job_Question";
import { Pressable, View } from "react-native";
import { scale } from "react-native-size-matters";
import themeContext from "../../config/theme/themeContext";
import { Text } from "../../components/ui";
import SearchBar from "../../components/ui/Search/SearchBar";
import Filter from "../../components/ui/filter/FIlter";
import {
  getJobsFnc,
  getLikedJobs,
  searchJobsFnc,
} from "../../providers/call-service/jobs";
import ApiContext from "../../providers/context/api";

const Stack = createStackNavigator();

const OPTIONS = [
  { label: "Remote", value: "remote" },
  { label: "Hybrid", value: "hybrid" },
  { label: "Onsite", value: "onsite" },
  { label: "Full Time", value: "full_time" },
  { label: "Part Time", value: "part_time" },
  { label: "Contract", value: "contract" },
  { label: "Internship", value: "internship" },
  { label: "Temporary", value: "temporary" },
  { label: "Volunteer", value: "volunteer" },
  { label: "Other", value: "other" },
];

const Jobs = ({ navigation }: any) => {
  const { useApiQuery } = useContext(ApiContext);
  const { showHeaderTextHandler } = React.useContext(HeaderContext);

  const theme = useContext(themeContext);
  const [activeNav, setActiveNav] = React.useState("jobs");
  const [searchState, setSearchState] = useState<string>("initial");
  const [job_title, setJob_title] = useState<any>(null);
  const [job_type, setJob_type] = useState<any>(null);
  const [showHeader, setShowHeader] = useState<boolean>(false);

  const search_jobs_query = useApiQuery({
    queryKey: "searchJobs",
    queryFunction: () =>
      searchJobsFnc({
        job_title: job_title,
        job_type: job_type,
      }),
  });

  const liked_jobs_query = useApiQuery({
    queryKey: "likedJobs",
    queryFunction: getLikedJobs,
  });

  const { data, error, isLoading, isSuccess } = useApiQuery({
    queryKey: "fetchAllJobs",
    queryFunction: getJobsFnc,
  });

  const handleSelect = (option: string) => {
    setJob_type(option);
    setActiveNav("jobs");
    search_jobs_query.refetch();
  };

  const fectJobsHandler = () => {
    showHeaderTextHandler("Available Jobs");
    search_jobs_query.refetch();
    setSearchState("initial");
  };

  const likedJobsHandler = () => {
    showHeaderTextHandler("Liked Jobs");
    liked_jobs_query.refetch();
    setSearchState("liked");
  };

  const onFocusFnc = () => {
    setSearchState("search");
  };
  const onSearchFnc = () => {
    if (!job_title) return;
    search_jobs_query.refetch();
  };

  useFocusEffect(
    React.useCallback(() => {
      setSearchState("initial");
      setActiveNav("jobs");
    }, [])
  );

  const whichJobDataToRender = () => {
    if (searchState === "initial") {
      return data?.data;
    } else if (searchState === "search") {
      return search_jobs_query.data?.data;
    } else if (searchState === "liked") {
      return liked_jobs_query.data?.data;
    }
  };

  const jobs = whichJobDataToRender();

  const NavButton = ({ name, handler }: any) => {
    const active = activeNav === name.toLowerCase();

    return (
      <Pressable
        onPress={() => {
          setActiveNav(name.toLowerCase());
          handler();
        }}
        style={{
          borderBottomColor: active ? theme.primary : theme.disabled,
          borderBottomWidth: active ? scale(2) : scale(0),
          flex: 1,
          marginHorizontal: scale(20),
          paddingVertical: scale(5),
        }}
      >
        <Text
          style={{
            color: active ? theme.primary : theme.text,
            fontSize: scale(16),
            fontWeight: active ? "bold" : "400",
            textAlign: "center",
          }}
        >
          {name}
        </Text>
      </Pressable>
    );
  };
  return (
    <View
      style={{
        backgroundColor: theme.background,
        flex: 1,
      }}
    >
      {showHeader && (
        <View
          style={{
            marginHorizontal: scale(10),
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              paddingVertical: scale(10),
              paddingHorizontal: scale(10),
            }}
          >
            <NavButton name="Jobs" handler={fectJobsHandler} />
            <NavButton name="Liked" handler={likedJobsHandler} />
          </View>

          <SearchBar
            onFocusFnc={onFocusFnc}
            onSearchFnc={onSearchFnc}
            onChangeText={(text: string) => setJob_title(text)}
            outlineType="outline"
          />

          {/* <Seperator height={7} /> */}

          <Filter onSelect={handleSelect} options={OPTIONS} />
        </View>
      )}
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Home"
      >
        <Stack.Screen name="Home">
          {(props) => (
            <Home
              {...props}
              searchState={searchState}
              setShowHeader={setShowHeader}
              jobs={
                searchState === "initial"
                  ? data?.data
                  : searchState === "search"
                  ? search_jobs_query.data?.data
                  : liked_jobs_query.data?.data
              }
              // jobs={data?.data}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Apply">
          {(props) => <Apply {...props} setShowHeader={setShowHeader} />}
        </Stack.Screen>
        <Stack.Screen name="Job_Details">
          {(props) => <Details {...props} setShowHeader={setShowHeader} />}
        </Stack.Screen>
        <Stack.Screen name="Job_Question">
          {(props) => <Job_Question {...props} setShowHeader={setShowHeader} />}
        </Stack.Screen>
      </Stack.Navigator>
    </View>
  );
};

export default Jobs;

//   const styles = StyleSheet.create({});

//   const handleButtonPress = () => {
//     showNotification({
//       id: Date.now(),
//       title: "New message",
//       message: "You have a new message from John",
//       action: "View",
//     });
//   };

//   return (
//     <View>
//       <Text>Welcome to my app!</Text>
//       <Button onPress={handleButtonPress}>Show</Button>
//     </View>
//   );
// };

// const { showBackButtonHandler } = React.useContext(HeaderContext);

// useEffect(() => {
//   const unsubscribe = navigation.addListener("focus", () => {
//     navigation.navigate("Jobs", { screen: "Home" });
//   });

//   return unsubscribe;
// }, [navigation]);

// );
