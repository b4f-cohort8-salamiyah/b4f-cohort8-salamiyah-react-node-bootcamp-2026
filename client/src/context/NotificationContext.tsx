import { createContext, ReactNode, useContext, useState } from "react";
import { AppNotification, NotificationTone } from "../types";

interface NotificationContextValue {
  notifications: AppNotification[];
  notify: (message: string, tone: NotificationTone) => void;
  dismissFront: () => void;
}

const NotificationContext = createContext<NotificationContextValue | null>(
  null,
);

let nextNotificationId = 1;

function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<AppNotification[]>([]);

  function notify(message: string, tone: NotificationTone) {
    const notification: AppNotification = {
      id: nextNotificationId,
      message,
      tone,
    };
    nextNotificationId += 1;

    setNotifications([...notifications, notification]);
  }

  function dismissFront() {
    setNotifications(
      notifications.filter((_notification, index) => index !== 0),
    );
  }

  return (
    <NotificationContext.Provider
      value={{ notifications, notify, dismissFront }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

function useNotify() {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error("useNotify must be used inside a NotificationProvider");
  }

  return context;
}

export { NotificationProvider, useNotify };
