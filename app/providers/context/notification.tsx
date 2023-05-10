import React, { createContext, useContext, useState } from "react";
import { TouchableOpacity, Animated } from "react-native";
import { Text } from "../../components/ui";
import { View } from "react-native";
import { scale } from "react-native-size-matters";
import themeContext from "../../config/theme/themeContext";

// Create a notification context
export const NotificationContext = createContext<any>({
  notifications: "",
  addNotification: "",
  dismissNotification: "any",
  handleNotificationAction: "",
});

// Define a notification component
const Notification = ({
  notification,
  onDismiss,
  onAction,
}: {
  notification: any;
  onDismiss: any;
  onAction: any;
}) => {
  const [position] = useState(new Animated.Value(-100));
  const theme = useContext(themeContext);

  const slideIn = () => {
    Animated.timing(position, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const slideOut = () => {
    Animated.timing(position, {
      toValue: -100,
      duration: 500,
      useNativeDriver: true,
    }).start(() => onDismiss(notification));
  };

  slideIn();

  return (
    <Animated.View
      style={{
        transform: [{ translateY: position }],
        backgroundColor: "white",
        padding: 10,
        borderRadius: 5,
        margin: 5,
        right: 0,
        left: 0,
        top: 0,
        zIndex: 999,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 10,
        },
        position: "absolute",
      }}
    >
      <Text style={{ fontWeight: "bold" }}>{notification.title}</Text>
      <Text>{notification.message}</Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: scale(10),
        }}
      >
        {notification.action && (
          <TouchableOpacity
            style={{
              padding: 5,
              borderRadius: 5,
              borderWidth: 1,
              borderColor: theme.primary,
            }}
            onPress={() => onAction(notification)}
          >
            <Text style={{ color: theme.primary }}>{notification.action}</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => slideOut()}>
          <Text style={{ color: theme.text }}>Dismiss</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

// Define a notification provider component
export const NotificationProvider = ({ children }: any) => {
  const [notifications, setNotifications] = useState<any>([]);

  const dismissNotification = (notification: any) => {
    setNotifications((prevNotifications: any) =>
      prevNotifications.filter((n: any) => n.id !== notification.id)
    );
  };

  const handleNotificationAction = (notification: any) => {
    // Handle the notification action here
  };

  const addNotification = (notification: any) => {
    setNotifications((prevNotifications: any) => [
      ...prevNotifications,
      notification,
    ]);

    setTimeout(() => {
      dismissNotification(notification);
    }, 5000);
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        dismissNotification,
        handleNotificationAction,
      }}
    >
      {notifications.map((notification: any) => (
        <Notification
          key={Date() + notification}
          notification={notification}
          onDismiss={dismissNotification}
          onAction={handleNotificationAction}
        />
      ))}
      {children}
    </NotificationContext.Provider>
  );
};
