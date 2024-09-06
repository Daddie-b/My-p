import React from 'react';
import { Navigate } from 'react-router-dom';

const parseJwt = (token) => {
  try {
    const decoded = JSON.parse(atob(token.split('.')[1]));
    return decoded;
  } catch (e) {
    return {};
  }
};

const ProtectedRoute = ({ element: Component, allowedRoles, ...rest }) => {
  const token = localStorage.getItem('token');
  const userRole = token ? parseJwt(token).role : null; // Function to parse JWT and get role

  return allowedRoles.includes(userRole) ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;
