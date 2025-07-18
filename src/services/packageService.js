// src/services/packageService.js
// import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";

export const useRandomPackages = () => {
  const axiosSecure = useAxiosSecure();

  return useQuery({
    queryKey: ["randomPackages"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/api/packages/random");
      return data;
    },
  });
};
