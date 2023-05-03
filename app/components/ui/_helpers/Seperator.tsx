import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { scale } from "react-native-size-matters";

type Props = {
  height?: number;
  width?: number;
};

const Seperator: React.FC<Props> = ({ height, width }) => {
  return (
    <View
      style={{
        width: width ? scale(width) : 0,
        height: height ? scale(height) : 0,
      }}
    />
  );
};

export default Seperator;

const styles = StyleSheet.create({});
