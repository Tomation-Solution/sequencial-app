import { Pressable, StyleSheet, View } from "react-native";
import React, { useContext, useState } from "react";
import { HeaderContext } from "../../providers/context/header";
import themeContext from "../../config/theme/themeContext";
import { useFocusEffect } from "@react-navigation/native";
import { ScrollView } from "react-native";
import { Text } from "../../components/ui";
import { scale } from "react-native-size-matters";
import SearchBar from "../../components/ui/Search/SearchBar";
import { Ionicons } from "@expo/vector-icons";
import FIlter from "../../components/ui/filter/FIlter";
import { Seperator } from "../../components/ui/_helpers";

const OPTIONS = [
  { label: "Option 1", value: "option1" },
  { label: "Option 2", value: "option2" },
  { label: "Option 3", value: "option3" },
];

const Home = ({ props }: any) => {
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
    <ScrollView
      style={{
        backgroundColor: theme.background,
        paddingHorizontal: scale(10),
        flex: 1,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          paddingVertical: scale(10),
        }}
      >
        <NavButton name="Jobs" />
        <NavButton name="Interviews" />
      </View>

      <SearchBar outlineType="outline" />

      <Seperator height={10} />

      <FIlter onSelect={handleSelect} options={OPTIONS} />

      <View>
        <Text>lorem300</Text>
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({});
