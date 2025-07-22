import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const RoleMessage = ({ role }) => {
  return (
    <div className="mt-10 text-center">
      {role === 'tourist' && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-lg mx-auto bg-blue-50 border border-blue-200 rounded-2xl p-6 shadow-lg"
        >
          <h3 className="text-2xl font-semibold text-blue-800 mb-3">
            Want to Explore a Career in Tourism?
          </h3>
          <p className="text-blue-700 mb-4">
            Become a Tour Guide and start sharing your passion for travel with others.
          </p>
          <Link to="/dashboard/join-tour-guide">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-accent px-6 text-white text-lg rounded-full shadow-md"
            >
              Apply for Tour Guide
            </motion.button>
          </Link>
        </motion.div>
      )}

      {role === 'tourguide' && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md mx-auto bg-green-50 border border-green-200 rounded-2xl p-6 shadow-lg"
        >
          <h3 className="text-2xl font-semibold text-green-800 mb-2">
            You're a Verified Tour Guide! 🧭
          </h3>
          <p className="text-green-700">
            Thanks for helping others explore amazing destinations. Keep sharing your knowledge!
          </p>
        </motion.div>
      )}

      {role === 'admin' && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md mx-auto bg-indigo-50 border border-indigo-200 rounded-2xl p-6 shadow-lg"
        >
          <h3 className="text-2xl font-semibold text-indigo-800 mb-2">
            Admin Panel Access ⚙️
          </h3>
          <p className="text-indigo-700">
            You're logged in as admin. Manage users and system integrity from your dashboard.
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default RoleMessage;
