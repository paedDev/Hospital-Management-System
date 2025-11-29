import React from 'react';
import { useGlobalContext } from '../context/context';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user, loading } = useGlobalContext();

  if (loading) return <div>Loading...</div>;

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;