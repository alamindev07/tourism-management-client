import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider";

const useRole = () => {
  const { user } = useContext(AuthContext);
  const [role, setRole] = useState(null);

  useEffect(() => {
    if (user?.email) {
      // Fetch user role from your backend or Firebase custom claims
      // Example: fetch(`api/role?email=${user.email}`)
      // For demo, let's mock roles:
      if (user.email === "admin@example.com") setRole("admin");
      else if (user.email === "guide@example.com") setRole("guide");
      else setRole("tourist");
    } else {
      setRole(null);
    }
  }, [user]);

  return role;
};

export default useRole;
