"use client";
import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { Socket as SocketType } from 'socket.io-client';
import { Notification, SocketContextType } from '../types/socket.types';
// @ts-ignore
import { io } from "socket.io-client";

const SocketContext = createContext<SocketContextType | undefined>(undefined);

interface SocketProviderProps {
  children: React.ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<typeof SocketType | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socketInstance = io(process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:5000/', {
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socketInstance.on('connect', () => {
      setIsConnected(true);
      console.log('Socket connected');
    });

    socketInstance.on('disconnect', () => {
      setIsConnected(false);
      console.log('Socket disconnected');
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socket) return;

    const handleNotification = (notification: Notification) => {
      setNotifications((prev) => [
        {
          ...notification,
          timestamp: new Date(notification.timestamp)
        },
        ...prev
      ].slice(0, 50));
    };

    socket.on('notification', handleNotification);

    return () => {
      socket.off('notification', handleNotification);
    };
  }, [socket]);

  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  return (
    <SocketContext.Provider value={{ socket, notifications, isConnected, clearNotifications }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = (): SocketContextType => {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};
