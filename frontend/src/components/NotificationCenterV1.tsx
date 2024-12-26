'use client';

import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Notification } from '@/types/book';

const NotificationCenterV1: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // Connect to Socket.IO server
    const socket = io('http://localhost:5000');

    // Listen for notifications
    socket.on('notification', (notification: Notification) => {
      setNotifications(prev => [
        { ...notification, timestamp: new Date() }, 
        ...prev
      ]);

      // Auto-remove notification after 5 seconds
      setTimeout(() => {
        setNotifications(prev => prev.slice(0, -1));
      }, 5000);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map((notification, index) => (
        <div 
          key={index} 
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative animate-slide-in"
        >
          <span className="font-bold">New Book Added:</span> 
          {notification.data.title} by {notification.data.author}
          <button 
            onClick={() => setNotifications(prev => prev.filter((_, i) => i !== index))}
            className="absolute top-0 right-0 m-1 text-green-700"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
};

export default NotificationCenterV1;
