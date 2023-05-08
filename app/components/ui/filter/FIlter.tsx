import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useContext } from "react";
import { scale } from "react-native-size-matters";
import { Ionicons } from "@expo/vector-icons";
import themeContext from "../../../config/theme/themeContext";
import { AppContext } from "../../../providers/context/app";

const { width } = Dimensions.get("screen");

const Selects = ({
  options,
  handleSelect,
  setModalVisible,
}: {
  options: any;
  handleSelect: (option: string) => void;
  setModalVisible: (visible: boolean) => void;
}) => {
  const theme = useContext(themeContext);

  return (
    <Pressable
      style={{
        flex: 1,
        padding: scale(20),
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
      onPress={() => setModalVisible(false)}
    >
      <ScrollView
        style={{
          width: width * 0.7,
          maxHeight: scale(200),
          backgroundColor: "white",
          paddingHorizontal: scale(10),
          paddingVertical: scale(20),
          borderRadius: scale(12),
        }}
      >
        {options.map((option: any, index: number) => (
          <Pressable
            key={index}
            onPress={() => handleSelect(option.value)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: scale(10),
              paddingHorizontal: scale(10),
              borderColor: theme.primary,
              borderWidth: scale(1),
              borderRadius: scale(12),
              marginVertical: scale(5),
            }}
          >
            <Text
              style={{
                color: "black",
                fontSize: scale(12),
                marginLeft: scale(8),
              }}
            >
              {option.label}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </Pressable>
  );
};

const Filter = ({
  onSelect,
  options,
}: {
  onSelect: (option: string) => void;
  options: any;
}) => {
  const theme = useContext(themeContext);
  const { setModalContent, setModalVisible } = useContext(AppContext);
  const [selectedOption, setSelectedOption] = React.useState<string | null>(
    null
  );

  const handleSelect = (option: string) => {
    onSelect(option);
    setSelectedOption(option);
    setModalVisible(false);
  };

  const handlePress = () => {
    setModalContent(
      <Selects
        options={options}
        handleSelect={(option: string) => handleSelect(option)}
        setModalVisible={setModalVisible}
      />
    );
    setModalVisible(true);
  };

  const handleClear = () => {
    setSelectedOption(null);
  };

  return (
    <View
      style={{
        alignItems: "flex-end",
        marginVertical: scale(10),
        position: "relative",
      }}
    >
      <Pressable
        onPress={handlePress}
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingVertical: scale(10),
          paddingHorizontal: scale(10),
          borderColor: theme.primary,
          borderWidth: scale(1),
          borderRadius: scale(12),
          width: width * 0.5,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Pressable onPress={handleClear}>
            <Ionicons
              name={selectedOption ? "trash-bin" : "briefcase"}
              size={scale(12)}
              color={theme.primary}
            />
          </Pressable>
          <Text
            style={{
              color: theme.primary,
              fontSize: scale(12),
              marginLeft: scale(8),
            }}
          >
            {selectedOption ? selectedOption : "Filter By"}
          </Text>
        </View>

        <Ionicons name="chevron-down" size={scale(12)} color={theme.primary} />
      </Pressable>
    </View>
  );
};

export default Filter;

const styles = StyleSheet.create({});
