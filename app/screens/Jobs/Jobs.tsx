import { createStackNavigator } from "@react-navigation/stack";
import Details from "./Details";
import Home from "./Home";
import Apply from "./Apply";

const Stack = createStackNavigator();

const Jobs = ({ navigation }: any) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Home"
    >
      <Stack.Screen name="Home">{(props) => <Home {...props} />}</Stack.Screen>
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
