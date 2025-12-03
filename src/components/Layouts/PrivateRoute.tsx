import React from 'react';
import { Navigate } from 'react-router-dom';
import { isLoggedIn } from '../../utils/Request';

const PrivateRoute = ({ children, requiredAccess }) => {
  if (!isLoggedIn()) {
    return <Navigate to="/auth/login" replace />;
  }
  
  if (requiredAccess) {
    const role = localStorage.getItem('userRole');
    
    // Handle admin access requirement
    if (requiredAccess === 'admin') {
      if (role && role.toLowerCase() === 'admin') {
        return children;
      }
      return <Navigate to="/" replace />;
    }
    
    // Admin users have access to everything
    if (role && role.toLowerCase() === 'admin') {
      return children;
    }
    
    const accessStr = localStorage.getItem('userAccess');
    if (accessStr) {
      try {
        const access = JSON.parse(accessStr);
        if (access && access.includes(requiredAccess)) {
          return children;
        }
      } catch (e) {}
    }
    return <Navigate to="/" replace />;
  }
  
  return children;
};

export default PrivateRoute;
