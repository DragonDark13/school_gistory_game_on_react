import * as React from 'react';
import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import axios, {Axios} from "axios";
import axiosClient from "../../axios";
import {UserContext} from "../MyProviders/MyProviders";

export interface IAuthContextProps {
    isAuthenticated: boolean;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
    isLoading: boolean; // Додаємо стан для завантаження
}

export const AuthContext = createContext<IAuthContextProps | undefined>(undefined);

interface IAuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<IAuthProviderProps> = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const {setCurrentUser} = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true); // Додаємо стан для завантаження


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
                setCurrentUser(response.data.user_data);
            } else {
                alert('Login failed: ' + (response.data.message || 'Unknown error'));
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('Login failed: ' + (error.response?.data?.message || 'Network error'));
        }
    };


    const refreshAccessToken = async () => {
        const refreshToken = localStorage.getItem('refresh_token');
        try {
            const response = await axios.post('/refresh', {}, {
                headers: {
                    'Authorization': `Bearer ${refreshToken}`
                }
            });
            localStorage.setItem('token', response.data.access_token);
            return response.data.access_token;
        } catch (error) {
            console.error('Error refreshing token:', error);
            return null;
        }
    };


    const fetchUserData = async () => {
        const token = localStorage.getItem('token');

        if (!token) {
            setIsAuthenticated(false);
            setCurrentUser(null);
            setIsLoading(false);
            return;
        }

        try {
            const response = await axiosClient.get('/api/user', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                setCurrentUser(response.data.user_data);
                setIsAuthenticated(true);
            }
        } catch (error) {
            if (error.response && error.response.data.msg === 'Token has expired') {
                const newToken = await refreshAccessToken();
                if (newToken) {
                    const retryResponse = await axiosClient.get('/api/user', {
                        headers: {
                            'Authorization': `Bearer ${newToken}`
                        }
                    });

                    if (retryResponse.status === 200) {
                        setCurrentUser(retryResponse.data.user_data);
                        setIsAuthenticated(true);
                    }
                } else {
                    setIsAuthenticated(false);
                    setCurrentUser(null);
                }
            } else {
                console.error('Error fetching user data:', error);
                setIsAuthenticated(false);
                setCurrentUser(null);
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);
    // empty dependency array means this runs once on mount

    const logout = () => {
        // Реалізуйте функціонал для виходу, наприклад, викликаючи API для видалення токенів або сесії
        localStorage.removeItem('token');
        // При виході встановлюємо isAuthenticated в false
        setIsAuthenticated(false);
        setCurrentUser(null);
    };

    return (
        <AuthContext.Provider value={{isAuthenticated, login, logout, isLoading}}>
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
