import { Pressable, ScrollViewBase, StyleSheet, View } from "react-native";
import React, { useContext, useState } from "react";
import { HeaderContext } from "../../providers/context/header";
import themeContext from "../../config/theme/themeContext";
import { useFocusEffect } from "@react-navigation/native";
import { ScrollView } from "react-native";
import { Text } from "../../components/ui";
import { scale } from "react-native-size-matters";
import SearchBar from "../../components/ui/Search/SearchBar";
import { Ionicons } from "@expo/vector-icons";
import Filter from "../../components/ui/filter/FIlter";
import { Seperator } from "../../components/ui/_helpers";
import data from "./MOCK_DATA.json";
import JobDetailsCard from "../../components/app/Jobs/JobDetails/JobDetailsCard";

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

const Home = ({ navigation }: any) => {
  const { showBackButtonHandler } = React.useContext(HeaderContext);
  const theme = useContext(themeContext);

  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleSelect = (option: string) => {
    setSelectedOption(option);
  };

  const [activeNav, setActiveNav] = React.useState("jobs");

  useFocusEffect(
    React.useCallback(() => {
      showBackButtonHandler();
    }, [])
  );

  const NavButton = ({ name }: any) => {
    const active = activeNav === name.toLowerCase();

    return (
      <Pressable
        onPress={() => setActiveNav(name.toLowerCase())}
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
          <NavButton name="Jobs" />
          <NavButton name="Liked" />
        </View>

        <SearchBar outlineType="outline" />

        <Seperator height={7} />

        <Filter onSelect={handleSelect} options={OPTIONS} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            paddingTop: scale(10),
            paddingBottom: scale(50),
            marginHorizontal: scale(10),
          }}
        >
          {data.map((item: any) => (
            <JobDetailsCard
              key={item.id}
              jobTitle={item.jobTitle}
              companyName={item.companyName}
              canApplyFromPhone={item.canApplyFromPhone}
              isHiringMultiple={item.isHiringMultiple}
              jobType={item.jobType}
              image={item.image}
              location={item.location}
              navigation={navigation}
              salary={item.salary}
              whenPosted={item.whenPosted}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});