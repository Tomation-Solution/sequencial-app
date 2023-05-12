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
  notification: {
    id: string;
    title: string;
    message: string;
    action: string;
    type: 0 | 1 | 2;
  };
  onDismiss: ({}) => void;
  onAction: ({}) => void;
}) => {
  const [position] = useState(new Animated.Value(-100));
  const theme = useContext(themeContext);

  const color = () => {
    switch (notification.type) {
      case 0:
        return theme.error;
      case 1:
        return theme.success;
      case 2:
        return theme.warning;
      default:
        return theme.primary;
    }
  };

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
        shadowOpacity: 0.51,
        shadowRadius: 13.16,
        elevation: 20,
        borderColor: color(),
        borderWidth: 1,
        flexDirection: "row",
        justifyContent: "flex-start",
        // alignItems: "center",
      }}
    >
      <View
        style={{
          flex: 1,
          marginRight: scale(10),
        }}
      >
        <Text
          style={{ fontWeight: "bold", fontSize: scale(11), color: color() }}
        >
          {notification.title}
        </Text>
        <Text
          style={{
            fontSize: scale(12),
            color: color(),
          }}
        >
          {notification.message}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: scale(10),
        }}
      >
        {notification.action ? (
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
        ) : (
          <View />
        )}
        <TouchableOpacity
          style={{
            padding: 5,
            borderRadius: 5,
            borderWidth: 1,
            borderColor: color(),
          }}
          onPress={() => slideOut()}
        >
          <Text style={{ color: color(), fontSize: scale(11) }}>Dismiss</Text>
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
          key={Math.random()}
          notification={notification}
          onDismiss={dismissNotification}
          onAction={handleNotificationAction}
        />
      ))}
      {children}
    </NotificationContext.Provider>
  );
};
