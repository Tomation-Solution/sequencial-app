import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import { scale } from "react-native-size-matters";
import Text from "../Typography/Text";

const DropdownComponent = ({
  data,
  onChange,
  label,
  value,
}: {
  data: { label: string; value: string }[];
  onChange: (item: { label: string; value: string }) => void;
  label?: string;
  value?: string;
}) => {
  const [_value, setValue] = useState<any>(value);

  return (
    <View style={{ marginTop: scale(12) }}>
      {label && (
        <Text
          style={{
            fontSize: scale(13),
            marginBottom: scale(5),
          }}
        >
          {label}
        </Text>
      )}
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        //   search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Select item"
        searchPlaceholder="Search..."
        value={_value}
        onChange={onChange}
        // renderLeftIcon={() => (
        //   <AntDesign
        //     style={styles.icon}
        //     color="black"
        //     name="Safety"
        //     size={20}
        //   />
        // )}
      />
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
