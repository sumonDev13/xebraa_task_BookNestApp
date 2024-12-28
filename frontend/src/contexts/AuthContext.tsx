"use client"
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface AuthContextType {
  email: string | null;
  token: string | null;
  setAuth: (email: string, token: string) => void;
  clearAuth: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [email, setEmail] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Initialize state from localStorage
    const storedEmail = localStorage.getItem('userEmail');
    const storedToken = localStorage.getItem('userToken');
    if (storedEmail && storedToken) {
      setEmail(storedEmail);
      setToken(storedToken);
    }
  }, []);

  const setAuth = (email: string, token: string) => {
    setEmail(email);
    setToken(token);
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userToken', token);
  };

  const clearAuth = () => {
    setEmail(null);
    setToken(null);
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userToken');
  };

  return (
    <AuthContext.Provider value={{ email, token, setAuth, clearAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
