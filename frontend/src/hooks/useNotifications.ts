// src/hooks/useNotifications.ts
import { useEffect, useState } from 'react';

export interface Notification {
  id: string;
  message: string;
  date: string;
  read: boolean;
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newNotif: Notification = {
        id: Date.now().toString(),
        message: 'Nueva actualización en el sistema',
        date: new Date().toISOString(),
        read: false,
      };
      setNotifications(prev => [newNotif, ...prev]);
    }, 10000); // cada 10s

    return () => clearInterval(interval);
  }, []);

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return {
    notifications,
    unreadCount: notifications.filter(n => !n.read).length,
    markAllAsRead,
  };
}
