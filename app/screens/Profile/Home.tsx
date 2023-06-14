import { Alert, StyleSheet, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import themeContext from "../../config/theme/themeContext";
import { Seperator } from "../../components/ui/_helpers";
import { Button, ImageComponent, Text } from "../../components/ui";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import {
  clearAppData,
  retrieveAppData,
} from "../../helper_functions/storingAppData";
import { HeaderContext } from "../../providers/context/header";
import { useFocusEffect } from "@react-navigation/native";
import jwt_decode from "jwt-decode";

const CustomButton = ({
  onPress,
  title,
  icon,
}: {
  onPress: any;
  title: string;
  icon: any;
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
      }}
    >
      <View
        style={{
          marginRight: 10,
        }}
      >
        {icon}
      </View>
      <Text
        style={{
          fontSize: 16,
          fontWeight: "bold",
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const Home = ({ navigation }: { navigation: any }) => {
  const theme = useContext(themeContext);

  const { showHeaderTextHandler } = useContext(HeaderContext);

  const [user, set_user] = useState<any>();

  useFocusEffect(
    React.useCallback(() => {
      showHeaderTextHandler("Profile");
    }, [])
  );

  const logOut = () => {
    Alert.alert("Log Out", "Are you sure you want to log out your account?", [
      {
        text: "Stay",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "Log Out",
        onPress: () => {
          clearAppData();
        },
        style: "destructive",
      },
    ]);
  };

  async function decodeToken() {
    const token = await retrieveAppData("token");
    var decoded = jwt_decode(token?.access);

    set_user(decoded);
  }

  useEffect(() => {
    decodeToken();
    console.log(user);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.background,
      }}
    >
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            borderWidth: 2,
            borderColor: theme.primary,
            borderRadius: 50,
            width: 100,
            height: 100,
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
            marginTop: 20,
          }}
        >
          <ImageComponent
            imageUrl={
              user?.profile_image
                ? user?.profile_image
                : "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
            }
            style={{
              width: 90,
              height: 90,
              borderRadius: 50,
            }}
          />
        </View>

        <Seperator height={10} />
        <Text>
          Your profie,{" "}
          <Text
            style={{
              fontWeight: "bold",
              textDecorationColor: theme.primary,
              textDecorationLine: "underline",
              textDecorationStyle: "solid",
            }}
          >
            {user?.full_name}
          </Text>
        </Text>
        <Seperator height={10} />
        <Button onPress={() => navigation.navigate("CV Management")}>
          Edit Cv
        </Button>
      </View>

      <Seperator height={20} />
      <View>
        <CustomButton
          onPress={() => navigation.navigate("Settings")}
          title="Settings"
          icon={<Ionicons name="settings-outline" size={24} color="black" />}
        />
        <CustomButton
          onPress={() => navigation.navigate("Help")}
          title="Help"
          icon={<Ionicons name="help-circle-outline" size={24} color="black" />}
        />
        <CustomButton
          onPress={() => logOut()}
          title="Log Out"
          icon={
            <Ionicons
              name="md-arrow-forward-circle-outline"
              size={24}
              color="black"
            />
          }
        />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
