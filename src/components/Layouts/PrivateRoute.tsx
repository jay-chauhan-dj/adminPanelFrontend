import React from 'react';
import { Navigate } from 'react-router-dom';
import { isLoggedIn } from '../../utils/Request';

interface PrivateRouteProps {
  children: React.ReactNode;
  requiredAccess?: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, requiredAccess }) => {
  if (!isLoggedIn()) {
    return <Navigate to="/auth/login" replace />;
  }
  
  if (requiredAccess) {
    const role = localStorage.getItem('userRole');
    if (role && role.toLowerCase() === 'admin') {
      return <>{children}</>;
    }
    
    const accessStr = localStorage.getItem('userAccess');
    if (accessStr) {
      try {
        const access = JSON.parse(accessStr);
        if (access && access.includes(requiredAccess)) {
          return <>{children}</>;
        }
      } catch (e) {}
    }
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

export default PrivateRoute;
