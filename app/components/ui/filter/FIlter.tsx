// import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
// import React, { useContext } from "react";
// import { scale } from "react-native-size-matters";
// import { Ionicons } from "@expo/vector-icons";
// import themeContext from "../../../config/theme/themeContext";

const { width } = Dimensions.get("screen");

// const FIlter = () => {
//   const theme = useContext(themeContext);

//   return (
//     <View
//       style={{
//         alignItems: "flex-end",
//         marginVertical: scale(10),
//         position: "relative",
//       }}
//     >
//       <View
//         style={{
//           flexDirection: "row",
//           justifyContent: "space-between",
//           alignItems: "center",
//           paddingVertical: scale(10),
//           paddingHorizontal: scale(10),
//           borderColor: theme.primary,
//           borderWidth: scale(1),
//           borderRadius: scale(12),
//           width: width * 0.5,
//         }}
//       >
//         <View
//           style={{
//             flexDirection: "row",
//             alignItems: "center",
//           }}
//         >
//           <Ionicons name="briefcase" size={scale(12)} color={theme.primary} />
//           <Text
//             style={{
//               color: theme.primary,
//               fontSize: scale(12),
//               marginLeft: scale(8),
//             }}
//           >
//             Filter by
//           </Text>
//         </View>

//         <Ionicons name="chevron-down" size={scale(12)} color={theme.primary} />
//       </View>
//       <View
//         style={{
//           position: "absolute",
//           right: 0,
//           top: scale(5),
//           backgroundColor: theme.primary,
//           height: width * 0.5,
//           width: width * 0.5,
//           zIndex: 100,

//           //   alignItems: "center",
//           //   justifyContent: "center",
//         }}
//       >
//         <Ionicons name="filter" size={scale(12)} color={theme.background} />
//       </View>
//     </View>
//   );
// };

// export default FIlter;

// const styles = StyleSheet.create({});

import React, { useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { scale } from "react-native-size-matters";

const Dropdown = ({ options, onSelect }: { options: any; onSelect: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<any>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectOption = (option: any) => {
    setSelectedOption(option);
    onSelect(option);
    toggleDropdown();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.dropdown}
        onPress={toggleDropdown}
        activeOpacity={0.8}
      >
        <Text style={styles.dropdownText}>
          {selectedOption ? selectedOption.label : "Select an option"}
        </Text>
        <Ionicons name={isOpen ? "chevron-up" : "chevron-down"} size={20} />
      </TouchableOpacity>
      {isOpen && (
        <ScrollView style={styles.optionsContainer}>
          {options.map((option: any) => (
            <TouchableOpacity
              style={styles.option}
              key={option.value}
              onPress={() => selectOption(option)}
              activeOpacity={0.8}
            >
              <Text style={styles.optionText}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: width * 0.5,
    alignSelf: "flex-end",
  },
  dropdown: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
  },
  dropdownText: {
    fontSize: 16,
    color: "#555",
  },
  optionsContainer: {
    // position: "absolute",
    top: 10,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#ccc",
    marginTop: 5,
    paddingHorizontal: 10,
    // elevation: 2,
    // zIndex: 100,
    height: scale(70),
  },
  option: {
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  optionText: {
    fontSize: 16,
    color: "#555",
  },
});

export default Dropdown;
