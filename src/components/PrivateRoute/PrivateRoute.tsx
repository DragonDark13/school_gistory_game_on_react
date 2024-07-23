import React, {useContext} from 'react';
import {Navigate} from 'react-router-dom';
import {AuthContext} from "../AuthContext/AuthContext";
import Preloader from "../Preloader/Preloader";

interface PrivateRouteProps {
    element: React.ReactNode;
}

const PrivateRoute = ({ element }) => {
    const { isAuthenticated, isLoading } = useContext(AuthContext);

    console.log("isLoading-----",isLoading);
    console.log("isAuthenticated -----",isAuthenticated );

    if (isLoading) {
        return <Preloader />; // Показуємо компонент завантаження, поки дані не завантажені
    }

    return isAuthenticated ? element : <Navigate to="/" />;
};

export default PrivateRoute;
