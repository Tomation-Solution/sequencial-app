import React, { useContext } from "react";
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerToggleButton,
  createDrawerNavigator,
} from "@react-navigation/drawer";

import CV_Management from "../../screens/CV_Management/CV_Management";
import Test_Management from "../../screens/Test_Management/Test_Management";
import Interview_Management from "../../screens/Interview_Management/Interview_Management";
import Documentation_Management from "../../screens/Documentation_Management/Documentation_Management";
import Calender from "../../screens/Calender/Calender";
import Settings from "../../screens/Settings/Settings";

import {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import { images } from "../../assets";
import { scale, verticalScale } from "react-native-size-matters";

import { useFonts, Ubuntu_400Regular } from "@expo-google-fonts/ubuntu";
import BottomNavigations from "../BottomNavgations";
import Header from "../../components/app/Header/Header";
import themeContext from "../../config/theme/themeContext";
import { clearAppData } from "../../helper_functions/storingAppData";

const Drawer = createDrawerNavigator();
const CustomDrawerContent = (props: any) => {
  const [mode, setMode] = React.useState<"light" | "dark">("light");

  const logOut = () => {
    clearAppData();
  };
  return (
    <View style={styles.drawerContainer}>
      <View style={styles.drawerHeader}>
        <Image
          source={images.logo}
          style={{
            width: scale(150),
            height: scale(50),
          }}
        />
      </View>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <TouchableOpacity
        // onPress={() => {
        //   setMode(mode === "light" ? "dark" : "light");
        //   EventRegister.emit("changeMode", mode);
        // }}

        onPress={() => logOut()}
        style={styles.logoutButton}
      >
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const DrawerNavigations = () => {
  const [fontsLoaded] = useFonts({
    Ubuntu_400Regular,
  });
  const theme = useContext(themeContext);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          header: (props) => <Header {...props} />,
          drawerPosition: "right",
          drawerType: "slide",
          headerLeft: () => null,
          headerRight: () => <DrawerToggleButton />,

          drawerStyle: {
            backgroundColor: theme.background,
          },

          drawerLabelStyle: {
            color: theme.text,
          },

          drawerActiveBackgroundColor: theme.primary,
        }}
        initialRouteName="Homescreen"
      >
        <Drawer.Screen
          options={{
            drawerLabel: "Dashboard",
            drawerLabelStyle: {
              color: theme.text,
              fontSize: scale(14),
              fontFamily: "Ubuntu_400Regular",
            },
            drawerIcon: () => (
              <MaterialIcons name="dashboard" size={24} color={theme.text} />
            ),
          }}
          name="Dashboard"
          component={BottomNavigations}
        />
        {/* <Drawer.Screen
          options={{
            drawerLabel: "Jobs",
            drawerLabelStyle: {
              color: theme.text,
              fontSize: scale(14),
              fontFamily: "Ubuntu_400Regular",
            },
            drawerIcon: () => (
              <MaterialIcons name="work" size={24} color={theme.text} />
            ),
          }}
          name="Jobs"
          component={Jobs}
        /> */}
        <Drawer.Screen
          options={{
            drawerLabel: "CV Management",
            drawerLabelStyle: {
              color: theme.text,
              fontSize: scale(14),
              fontFamily: "Ubuntu_400Regular",
            },
            drawerIcon: () => (
              <MaterialIcons name="description" size={24} color={theme.text} />
            ),
          }}
          name="CV Management"
          component={CV_Management}
        />
        <Drawer.Screen
          options={{
            drawerLabel: "Test Management",
            drawerLabelStyle: {
              color: theme.text,
              fontSize: scale(14),
              fontFamily: "Ubuntu_400Regular",
            },
            drawerIcon: () => (
              <MaterialIcons name="description" size={24} color={theme.text} />
            ),
          }}
          name="Test Managemet"
          component={Test_Management}
        />
        <Drawer.Screen
          options={{
            drawerLabel: "Interview Management",
            drawerLabelStyle: {
              color: theme.text,
              fontSize: scale(14),
              fontFamily: "Ubuntu_400Regular",
            },
            drawerIcon: () => (
              <MaterialIcons name="description" size={24} color={theme.text} />
            ),
          }}
          name="Interview Management"
          component={Interview_Management}
        />
        <Drawer.Screen
          options={{
            drawerLabel: "Documentation Management",
            drawerLabelStyle: {
              color: theme.text,
              fontSize: scale(14),
              fontFamily: "Ubuntu_400Regular",
            },
            drawerIcon: () => (
              <MaterialCommunityIcons
                name="store-edit"
                size={24}
                color={theme.text}
              />
            ),
          }}
          name="Documentation Management"
          component={Documentation_Management}
        />
        <Drawer.Screen
          options={{
            drawerLabel: "Calender",
            drawerLabelStyle: {
              color: theme.text,
              fontSize: scale(14),
              fontFamily: "Ubuntu_400Regular",
            },
            drawerIcon: () => (
              <FontAwesome5 name="calendar-day" size={24} color={theme.text} />
            ),
          }}
          name="Calendar"
          component={Calender}
        />
        <Drawer.Screen
          options={{
            drawerLabel: "Settings",
            drawerLabelStyle: {
              color: theme.text,

              fontSize: scale(14),
              fontFamily: "Ubuntu_400Regular",
            },
            drawerIcon: () => (
              <Ionicons name="settings" size={24} color={theme.text} />
            ),
          }}
          name="Settings"
          component={Settings}
        />
      </Drawer.Navigator>
    </View>
  );
};

export default DrawerNavigations;

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
  },
  drawerHeader: {
    height: scale(90),
    justifyContent: "flex-end",
    alignItems: "center",
  },
  drawerHeaderText: {
    fontSize: scale(24),
    fontWeight: "bold",
  },
  logoutButton: {
    backgroundColor: "red",
    paddingVertical: scale(8),
    paddingHorizontal: scale(16),
    marginHorizontal: verticalScale(10),
    marginVertical: scale(16),
    borderRadius: scale(4),
    alignItems: "center",
  },
  logoutText: {
    color: "white",
    fontSize: scale(14),
    fontWeight: "bold",
  },
});
