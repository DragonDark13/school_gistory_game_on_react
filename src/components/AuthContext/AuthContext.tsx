import * as React from 'react';
import {createContext, ReactNode, useCallback, useContext, useEffect, useState} from "react";
import axiosClient from "../../axios";
import {UserContext} from "../MyProviders/MyProviders";

export interface IAuthContextProps {
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string, userName: string) => Promise<void>;
    logout: () => void;
    isLoading: boolean; // Додаємо стан для завантаження
    updateProfile: (user_name: string, email: string, country: string) => Promise<void>;
    deleteProfile: () => Promise<void>;
}

export const AuthContext = createContext<IAuthContextProps | undefined>(undefined);

interface IAuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<IAuthProviderProps> = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const {setCurrentUser} = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);
    const [isFetching, setIsFetching] = useState(false);
    const [isFetched, setIsFetched] = useState(false);

    useEffect(() => {
        if (!isFetched) {
            fetchUserData();
            setIsFetched(true);
        }
    }, [isFetched]);

    const login = async (email: string, password: string) => {
        try {
            const response = await axiosClient.post('/login', {email, password}, {
                headers: {'Content-Type': 'application/json'}
            });

            if (response.status === 200 && response.data.success) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('refresh_token', response.data.refresh_token);
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

    const register = async (email: string, password: string, userName: string) => {
        try {
            const response = await axiosClient.post('/register', {email, password, userName}, {
                headers: {'Content-Type': 'application/json'}
            });

            if (response.status === 201) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('refresh_token', response.data.refresh_token);
                setIsAuthenticated(true);
                setCurrentUser(response.data.user_data);
            } else {
                alert('Registration failed: ' + (response.data.message || 'Unknown error'));
            }
        } catch (error) {
            console.error('Registration error:', error);
            alert('Registration failed: ' + (error.response?.data?.message || 'Network error'));
        }
    };

    const refreshAccessToken = async () => {
        const refreshToken = localStorage.getItem('refresh_token');
        try {
            const response = await axiosClient.post('/refresh', {}, {
                headers: {
                    'Authorization': `Bearer ${refreshToken}`
                }
            });
            const newAccessToken = response.data.access_token;
            localStorage.setItem('token', newAccessToken);
            return newAccessToken;
        } catch (error) {
            console.error('Error refreshing token:', error);
            return null;
        }
    };

    const fetchUserData =  useCallback(async () => {
        if (isFetching) return;

        setIsFetching(true);
        const token = localStorage.getItem('token');

        if (!token) {
            setIsAuthenticated(false);
            setCurrentUser(null);
            setIsLoading(false);
            setIsFetching(false);
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
                    try {
                        const retryResponse = await axiosClient.get('/api/user', {
                            headers: {
                                'Authorization': `Bearer ${newToken}`
                            }
                        });

                        if (retryResponse.status === 200) {
                            setCurrentUser(retryResponse.data.user_data);
                            setIsAuthenticated(true);
                        }
                    } catch (retryError) {
                        console.error('Error fetching user data after token refresh:', retryError);
                        setIsAuthenticated(false);
                        setCurrentUser(null);
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
            setIsFetching(false);
        }
    }, []);

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refresh_token');
        setIsAuthenticated(false);
        setCurrentUser(null);
    };

    const updateProfile = async (user_name: string, email: string, country: string) => {
        try {
            const response = await axiosClient.post('/update-profile', {
                user_name,
                email,
                country,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.status === 200) {
                fetchUserData();  // Оновити дані користувача після успішного оновлення профілю
                alert('Profile updated successfully.');
            } else {
                alert('Failed to update profile: ' + (response.data.message || 'Unknown error'));
            }
        } catch (error) {
            console.error('Update profile error:', error);
            alert('Failed to update profile: ' + (error.response?.data?.message || 'Network error'));
        }
    };

    const deleteProfile = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axiosClient.delete('/delete-profile', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                alert('Profile deleted successfully.');
                logout(); // Вихід користувача після видалення профілю
            } else {
                alert('Failed to delete profile: ' + (response.data.message || 'Unknown error'));
            }
        } catch (error) {
            console.error('Delete profile error:', error);
            alert('Failed to delete profile: ' + (error.response?.data?.message || 'Network error'));
        }
    };

    return (
        <AuthContext.Provider value={{isAuthenticated, login, register, logout, isLoading, updateProfile, deleteProfile}}>
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
