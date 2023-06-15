import { StyleSheet, Text, View } from "react-native";
import React from "react";
import NotifcationCard from "../../Notification/NotifcationCard";

type Props = {
  cardData: Array<any>;
  navigation: any;
};

const JobTestContainer: React.FC<Props> = ({ cardData, navigation }) => {
  return (
    <>
      {cardData.map((item: any) => (
        <NotifcationCard
          company={item.job?.company_name}
          image={item.image}
          isOpened={item.isOpened}
          role={item.job.position}
          type="test"
          key={item.job.id}
          onPress={() =>
            navigation.navigate("Test Management", {
              screen: "Test_Questions",
              params: {
                test_id: item.job.id,
              },
            })
          }
        />
      ))}
    </>
  );
};

export default JobTestContainer;

const styles = StyleSheet.create({});
