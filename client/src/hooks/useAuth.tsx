import React, { createContext, useContext, useEffect, useState } from 'react';
import { login, logout as apiLogout, register } from '../api/auth';
import { getStoredToken, clearToken } from '../api/client';
import type { User } from '../types';

type AuthContextValue = {
  user?: User;
  token?: string;
  isAuthLoading: boolean;
  loginWithCredentials: (email: string, password: string) => Promise<void>;
  registerWithCredentials: (userName: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | undefined>();
  const [token, setToken] = useState<string | undefined>();
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    const bootstrap = async () => {
      const stored = getStoredToken();
      const storedUser = localStorage.getItem('loolookr_user');
      if (stored) {
        setToken(stored);
      }
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch {
          localStorage.removeItem('loolookr_user');
        }
      }
      setIsAuthLoading(false);
    };
    void bootstrap();
  }, []);

  const loginWithCredentials = async (email: string, password: string) => {
    setIsAuthLoading(true);
    try {
      const res = await login(email, password);
      setToken(res.token);
      setUser(res.user);
      localStorage.setItem('loolookr_user', JSON.stringify(res.user));
    } finally {
      setIsAuthLoading(false);
    }
  };

  const registerWithCredentials = async (userName: string, email: string, password: string) => {
    setIsAuthLoading(true);
    try {
      const res = await register(userName, email, password);
      setToken(res.token);
      setUser(res.user);
      localStorage.setItem('loolookr_user', JSON.stringify(res.user));
    } finally {
      setIsAuthLoading(false);
    }
  };

  const logout = () => {
    apiLogout();
    setUser(undefined);
    setToken(undefined);
    localStorage.removeItem('loolookr_user');
  };

  const value: AuthContextValue = {
    user,
    token,
    isAuthLoading,
    loginWithCredentials,
    registerWithCredentials,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
};
