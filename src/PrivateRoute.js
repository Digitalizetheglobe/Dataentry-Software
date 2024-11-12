import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  // If the token exists, render the requested component, otherwise redirect to the sign-in page.
  return token ? children : <Navigate to="/sign-in" />;
};

export default PrivateRoute;
