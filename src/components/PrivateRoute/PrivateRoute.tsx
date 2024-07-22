import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import {AuthContext} from "../AuthContext/AuthContext";

interface PrivateRouteProps {
    element: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
    const authContext = useContext(AuthContext);

    if (!authContext) {
        return null; // або повернути компонент для завантаження, якщо контекст ще не завантажено
    }

    const { isAuthenticated } = authContext;

    return isAuthenticated ? element : <Navigate to="/" />;
};

export default PrivateRoute;
