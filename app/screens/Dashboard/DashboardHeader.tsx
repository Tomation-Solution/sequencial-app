import React from "react";
import { View, ScrollView } from "react-native";
import { NavButtonProps } from "../../../types";
import { scale } from "react-native-size-matters";
import NavButton from "../../components/app/Dashboard/NavButton";
import { Seperator } from "../../components/ui/_helpers";
import SearchBar from "../../components/ui/Search/SearchBar";

const DashBoardHeader = ({
  navData,
  activeId,
  changeActiveId,
}: {
  navData: NavButtonProps[];
  activeId: any;
  changeActiveId: any;
}) => {
  return (
    <View>
      <ScrollView
        style={{
          paddingLeft: scale(5),
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {navData.map((item) => (
          <NavButton
            activeId={activeId}
            changeActiveId={changeActiveId}
            id={item.id}
            title={item.title}
            _count={item._count}
            key={item.id}
          />
        ))}
      </ScrollView>

      <Seperator height={17} />

      <SearchBar />
    </View>
  );
};

export default DashBoardHeader;
