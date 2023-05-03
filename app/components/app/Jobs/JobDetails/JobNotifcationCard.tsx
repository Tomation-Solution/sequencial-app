import { StyleSheet, Text, View } from "react-native";
import React from "react";

type Props = {
  isOpened: boolean;
  image: string;
  company: string;
  role: string;
  type: string;
};

const JobNotifcationCard: React.FC<Props> = ({
  isOpened,
  image,
  company,
  role,
  type,
}) => {
  return (
    <View>
      <Text>JobNotifcationCard</Text>
    </View>
  );
};

export default JobNotifcationCard;

const styles = StyleSheet.create({});
