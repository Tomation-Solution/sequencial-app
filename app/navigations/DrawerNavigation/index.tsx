import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";

import Dashboard from "../../screens/Dashboard/Dashboard";
import Jobs from "../../screens/Jobs/Jobs";
import CV_Management from "../../screens/CV_Management/CV_Management";
import Test_Management from "../../screens/Test_Management/Test_Management";
import Interview_Management from "../../screens/Interview_Management/Interview_Management";
import Documentation_Management from "../../screens/Documentation_Management/Documentation_Management";
import Calender from "../../screens/Calender/Calender";
import Settings from "../../screens/Settings/Settings";
import { COLORS } from "../../globals/constants/color";
import {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome5,
  AntDesign,
} from "@expo/vector-icons";
import { images } from "../../assets";
import { scale, verticalScale } from "react-native-size-matters";

import { useFonts, Ubuntu_400Regular } from "@expo-google-fonts/ubuntu";
import BottomNavigations from "../BottomNavgations";
import Header from "../../components/app/Header/Header";

const Drawer = createDrawerNavigator();
const CustomDrawerContent = (props: any) => {
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
        onPress={() => console.log("logout button pressed")}
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

  if (!fontsLoaded) {
    return null;
  }
  return (
    <>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          header: (props) => <Header {...props} />,
          drawerPosition: "right",
          drawerStyle: {
            backgroundColor: COLORS.secondary,
          },

          drawerLabelStyle: {
            color: "white",
          },

          drawerActiveBackgroundColor: COLORS.primary,
        }}
        initialRouteName="dashboard"
      >
        <Drawer.Screen
          options={{
            drawerLabel: "Dashboard",
            drawerLabelStyle: {
              color: "white",
              fontSize: scale(14),
              fontFamily: "Ubuntu_400Regular",
            },
            drawerIcon: () => (
              <MaterialIcons name="dashboard" size={24} color={"white"} />
            ),
          }}
          name="Dashboard"
          component={BottomNavigations}
        />
        <Drawer.Screen
          options={{
            drawerLabel: "Jobs",
            drawerLabelStyle: {
              color: "white",
              fontSize: scale(14),
              fontFamily: "Ubuntu_400Regular",
            },
            drawerIcon: () => (
              <MaterialIcons name="work" size={24} color={"white"} />
            ),
          }}
          name="Jobs"
          component={Jobs}
        />
        <Drawer.Screen
          options={{
            drawerLabel: "CV Management",
            drawerLabelStyle: {
              color: "white",
              fontSize: scale(14),
              fontFamily: "Ubuntu_400Regular",
            },
            drawerIcon: () => (
              <MaterialIcons name="description" size={24} color={"white"} />
            ),
          }}
          name="CV Management"
          component={CV_Management}
        />
        <Drawer.Screen
          options={{
            drawerLabel: "Test Management",
            drawerLabelStyle: {
              color: "white",
              fontSize: scale(14),
              fontFamily: "Ubuntu_400Regular",
            },
            drawerIcon: () => (
              <MaterialIcons name="description" size={24} color={"white"} />
            ),
          }}
          name="Test Managemet"
          component={Test_Management}
        />
        <Drawer.Screen
          options={{
            drawerLabel: "Interview Management",
            drawerLabelStyle: {
              color: "white",
              fontSize: scale(14),
              fontFamily: "Ubuntu_400Regular",
            },
            drawerIcon: () => (
              <MaterialIcons name="description" size={24} color={"white"} />
            ),
          }}
          name="Interview Management"
          component={Interview_Management}
        />
        <Drawer.Screen
          options={{
            drawerLabel: "Documentation Management",
            drawerLabelStyle: {
              color: "white",
              fontSize: scale(14),
              fontFamily: "Ubuntu_400Regular",
            },
            drawerIcon: () => (
              <MaterialCommunityIcons
                name="store-edit"
                size={24}
                color={"white"}
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
              color: "white",
              fontSize: scale(14),
              fontFamily: "Ubuntu_400Regular",
            },
            drawerIcon: () => (
              <FontAwesome5 name="calendar-day" size={24} color={"white"} />
            ),
          }}
          name="Calendar"
          component={Calender}
        />
        <Drawer.Screen
          options={{
            drawerLabel: "Settings",
            drawerLabelStyle: {
              color: "white",

              fontSize: scale(14),
              fontFamily: "Ubuntu_400Regular",
            },
            drawerIcon: () => (
              <Ionicons name="settings" size={24} color={"white"} />
            ),
          }}
          name="Settings"
          component={Settings}
        />
      </Drawer.Navigator>
    </>
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
