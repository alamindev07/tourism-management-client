


// src/routes/RoleBasedRoute.jsx
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';

const RoleBasedRoute = ({ allowedRoles, children }) => {
  const { user, loading } = useAuth();
  const [role, roleLoading] = useRole();
  const location = useLocation();

  if (loading || roleLoading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (!user || !allowedRoles.includes(role)) {
    console.warn("Unauthorized access:", { user: user?.email, role });
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  return children;
};

export default RoleBasedRoute;
