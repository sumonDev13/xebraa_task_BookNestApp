"use client"
import React, { useState } from 'react';
import { Bell, X, WifiOff } from 'lucide-react';
import { useSocket } from '../contexts/SocketContext';
import { Notification } from '../types/socket.types';
import { useAuth } from '@/contexts/AuthContext';


interface NotificationItemProps {
  notification: Notification;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ notification }) => {
  const {email} = useAuth();
  return (
  <div className="p-4 hover:bg-gray-50 transition-colors">
    <h4 className="font-medium text-gray-900">{notification.title} by {email}</h4>
    <p className="text-sm text-gray-500 mt-1">{notification.message}</p>
    <span className="text-xs text-gray-400 mt-2 block">
      {notification.timestamp.toLocaleString()}
    </span>
  </div>
);};

const NotificationCenter: React.FC = () => {
  const { notifications, isConnected, clearNotifications } = useSocket();
  const [isOpen, setIsOpen] = useState(false);

  const unreadCount = notifications.length;
  const {email} = useAuth();
    const generateUsername = (email: string) => {
      return email.split('@')[0];
    };
  
    const username = generateUsername(email as string);

  return (
    <div className="relative p-2 flex flex-1 justify-between items-center">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full hover:bg-gray-100 relative transition-colors"
        aria-label="Notifications"
      >
        <Bell className="h-6 w-6" />
        {!isConnected && (
          <WifiOff className="h-4 w-4 absolute -top-1 -right-1 text-red-500" />
        )}
        {isConnected && unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>
      <span className="text-xl h-6 ">{username}</span>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-semibold">Notifications</h3>
            <div className="flex gap-2">
              {notifications.length > 0 && (
                <button
                  onClick={clearNotifications}
                  className="text-sm text-gray-500 hover:text-gray-700"
                  aria-label="Clear all notifications"
                >
                  Clear all
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Close notifications"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="max-h-[calc(100vh-200px)] overflow-y-auto divide-y divide-gray-200">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                No notifications
              </div>
            ) : (
              notifications.map((notification, index) => (
                <NotificationItem 
                  key={`${notification.timestamp.getTime()}-${index}`}
                  notification={notification}
                />
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;