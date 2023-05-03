import { StyleSheet, Text, View } from "react-native";
import React from "react";
import JobNotifcationCard from "../JobDetails/JobNotifcationCard";

type Props = {
  cardData: Array<any>;
  navigation: any;
};

const JobInterviewContainer: React.FC<Props> = ({ cardData, navigation }) => {
  return (
    <>
      {cardData.map((item: any) => (
        <JobNotifcationCard
          company={item.company}
          image={item.image}
          isOpened={item.isOpened}
          role={item.role}
          type="interview"
          key={item.id}
          navigation={navigation}
        />
      ))}
    </>
  );
};

export default JobInterviewContainer;

const styles = StyleSheet.create({});
