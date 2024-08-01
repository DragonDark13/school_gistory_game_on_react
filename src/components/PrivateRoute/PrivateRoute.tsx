import React, {useContext} from 'react';
import {Navigate} from 'react-router-dom';
import {AuthContext} from "../AuthContext/AuthContext";
import Preloader from "../Preloader/Preloader";

interface IPrivateRouteProps {
    element: React.ReactNode;
}

const PrivateRoute = ({element}:IPrivateRouteProps) => {
    const authContext = useContext(AuthContext);

    // Перевірка, що контекст визначений
    if (authContext === undefined) {
        throw new Error('AuthContext must be used within an AuthProvider');
    }

    const { isAuthenticated, isLoading } = authContext;

    console.log("isLoading-----", isLoading);
    console.log("isAuthenticated -----", isAuthenticated);

    if (isLoading) {
        return <Preloader/>; // Показуємо компонент завантаження, поки дані не завантажені
    }

    return isAuthenticated ? element : <Navigate to="/"/>;
};

export default PrivateRoute;
