import React, {createContext, Dispatch, ReactNode, SetStateAction, useState} from "react";
import {createTheme, CssBaseline, PaletteMode, ThemeProvider} from "@mui/material";
import getDesignTokens from "../../themes/getDesignTokens";
import {HelmetProvider} from "react-helmet-async";
import {AuthProvider} from "../AuthContext/AuthContext";


export const ColorModeContext = React.createContext({
    toggleColorMode: () => {
    }
});


export interface IThemeContextProps {
    theme: 'light' | 'dark';
    setTheme: Dispatch<SetStateAction<'light' | 'dark'>>;
}

export const ThemeContext = createContext<IThemeContextProps>({
    theme: 'light',
    setTheme: () => null,
});

export interface ILanguageContextProps {
    language: 'uk' | 'en';
    setLanguage: Dispatch<SetStateAction<'uk' | 'en'>>;
}

export const LanguageContext = createContext<ILanguageContextProps>({
    language: 'uk',
    setLanguage: () => null,
});

export interface IUser {
    name: string;
    current_level: number
    user_name: string
    tests_completed_list: any[]
    country: any
    email: string
    // Додайте інші властивості користувача, які вам потрібні
}

export interface UserContextProps {
    currentUser: null | IUser;
    setCurrentUser: Dispatch<SetStateAction<null | object>>;
}

export const UserContext = createContext<UserContextProps>({
    currentUser: null,
    setCurrentUser: () => null,
});

interface MyProvidersProps {
    children: ReactNode;
}

function MyProviders({children}: MyProvidersProps) {
    const [currentUser, setCurrentUser] = useState<any>(null);
    // const [theme, setTheme] = useState<'light' | 'dark'>('light');
    const [language, setLanguage] = useState<'uk' | 'en'>('uk');

    const [mode, setMode] = React.useState<PaletteMode>('light');
    const colorMode = React.useMemo(
        () => ({
            // The dark mode switch would invoke this method
            toggleColorMode: () => {
                setMode((prevMode: PaletteMode) =>
                    prevMode === 'light' ? 'dark' : 'light',
                );
            },
        }),
        [],
    );

    const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);


    return (
        <HelmetProvider>
            <LanguageContext.Provider value={{language, setLanguage}}>
                <UserContext.Provider
                    value={{
                        currentUser,
                        setCurrentUser
                    }}
                >
                    <ColorModeContext.Provider value={colorMode}>
                        <ThemeProvider theme={theme}>
                            <AuthProvider>
                                <CssBaseline/>
                                {children}
                            </AuthProvider>
                        </ThemeProvider>
                    </ColorModeContext.Provider>
                </UserContext.Provider>
            </LanguageContext.Provider>
        </HelmetProvider>
    );
}

export default MyProviders