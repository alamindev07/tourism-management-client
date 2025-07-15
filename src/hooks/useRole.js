
// hooks/useRole.js
import { useEffect, useState } from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useRole = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [role, setRole] = useState(null);
  const [roleLoading, setRoleLoading] = useState(true);

  useEffect(() => {
    if (!loading && user?.email) {
      axiosSecure.get(`/api/users/${user.email}`)
        .then(res => {
          console.log("Fetched user role:", res.data?.role); // ✅ Log it
          setRole(res.data?.role);
        })
        .catch(err => {
          console.error("Error fetching user role:", err);
          setRole(null);
        })
        .finally(() => setRoleLoading(false));
    }
  }, [user, loading, axiosSecure]);

  return [role, roleLoading];
};

export default useRole;
