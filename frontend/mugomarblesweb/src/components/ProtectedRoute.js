import React from 'react';
import { Navigate } from 'react-router-dom';

// Helper function to decode JWT
const parseJwt = (token) => {
  try {
    const decoded = JSON.parse(atob(token.split('.')[1]));
    return decoded;
  } catch (e) {
    return {};
  }
};

// ProtectedRoute component
const ProtectedRoute = ({ element, allowedRoles }) => {
  const token = localStorage.getItem('token');
  const userRole = token ? parseJwt(token).role : null;

  // Check if the user role is allowed for this route
  return allowedRoles.includes(userRole) ? (
    element
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;
