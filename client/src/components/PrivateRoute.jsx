import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../store/cart';

const PrivateRoute = () => {

    const { isLoggedIn } = useAuth()

    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return isLoggedIn() ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute