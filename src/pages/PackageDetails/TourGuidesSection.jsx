

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Users } from "lucide-react";
import { FaUserCircle } from "react-icons/fa";

const TourGuidesSection = ({ guides }) => {
  // Filter only users with role "tourguide"
  const tourGuides = guides?.filter((guide) => guide.role === "tourguide") || [];

  return (
    <motion.section
      className="mt-12 px-4"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <Users className="w-7 h-7 text-gradient-blue" />
        <h2 className="text-3xl font-extrabold text-gradient-blue">
          Tour Guides
        </h2>
      </div>

      {/* Guides Grid */}
      {tourGuides.length > 0 ? (
        <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {tourGuides.map((guide) => (
            <motion.div
              key={guide._id}
              whileHover={{ scale: 1.05 }}
              className="transition-all"
            >
              <Link
                to={`/dashboard/guide/profile/${guide._id}`}
                className="group flex flex-col items-center text-center p-4 rounded-xl shadow-md hover:shadow-xl dark:border-gray-800 bg-white dark:bg-gray-900 transition-all duration-300 bg-gradient-to-r from-cyan-100 via-teal-50 to-teal-100"
                aria-label={`View profile of ${guide.displayName}`}
              >
                <img
                  src={
                    guide.photoURL ||
                    "https://via.placeholder.com/150?text=No+Photo"
                  }
                  alt={guide.displayName}
                  className="w-24 h-24 rounded-full object-cover mb-3 ring-2 ring-transparent group-hover:ring-primary transition-all duration-300"
                />
                <span className="font-semibold text-lg group-hover:text-primary transition">
                  {guide.name}
                </span>
                <span className="mt-5 inline-flex items-center gap-2 text-sm px-4 py-2 rounded-full border border-purple-500 text-purple-700 hover:bg-purple-600 hover:text-white transition-all duration-300 font-medium shadow-sm">
                  <FaUserCircle className="text-lg" />
                  View Profile
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="italic text-gray-500">
          No tour guides available at the moment.
        </p>
      )}
    </motion.section>
  );
};

export default TourGuidesSection;
