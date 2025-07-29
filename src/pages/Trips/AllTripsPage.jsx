
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaClock } from "react-icons/fa";
import { TbCoinTakaFilled } from "react-icons/tb";
import { useState } from "react";

const AllTripsPage = () => {
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { data: packages = [], isLoading, isError } = useQuery({
    queryKey: ["allPackages"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/packages");
      return res.data;
    },
  });

  const totalPages = Math.ceil(packages.length / itemsPerPage);
  const paginatedPackages = packages.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (isLoading)
    return <div className="text-center py-10 text-lg font-medium text-blue-600">Loading Packages...</div>;
  if (isError)
    return <div className="text-center py-10 text-red-500 font-semibold">Error loading packages.</div>;

  return (
    <section className="px-4 py-10 max-w-7xl mx-auto bg-gray-50 dark:bg-gray-900 min-h-screen">
      <h2 className="text-4xl font-bold text-center mb-10 bg-gradient-to-r from-indigo-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
        ✨ All Travel Packages
      </h2>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {paginatedPackages.map((pkg, index) => (
          <motion.div
            key={pkg._id}
            className="bg-white dark:bg-gray-800 rounded-3xl shadow-md hover:shadow-2xl transition-transform duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 flex flex-col"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15 }}
            whileHover={{ scale: 1.03 }}
          >
            <figure className="h-52 w-full overflow-hidden">
              <img
                src={pkg.images?.[0] || "https://via.placeholder.com/300x200"}
                alt={pkg.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </figure>

            <div className="p-5 space-y-4 flex flex-col flex-grow bg-gradient-to-r from-pink-100 via-blue-100 to-purple-100">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{pkg.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm flex-grow">
                {pkg.description?.slice(0, 100)}...
              </p>

              <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1">
                  <FaMapMarkerAlt className="text-rose-500" /> {pkg.location}
                </span>
                <span className="flex items-center gap-1">
                  <FaClock className="text-indigo-500" /> {pkg.duration}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                  <TbCoinTakaFilled className="text-lg" /> {pkg.price}
                </span>
                <span className="badge badge-info badge-outline px-3">{pkg.category}</span>
              </div>

              <div className="text-right mt-auto">
                <Link
                  to={`/packages/${pkg._id}`}
                  className="inline-block bg-gradient-to-r from-purple-500 to-indigo-600 text-white
                    hover:from-indigo-600 hover:to-purple-500 mt-4 btn-sm rounded-full px-5 py-2 shadow-lg
                    transition-colors duration-300"
                >
                  View Details
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-12 px-4 py-3 bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
        <p className="text-sm text-gray-700 dark:text-gray-300">
          Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{" "}
          <span className="font-medium">{Math.min(currentPage * itemsPerPage, packages.length)}</span> of{" "}
          <span className="font-medium">{packages.length}</span>
        </p>

        <div className="flex items-center space-x-1">
          <button
            className="px-3 py-1 rounded border text-sm disabled:opacity-50"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &lt;
          </button>
          {[...Array(Math.min(3, totalPages))].map((_, i) => (
            <button
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
              className={`px-3 py-1 rounded border text-sm ${
                currentPage === i + 1 ? "bg-blue-500 text-white" : ""
              }`}
            >
              {i + 1}
            </button>
          ))}
          {totalPages > 3 && (
            <>
              <span className="px-2">...</span>
              <button
                onClick={() => handlePageChange(totalPages)}
                className={`px-3 py-1 rounded border text-sm ${
                  currentPage === totalPages ? "bg-blue-500 text-white" : ""
                }`}
              >
                {totalPages}
              </button>
            </>
          )}
          <button
            className="px-3 py-1 rounded border text-sm disabled:opacity-50"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            &gt;
          </button>
        </div>
      </div>
    </section>
  );
};

export default AllTripsPage;

