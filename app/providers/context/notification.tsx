import React, { createContext, useState } from "react";
import { TouchableOpacity, Animated } from "react-native";
import { Text } from "../../components/ui";

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
        // position: "absolute",
      }}
    >
      <Text style={{ fontWeight: "bold" }}>{notification.title}</Text>
      <Text>{notification.message}</Text>
      {notification.action && (
        <TouchableOpacity onPress={() => onAction(notification)}>
          <Text style={{ color: "blue" }}>{notification.action}</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={() => slideOut()}>
        <Text style={{ color: "gray" }}>Dismiss</Text>
      </TouchableOpacity>
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
          key={notification.id}
          notification={notification}
          onDismiss={dismissNotification}
          onAction={handleNotificationAction}
        />
      ))}
      {children}
    </NotificationContext.Provider>
  );
};
