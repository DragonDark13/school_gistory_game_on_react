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
        try {
            const response = await axiosClient.post('/login', {
                email,
                password
            }, {headers: {'Content-Type': 'application/json'}});

            if (response.status === 200 && response.data.success) {
                localStorage.setItem('token', response.data.token);
                setIsAuthenticated(true);
            } else {
                alert('Login failed: ' + (response.data.message || 'Unknown error'));
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('Login failed: ' + (error.response?.data?.message || 'Network error'));
        }
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
