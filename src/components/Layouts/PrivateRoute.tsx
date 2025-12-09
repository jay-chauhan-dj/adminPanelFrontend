import React from 'react';
import { Navigate } from 'react-router-dom';
import { isLoggedIn } from '../../utils/Request';

interface PrivateRouteProps {
  children: React.ReactNode;
  requiredAccess?: string;
  menuTitles?: string[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, requiredAccess, menuTitles }) => {
  if (!isLoggedIn()) {
    return <Navigate to="/auth/login" replace />;
  }
  
  if (requiredAccess) {
    const role = localStorage.getItem('userRole');
    
    // Admin users have access to everything
    if (role && role.toLowerCase() === 'admin') {
      return <>{children}</>;
    }
    
    // Dashboard is always accessible
    if (requiredAccess === 'dashboard') {
      return <>{children}</>;
    }
    
    const accessStr = localStorage.getItem('userAccess');
    if (accessStr) {
      try {
        const userAccess = JSON.parse(accessStr);
        
        // Check if user has any of the menu titles associated with this route
        if (menuTitles && menuTitles.length > 0) {
          const hasMenuAccess = menuTitles.some(title => userAccess.includes(title));
          if (hasMenuAccess) {
            return <>{children}</>;
          }
        }
        
        // Fallback: check direct requiredAccess match
        if (userAccess.includes(requiredAccess)) {
          return <>{children}</>;
        }
      } catch (e) {}
    }
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

export default PrivateRoute;
