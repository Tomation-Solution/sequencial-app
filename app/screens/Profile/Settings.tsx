import {
  Alert,
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { HeaderContext } from "../../providers/context/header";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import themeContext from "../../config/theme/themeContext";
import { Seperator } from "../../components/ui/_helpers";
import { Button, Input } from "../../components/ui";
import {
  change_password,
  delete_profile,
} from "../../providers/call-service/profile";
import ApiContext from "../../providers/context/api";
import { useNotifications } from "../../hooks/app-hooks/useNotification";

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
          padding: 5,
          borderRadius: 5,
          backgroundColor: "#ccc",
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

const Settings = ({ navigation }: { navigation: any }) => {
  const { useApiMutation } = useContext(ApiContext);
  const { showNotification } = useNotifications();

  const theme = useContext(themeContext);
  const { showHeaderTextHandler, showBackButtonHandler } =
    useContext(HeaderContext);
  const [showChangePassword, setShowChangePassword] = React.useState(false);

  const [password, setPassword] = useState("");

  const [animation] = useState(new Animated.Value(0));

  const { mutate, isLoading, isSuccess } = useApiMutation({
    mutationFunction: change_password,
  });

  const showDeleteModal = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account?",
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            delete_profile();
          },
          style: "destructive",
        },
      ]
    );
  };

  useEffect(() => {
    if (showChangePassword) {
      Animated.timing(animation, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animation, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [showChangePassword]);

  useEffect(() => {
    if (isSuccess) {
      setShowChangePassword(false);
      setPassword("");
    }
  });

  useFocusEffect(
    React.useCallback(() => {
      showHeaderTextHandler("Settings");
    }, [])
  );

  const animatedStyle = {
    opacity: animation,
    transform: [
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [50, 0],
        }),
      },
    ],
  };

  const handlePasswordChange = () => {
    if (!password) {
      showNotification({
        title: "Error",
        type: 0,
        message: "Please enter a password",
      });
      return;
    }

    if (password.length < 8) {
      showNotification({
        title: "Warning",
        type: 2,
        message: "Password must be at least 8 characters",
      });
      return;
    }
    const data = {
      password: password,
    };
    mutate(data);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.background,
      }}
    >
      <View
        style={{
          padding: 20,
        }}
      >
        <Seperator height={20} />
        <CustomButton
          title="Change Password"
          icon={
            <Ionicons name="key-outline" size={24} color={theme.secondary} />
          }
          onPress={() => setShowChangePassword(!showChangePassword)}
        />
        {showChangePassword && (
          <Animated.View
            style={[
              animatedStyle,
              {
                padding: 20,
                backgroundColor: theme.background,
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
                marginBottom: 20,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.23,
                shadowRadius: 2.62,

                elevation: 4,
              },
            ]}
          >
            <Input
              placeholder="New Password"
              secureTextEntry
              onChangeText={(text) => setPassword(text)}
            />
            <Seperator height={20} />
            <Button
              disabled={isLoading}
              styles={{
                backgroundColor: password ? theme.primary : theme.placeholder,
              }}
              onPress={handlePasswordChange}
            >
              {isLoading ? "Sending..." : "Change Password"}
            </Button>
          </Animated.View>
        )}

        <CustomButton
          title="Delete Account"
          icon={<Ionicons name="trash-bin-outline" size={24} color="red" />}
          onPress={() => showDeleteModal()}
        />
      </View>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({});
