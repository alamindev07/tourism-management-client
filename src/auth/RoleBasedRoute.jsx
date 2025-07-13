

import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';

const RoleBasedRoute = ({ allowedRoles }) => {
  const { userRole } = useContext(AuthContext); // or your role hook

  if (!allowedRoles.includes(userRole)) {
    // Redirect to unauthorized page if role doesn't match
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default RoleBasedRoute;
