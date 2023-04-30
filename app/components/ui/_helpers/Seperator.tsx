import { StyleSheet, Text, View } from "react-native";
import React from "react";

type Props = {
  height?: number;
};

const Seperator: React.FC<Props> = ({ height }) => {
  return (
    <View
      style={{
        width: "100%",
        height: height ? height : 0,
      }}
    />
  );
};

export default Seperator;

const styles = StyleSheet.create({});
