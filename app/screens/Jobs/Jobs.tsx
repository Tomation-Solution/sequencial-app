import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNotifications } from "../../hooks/useNotification";
import { Button } from "../../components/ui";

const Jobs = () => {
  const { showNotification } = useNotifications();

  const handleButtonPress = () => {
    showNotification({
      id: Date.now(),
      title: "New message",
      message: "You have a new message from John",
      action: "View",
    });
  };

  return (
    <View>
      <Text>Welcome to my app!</Text>
      <Button onPress={handleButtonPress}>Show</Button>
    </View>
  );
};

export default Jobs;

const styles = StyleSheet.create({});
