import * as React from 'react';
import {createContext, ReactNode, useContext, useState} from "react";

export interface IAuthContextProps {
    isAuthenticated: boolean;
    login: (username: string, password: string) => void;
    logout: () => void;
}

export const AuthContext = createContext<IAuthContextProps | undefined>(undefined);

interface IAuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (email: string, password: string) => {
    // Реалізуйте функціонал для аутентифікації, наприклад, використовуючи API

    // При успішній аутентифікації встановлюємо isAuthenticated в true
    setIsAuthenticated(true);
  };

  const logout = () => {
    // Реалізуйте функціонал для виходу, наприклад, викликаючи API для видалення токенів або сесії

    // При виході встановлюємо isAuthenticated в false
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
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
