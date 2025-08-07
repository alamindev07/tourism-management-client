import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const token = localStorage.getItem('access_token');

  if (loading) return <div className="text-center p-20">Loading...</div>;

  if (!user || !token) return <Navigate to="/login" state={{ from: location }} replace />;

  return children;
};

export default PrivateRoute;
