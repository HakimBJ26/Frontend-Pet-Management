import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const ProtectedRoute = ({ children, roles }) => {
  const { currentUser, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!currentUser) {
    return <Navigate to='/signin' />;
  }

  if (roles && !roles.includes(currentUser.role)) {
   
    return <Navigate to='/signin' />;
  }

  return children;
};

export default ProtectedRoute;
