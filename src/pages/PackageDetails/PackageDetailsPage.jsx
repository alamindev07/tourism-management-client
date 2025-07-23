import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const PackageDetailsPage = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: pkg, isLoading } = useQuery({
    queryKey: ["package", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/packages/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <div className="text-center py-20">Loading package...</div>;

  return (
    <div className="px-4 md:px-10 lg:px-20 py-14">
      <h2 className="text-4xl font-extrabold mb-4">{pkg.title}</h2>
      <img src={pkg.images?.[0]} alt={pkg.title} className="rounded-xl mb-6" />
      <p className="mb-4">{pkg.description}</p>
      <p className="font-semibold text-lg mb-2">Price: ${pkg.price}</p>
      <p className="font-semibold text-lg mb-2">Duration: {pkg.duration}</p>
      <p className="font-semibold text-lg mb-2">Location: {pkg.location}</p>
      
    </div>
  );
};

export default PackageDetailsPage;
