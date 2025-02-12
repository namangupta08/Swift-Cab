
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UserProtectedWrapper = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        // Retrieve the token from localStorage
        const token = JSON.parse(localStorage.getItem('token'));

        // If no token is found, redirect to the login page
        if (!token) {
            navigate('/login');
        }
    }, [navigate]);

    // Render children only if the token exists
    return JSON.parse(localStorage.getItem('token')) ? <>{children}</> : null;
};

export default UserProtectedWrapper;
