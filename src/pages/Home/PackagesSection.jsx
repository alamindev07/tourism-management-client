

// PackagesSection.jsx
import React from 'react';
import { useRandomPackages } from '../../services/packageService';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import { TbCoinTakaFilled } from 'react-icons/tb';

const PackagesSection = () => {
  const { data: packages = [], isLoading, isError } = useRandomPackages();

  if (isLoading)
    return <div className="text-center py-10 text-lg font-medium text-blue-600">Loading Packages...</div>;
  if (isError)
    return <div className="text-center py-10 text-red-500 font-semibold">Error loading packages.</div>;

  return (
    <section className="px-4 py-10 max-w-7xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-10 text-gradient bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-pink-500 to-purple-500">
        ✨ Featured Travel Packages
      </h2>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {packages.map((pkg, index) => (
          <motion.div
            key={pkg._id}
            className="bg-white dark:bg-gray-900 rounded-3xl shadow-md hover:shadow-2xl transition-transform duration-300 overflow-hidden border border-gray-100"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15 }}
            whileHover={{ scale: 1.03 }}
          >
            <figure className="h-52 w-full overflow-hidden">
              <img
                src={pkg.images?.[0] || 'https://via.placeholder.com/300x200'}
                alt={pkg.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </figure>

            <div className="p-5 space-y-4">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{pkg.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">{pkg.description?.slice(0, 100)}...</p>

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

              <div className="text-right">
                <button className="btn bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:from-indigo-600 hover:to-purple-500 mt-4 btn-sm rounded-full px-5 shadow-lg">
                  View Details
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default PackagesSection;
