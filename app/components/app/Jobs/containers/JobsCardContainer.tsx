import { StyleSheet, Text, View } from "react-native";
import React from "react";
import JobDetailsCard from "../JobDetails/JobDetailsCard";

type Props = {
  cardData: Array<any>;
  navigation: any;
};

const JobsCardContainer: React.FC<Props> = ({ cardData, navigation }) => {
  if (!cardData) return <></>;
  return (
    <>
      {cardData.map((item) => (
        <JobDetailsCard
          canApplyFromPhone={item.canApplyFromPhone}
          org_name={item.org_name}
          isHiringMultiple={item.isHiringMultiple}
          job_title={item.job_title}
          job_type={item.job_type}
          location={item.location}
          salary={item.salary}
          currency={item.currency}
          whenPosted={item.whenPosted}
          image={item.image}
          key={item.id}
          id={item.id}
          navigation={navigation}
          job_variant={item.job_variant}
        />
      ))}
    </>
  );
};

export default JobsCardContainer;

const styles = StyleSheet.create({});
