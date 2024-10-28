import React from 'react'
import { Navigate } from 'react-router-dom';

interface isAuthenticated {
    isAuthenticated: boolean;
    children: React.ReactNode;
}
const ProtectedRoutes: React.FC<isAuthenticated> = ({isAuthenticated, children}) => {
    if(!isAuthenticated) {
       return <Navigate to="/login"/>
    }
    return <>{children}</>
}

export default ProtectedRoutes