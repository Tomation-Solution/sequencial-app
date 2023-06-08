import { createStackNavigator } from "@react-navigation/stack";
import Details from "./Details";
import Home from "./Home";
import Apply from "./Apply";
import { useFocusEffect } from "@react-navigation/native";
import React, { useEffect } from "react";
import { HeaderContext } from "../../providers/context/header";

const Stack = createStackNavigator();

const Jobs = ({ navigation }: any) => {
  // const { showBackButtonHandler } = React.useContext(HeaderContext);

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener("focus", () => {
  //     navigation.navigate("Jobs", { screen: "Home" });
  //   });

  //   return unsubscribe;
  // }, [navigation]);

  // useFocusEffect(
  //   React.useCallback(() => {
  //     showBackButtonHandler();
  //   }, [])
  // );
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Home"
    >
      <Stack.Screen name="Home">{(props) => <Home {...props} />}</Stack.Screen>
      <Stack.Screen name="Apply">
        {(props) => <Apply {...props} />}
      </Stack.Screen>
      <Stack.Screen name="Details">
        {(props) => <Details {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default Jobs;

//   const styles = StyleSheet.create({});

//   const handleButtonPress = () => {
//     showNotification({
//       id: Date.now(),
//       title: "New message",
//       message: "You have a new message from John",
//       action: "View",
//     });
//   };

//   return (
//     <View>
//       <Text>Welcome to my app!</Text>
//       <Button onPress={handleButtonPress}>Show</Button>
//     </View>
//   );
// };
