export interface Notification {
    type: 'BOOK_ADDED' | 'BOOK_UPDATED' | 'BOOK_DELETED';
    title: string;
    message: string;
    timestamp: Date;
    data: unknown;
  }
  
  export interface Book {
    _id: string;
    title: string;
    author: string;
    genre: string;
    price: number;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface SocketContextType {
    socket: unknown | null;
    notifications: Notification[];
    isConnected: boolean;
    clearNotifications: () => void;
  }