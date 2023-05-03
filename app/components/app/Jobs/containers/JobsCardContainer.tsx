import { StyleSheet, Text, View } from "react-native";
import React from "react";
import JobDetailsCard from "../JobDetails/JobDetailsCard";

type Props = {
  cardData: Array<any>;
  navigation: any;
};

const JobsCardContainer: React.FC<Props> = ({ cardData, navigation }) => {
  return (
    <>
      {cardData.map((item) => (
        <JobDetailsCard
          canApplyFromPhone={item.canApplyFromPhone}
          companyName={item.companyName}
          isHiringMultiple={item.isHiringMultiple}
          jobTitle={item.jobTitle}
          jobType={item.jobType}
          location={item.location}
          salary={item.salary}
          whenPosted={item.whenPosted}
          image={item.image}
          key={item.id}
          navigation={navigation}
        />
      ))}
    </>
  );
};

export default JobsCardContainer;

const styles = StyleSheet.create({});
