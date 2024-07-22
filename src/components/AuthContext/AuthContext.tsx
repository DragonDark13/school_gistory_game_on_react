import * as React from 'react';
import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import axios from "axios";
import axiosClient from "../../axios";


export interface IAuthContextProps {
    isAuthenticated: boolean;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
}

export const AuthContext = createContext<IAuthContextProps | undefined>(undefined);

interface IAuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<IAuthProviderProps> = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    const login = async (email: string, password: string) => {
        // Реалізуйте функціонал для аутентифікації, наприклад, використовуючи API
        try {
            const response = await axiosClient.post('/login', {
                email,
                password
            }, {headers: {'Content-Type': 'application/json'}});
            if (response.data.success) {
                localStorage.setItem('token', response.data.token);
                setIsAuthenticated(true);
            } else {
                alert('Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
        }
        // При успішній аутентифікації встановлюємо isAuthenticated в true
        // setIsAuthenticated(true);
    };

    const logout = () => {
        // Реалізуйте функціонал для виходу, наприклад, викликаючи API для видалення токенів або сесії
        localStorage.removeItem('token');
        // При виході встановлюємо isAuthenticated в false
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{isAuthenticated, login, logout}}>
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
