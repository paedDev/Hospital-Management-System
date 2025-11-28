import React from 'react';
import { useGlobalContext } from '../context/context';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useGlobalContext();
  if (!isAuthenticated) {
    return <Navigate to={'/login'} replace />;
  }
  return (
    children
  );
};

export default ProtectedRoute;