import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Link } from 'react-router-dom';
import { Plane, FolderPlus, NotebookText, Users2 } from 'lucide-react';

const cardVariants = {
  hover: {
    scale: 1.05,
    transition: { duration: 0.3 },
  },
};

const GuidePanel = () => {
  return (
    <div className="p-6 md:p-10 min-h-screen bg-gradient-to-br from-white via-emerald-50 to-green-100">
      <motion.div className="text-center mb-6">
        <TypeAnimation
          sequence={[
            'Welcome, Tour Guide! 🧭',
            2000,
            'Create unforgettable journeys ✈️',
            2000,
            'Manage your packages 📦',
            2000,
            'Inspire with stories 💬',
            2000,
          ]}
          wrapper="h2"
          speed={40}
          repeat={Infinity}
          className="text-3xl md:text-4xl font-bold text-emerald-800"
        />
        <p className="text-gray-600 mt-2 text-sm md:text-base">
          Your dashboard to manage tours, packages, and community content.
        </p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto mt-10">
        {/* Add Package */}
        <motion.div variants={cardVariants} whileHover="hover" className="bg-white rounded-2xl shadow-lg p-6 text-center border border-green-200">
          <FolderPlus className="text-green-600 mx-auto mb-4" size={42} />
          <h3 className="text-xl font-semibold mb-2">Add New Package</h3>
          <p className="text-gray-600 mb-4">Create and publish your unique travel packages.</p>
          <Link to="/dashboard/guide/add-package" className="inline-block px-4 py-2 rounded-full bg-green-600 text-white hover:bg-green-700 transition">
            Create Package
          </Link>
        </motion.div>

        {/* My Stories */}
        <motion.div variants={cardVariants} whileHover="hover" className="bg-white rounded-2xl shadow-lg p-6 text-center border border-purple-200">
          <NotebookText className="text-purple-600 mx-auto mb-4" size={42} />
          <h3 className="text-xl font-semibold mb-2">My Stories</h3>
          <p className="text-gray-600 mb-4">Share your guiding experiences with the world.</p>
          <Link to="/dashboard/manage-stories" className="inline-block px-4 py-2 rounded-full bg-purple-600 text-white hover:bg-purple-700 transition">
            Manage Stories
          </Link>
        </motion.div>

        {/* My Clients */}
        <motion.div variants={cardVariants} whileHover="hover" className="bg-white rounded-2xl shadow-lg p-6 text-center border border-blue-200">
          <Users2 className="text-blue-600 mx-auto mb-4" size={42} />
          <h3 className="text-xl font-semibold mb-2">My Tourists</h3>
          <p className="text-gray-600 mb-4">Check out the users who've booked your packages.</p>
          <Link to="/dashboard/clients" className="inline-block px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition">
            View Clients
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default GuidePanel;
