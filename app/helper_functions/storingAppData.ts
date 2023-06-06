import AsyncStorage from "@react-native-async-storage/async-storage";
import { EventRegister } from "react-native-event-listeners";

export const retrieveAppData = async (item: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(item);
    // console.log("Retrieved user details:", jsonValue);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error("An error occurred while retrieving user details:", e);
  }
};

export const storeAppData = async ({
  item,
  value,
}: {
  item: string;
  value: any;
}) => {
  try {
    await AsyncStorage.setItem(item, JSON.stringify(value));
  } catch (error) {
    console.log(error);
  }
};

export const removeAppData = async (item: string) => {
  try {
    await AsyncStorage.removeItem(item);
  } catch (error) {
    console.log(error);
  }
};

export const clearAppData = async () => {
  try {
    await AsyncStorage.clear();
    EventRegister.emit("logout");
  } catch (error) {
    console.log(error);
  }
};
