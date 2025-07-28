import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NoBookingsSection = () => {
  return (
    <div className="bg-gradient-to-r from-pink-100 via-blue-100 to-purple-100 py-16 px-6 rounded-2xl shadow-lg mx-4 md:mx-20 my-10 text-center">
      <p className="text-red-600 text-3xl font-semibold mb-6">
        No bookings found.
      </p>

      <motion.div
        className="flex justify-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link to="/Alltrips">
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-8 py-3 text-lg font-medium rounded-full shadow-lg hover:shadow-xl transition duration-300 cursor-pointer"
          >
            Book A Tour Package
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
};

export default NoBookingsSection;
