


// src/pages/Dashboard/DashboardRedirect.jsx
import { Navigate } from 'react-router-dom';
import useRole from '../../hooks/useRole';

const DashboardRedirect = () => {
  const [role, loading] = useRole();

  if (loading) return <div className="text-center py-10">Redirecting...</div>;

  if (role === 'admin') return <Navigate to="/dashboard/admin" replace />;
  if (role === 'tourguide') return <Navigate to="/dashboard/guide" replace />;
  if (role === 'tourist') return <Navigate to="/dashboard/tourist" replace />;

  return <Navigate to="/unauthorized" replace />;
};

export default DashboardRedirect;
