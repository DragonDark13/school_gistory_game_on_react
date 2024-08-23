import * as React from 'react';
import {createContext, ReactNode, useCallback, useContext, useEffect, useState} from "react";
import axiosClient from "../../axios";
import {UserContext} from "../MyProviders/MyProviders";
import {AxiosError} from "axios";

export interface IAuthContextProps {
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string, userName: string) => Promise<void>;
    logout: () => void;
    isLoading: boolean;
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

    useEffect(() => {
        fetchUserData();
    }, []);

    const login = async (userName: string, password: string) => {
        setIsLoading(true);
        try {
            const response = await axiosClient.post('/login', {user_name: userName, password}, {
                headers: {'Content-Type': 'application/json'}
            });

            if (response.status === 200 && response.data.success) {
                localStorage.setItem('token', response.data.tokens.access_token);
                localStorage.setItem('refresh_token', response.data.tokens.refresh_token);
                setIsAuthenticated(true);
                setCurrentUser(response.data.user_data);
            } else {
                alert('Login failed: ' + (response.data.message || 'Unknown error'));
            }
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                console.error('Login error:', error?.response?.data.message);
                alert('Login failed: ' + (error?.response?.data.message || 'Network error'));
            }
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (email: string, password: string, userName: string) => {
        setIsLoading(true);
        try {
            const response = await axiosClient.post('/register', {email, password, userName}, {
                headers: {'Content-Type': 'application/json'}
            });

            if (response.status === 201) {
                localStorage.setItem('token', response.data.tokens.access_token);
                localStorage.setItem('refresh_token', response.data.tokens.refresh_token);
                setIsAuthenticated(true);
                setCurrentUser(response.data.user_data);
            } else {
                setIsAuthenticated(false);

                alert('Registration failed: ' + (response.data.message || 'Unknown error'));
            }
        } catch (error) {
            setIsAuthenticated(false);

            if (error instanceof AxiosError) {
                console.error('Registration error:', error?.response?.data.message);
                alert('Registration failed: ' + (error?.response?.data.message || 'Network error'));
                throw new Error(error.response?.data.message || 'Registration failed');
            } else {
                console.error('An unexpected error occurred');
            }
        } finally {
            setIsLoading(false);
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
            const newAccessToken = response.data.tokens.access_token;
            localStorage.setItem('token', newAccessToken);
            return newAccessToken;
        } catch (error) {
            console.error('Error refreshing token:', error);
            return null;
        }
    };

    const fetchUserData = useCallback(async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                setIsAuthenticated(false);
                setCurrentUser(null);
                setIsLoading(false);
                return;
            }

            try {
                const response = await axiosClient.get('/api/user', {
                    headers: {'Authorization': `Bearer ${token}`}
                });

                if (response.status === 200) {
                    setCurrentUser(response.data.user_data);
                    setIsAuthenticated(true);
                }
            } catch (error) {
                if (error instanceof Error) {
                    if (error && error.message === 'Token has expired') {
                        const newToken = await refreshAccessToken();
                        if (newToken) {
                            try {
                                const retryResponse = await axiosClient.get('/api/user', {
                                    headers: {'Authorization': `Bearer ${newToken}`}
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
                        console.error('An unexpected error occurred');
                    }
                } else {
                    console.error('Error fetching user data:', error);
                    setIsAuthenticated(false);
                    setCurrentUser(null);
                }
            } finally {
                setIsLoading(false);
            }
        }
        ,
        []
    );

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refresh_token');
        setIsAuthenticated(false);
        setCurrentUser(null);
    };

    const updateProfile = async (user_name: string, email: string, country: string) => {
        setIsLoading(true);
        try {
            const response = await axiosClient.post('/update-profile', {
                user_name,
                email,
                country
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.status === 200) {
                fetchUserData();
                alert('Profile updated successfully.');
            } else {
                alert('Failed to update profile: ' + (response.data.message || 'Unknown error'));
            }
        } catch (error) {
            if (error instanceof Error) {
                alert('Failed to update profile: ' + (error.message || 'Network error'));
            } else {
                alert('Failed to update profile: Unknown error');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const deleteProfile = async () => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await axiosClient.delete('/delete-profile', {
                headers: {'Authorization': `Bearer ${token}`}
            });

            if (response.status === 200) {
                alert('Profile deleted successfully.');
                logout();
            } else {
                alert('Failed to delete profile: ' + (response.data.message || 'Unknown error'));
            }
        } catch (error) {
            if (error instanceof Error) {
                console.error('Delete profile error:', error);
                alert('Failed to delete profile: ' + (error?.message || 'Network error'));
            } else {
                console.error('Delete profile error:', error);

            }

        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthContext.Provider
            value={{isAuthenticated, login, register, logout, isLoading, updateProfile, deleteProfile}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
