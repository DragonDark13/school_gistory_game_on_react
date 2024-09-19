import * as React from 'react';
import {createContext, ReactNode, useCallback, useContext, useEffect, useRef, useState} from 'react';
import axiosClient from '../../axios';
import {UserContext} from '../MyProviders/MyProviders';
import {AxiosError} from 'axios';
import {IUser} from "../../types/types";

export interface IAuthContextProps {
    isAuthenticated: boolean;
    login: (userName: string, password: string) => Promise<void>;
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

interface AuthResponse {
    data: {
        tokens: {
            access_token: string;
            refresh_token: string;
        };
        user_data: IUser; // Replace 'any' with the actual type of user data
    };
}


export const AuthProvider: React.FC<IAuthProviderProps> = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const {setCurrentUser} = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);
    const [fetchUserDataIsComplited, setFetchUserDataIsComplited] = useState(false);


    // console.log("AuthProvider start");


    const refreshAccessToken = async () => {
        const refreshToken = localStorage.getItem('refresh_token');
        try {
            const response = await axiosClient.post('/refresh', {}, {
                headers: {'Authorization': `Bearer ${refreshToken}`}
            });
            const newAccessToken = response.data.token;
            localStorage.setItem('token', newAccessToken);
            return newAccessToken;
        } catch (error) {
            console.error('Error refreshing token:', error);
            return null;
        }
    };


    let isFetchingInProgress = false;


    const fetchUserData = useCallback(async () => {
        console.log('Fetching user data');
        if (fetchUserDataIsComplited) {
            console.log('Fetch already complited, skipping');
            return;
        }
        if (isFetchingInProgress) return;
        isFetchingInProgress = true;


        const token = localStorage.getItem('token');
        if (!token) {
            setIsAuthenticated(false);
            setCurrentUser(null);
            setIsLoading(false)
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
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                if (error.response?.status === 401) {
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
                    console.error('Error fetching user data:', error);
                    setIsAuthenticated(false);
                    setCurrentUser(null);
                }
            } else {
                console.error('Unknown error', error);
            }
        } finally {
            setIsLoading(false);
            isFetchingInProgress = false;
            setFetchUserDataIsComplited(true);

        }
    }, [refreshAccessToken, fetchUserDataIsComplited]);

    useEffect(() => {
        console.log('Fetching user data from useEffect');

        fetchUserData();
    }, []);

    const handleError = (error: AxiosError | Error | unknown, fallbackMessage: string) => {
        if (error instanceof AxiosError) {
            console.error(fallbackMessage, error.response?.data.message || error.message);
            alert(fallbackMessage + ': ' + (error.response?.data.message || 'Network error'));
        } else {
            console.error(fallbackMessage, error);
            alert(fallbackMessage + ': Unknown error');
        }
    };

    const storeTokens = (accessToken: string, refreshToken: string) => {
        localStorage.setItem('token', accessToken);
        localStorage.setItem('refresh_token', refreshToken);
    };

    const handleUserAuthentication = (response: AuthResponse) => {
        const {tokens, user_data} = response.data;

        if (!tokens || !user_data) {
            console.error('Invalid authentication response:', response);
            alert('Authentication failed: Invalid response from server.');
            return;
        }

        storeTokens(tokens.access_token, tokens.refresh_token);
        setIsAuthenticated(true);
        setCurrentUser(user_data);
    };

    const login = async (userName: string, password: string) => {
        setIsLoading(true);
        try {
            const response = await axiosClient.post('/login', {user_name: userName, password}, {
                headers: {'Content-Type': 'application/json'}
            });

            if (response.status === 200 && response.data.success) {
                handleUserAuthentication(response)
            } else {
                alert('Login failed: ' + (response.data.message || 'Unknown error'));
            }
        } catch (error) {
            handleError(error, 'Login error');
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
                handleUserAuthentication(response)
            } else {
                setIsAuthenticated(false);
                alert('Registration failed: ' + (response.data.message || 'Unknown error'));
            }
        } catch (error) {
            setIsAuthenticated(false);
            handleError(error, 'Registration error');

        } finally {
            setIsLoading(false);
        }
    };


    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refresh_token');
        setIsAuthenticated(false);
        setCurrentUser(null);
    };

    const updateProfile = async (user_name: string, email: string, country: string) => {
        setIsLoading(true);
        try {
            const response = await axiosClient.post('/update-profile', {user_name, email, country}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.status === 200) {
                await fetchUserData();
                alert('Profile updated successfully.');
            } else {
                alert('Failed to update profile: ' + (response.data.message || 'Unknown error'));
            }
        } catch (error) {
            handleError(error, 'Failed to update profile');

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
            handleError(error, 'Delete profile error');

        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthContext.Provider
            value={{isAuthenticated, login, register, logout, isLoading, updateProfile, deleteProfile}}
        >
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
