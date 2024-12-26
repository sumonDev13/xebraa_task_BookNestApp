'use client';

import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Notification } from '@/types/book';

const NotificationC: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const socket = io('http://localhost:5000');

    socket.on('notification', (notification: Notification) => {
      setNotifications(prev => [notification, ...prev]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="fixed top-4 right-4 z-50">
      {notifications.map((notification, index) => (
        <div 
          key={index} 
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-2"
        >
          New Book Added: {notification.data.title}
        </div>
      ))}
    </div>
  );
}

export default NotificationC;
