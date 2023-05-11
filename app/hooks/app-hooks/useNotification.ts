import { useContext } from "react";
import { NotificationContext } from "../../providers/context/notification";

// Define the notification control hook
export const useNotifications = () => {
  const {
    notifications,
    addNotification,
    dismissNotification,
    handleNotificationAction,
  } = useContext(NotificationContext);

  const showNotification = (notification: {
    title: string;
    type: number;
    message: string;
    action?: string;
  }) => {
    addNotification(notification);
  };

  const hideNotification = (notification: any) => {
    dismissNotification(notification);
  };

  const handleNotification = (notification: any) => {
    handleNotificationAction(notification);
  };

  return {
    notifications,
    showNotification,
    hideNotification,
    handleNotification,
  };
};
