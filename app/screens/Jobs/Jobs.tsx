import { StyleSheet, Text, View } from "react-native";
import React from "react";
import JobDetailsCard from "../../components/ui/JobDetails/JobDetailsCard";

const Jobs = () => {
  return (
    <View>
      <Text>Jobs</Text>
      <View
        style={{
          marginTop: 20,
          padding: 10,
        }}
      >
        <JobDetailsCard
          canApplyFromPhone={true}
          companyName="Google Inc."
          jobType="Full Time"
          jobTitle="Software Engineer"
          isHiringMultiple={true}
          location="Bangalore, India"
          salary="97, 000/year"
          whenPosted="2 days ago"
        />
        <JobDetailsCard
          canApplyFromPhone={true}
          companyName="Google Inc."
          jobType="Full Time"
          jobTitle="Software Engineer"
          isHiringMultiple={true}
          location="Bangalore, India"
          salary="97, 000/year"
          whenPosted="2 days ago"
        />
        <JobDetailsCard
          canApplyFromPhone={true}
          companyName="Google Inc."
          jobType="Full Time"
          jobTitle="Software Engineer"
          isHiringMultiple={true}
          location="Bangalore, India"
          salary="97, 000/year"
          whenPosted="2 days ago"
        />
        <JobDetailsCard
          canApplyFromPhone={true}
          companyName="Google Inc."
          jobType="Full Time"
          jobTitle="Software Engineer"
          isHiringMultiple={true}
          location="Bangalore, India"
          salary="97, 000/year"
          whenPosted="2 days ago"
        />
      </View>
    </View>
  );
};

export default Jobs;

const styles = StyleSheet.create({});
