

import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
  const { user, loading } = useAuth();
  const [role, setRole] = useState(null);
  const [isRoleLoading, setIsRoleLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (!loading && user?.email) {
      

      axiosSecure.get(`api/users/${user.email}`)
        .then(res => {
          console.log("Fetched user role:", res.data?.role, "for", user.email);
          setRole(res.data?.role || "tourist");
        })
        .catch(err => {
          console.error("❌ Failed to fetch role", err);
          setRole("tourist");
        })
        .finally(() => {
          setIsRoleLoading(false);
        });
    }
  }, [user, loading, axiosSecure]);

  return [role, isRoleLoading];
};

export default useRole;
