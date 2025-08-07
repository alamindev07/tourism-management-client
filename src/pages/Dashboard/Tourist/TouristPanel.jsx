// src/pages/Dashboard/Tourist/TouristPanel.jsx
import { motion } from 'framer-motion';
import { NotebookPen, FolderKanban, PlaneTakeoff, Compass, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';
import CustomHelmet from '../../../components/shared/CustomHelmet';

const cardVariants = {
  hover: {
    scale: 1.05,
    transition: { duration: 0.3 },
  },
};

const TouristPanel = () => {
  return (
    <div className="p-6 md:p-10 min-h-screen bg-gradient-to-br from-white via-sky-50 to-blue-100">
    
           <CustomHelmet title="Tourist Pannel - TourWise App" />
    
      {/* Typing Header */}
      <motion.div
        className="text-center mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <TypeAnimation
          sequence={[
            'Welcome, Adventurer! 🌍',
            2000,
            'Explore your bookings ✈️',
            2000,
            'Share your travel stories 📖',
            2000,
            'Manage your journey with style 🧭',
            2000,
          ]}
          wrapper="h2"
          speed={40}
          repeat={Infinity}
          className="text-3xl md:text-4xl font-bold text-blue-800"
        />
        <p className="text-gray-600 mt-2 text-sm md:text-base">
          This is your space to manage your travel life on our platform.
        </p>
      </motion.div>

      {/* Quick Stats (optional simulated) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 max-w-5xl mx-auto">
        <div className="bg-white rounded-xl shadow-md p-4 text-center border-t-4 border-blue-500">
          <p className="text-2xl font-bold text-blue-600">12</p>
          <p className="text-sm text-gray-600">Total Bookings</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-4 text-center border-t-4 border-purple-500">
          <p className="text-2xl font-bold text-purple-600">5</p>
          <p className="text-sm text-gray-600">Stories Shared</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-4 text-center border-t-4 border-emerald-500">
          <p className="text-2xl font-bold text-emerald-600">3</p>
          <p className="text-sm text-gray-600">Trips Completed</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-4 text-center border-t-4 border-yellow-500">
          <p className="text-2xl font-bold text-yellow-600">⭐ 4.8</p>
          <p className="text-sm text-gray-600">Avg. Experience Rating</p>
        </div>
      </div>

      {/* Action Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
        {/* My Bookings */}
        <motion.div
          variants={cardVariants}
          whileHover="hover"
          className="bg-white rounded-2xl shadow-lg p-6 text-center border border-blue-200"
        >
          <PlaneTakeoff className="text-blue-600 mx-auto mb-4" size={42} />
          <h3 className="text-xl font-semibold mb-2 text-indigo-500">My Bookings</h3>
          <p className="text-gray-600 mb-4">View and manage your upcoming or past trips.</p>
          <Link
            to="/dashboard/bookings"
            className="inline-block px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            View Bookings
          </Link>
        </motion.div>

        {/* Add Story */}
        <motion.div
          variants={cardVariants}
          whileHover="hover"
          className="bg-white rounded-2xl shadow-lg p-6 text-center border border-purple-200"
        >
          <NotebookPen className="text-purple-600 mx-auto mb-4" size={42} />
          <h3 className="text-xl font-semibold mb-2 text-indigo-500">Add a Story</h3>
          <p className="text-gray-600 mb-4">Share your travel tales and inspire others.</p>
          <Link
            to="/dashboard/stories/add"
            className="inline-block px-4 py-2 rounded-full bg-purple-600 text-white hover:bg-purple-700 transition"
          >
            Share Now
          </Link>
        </motion.div>

        {/* Manage Stories */}
        <motion.div
          variants={cardVariants}
          whileHover="hover"
          className="bg-white rounded-2xl shadow-lg p-6 text-center border border-emerald-200"
        >
          <FolderKanban className="text-emerald-600 mx-auto mb-4" size={42} />
          <h3 className="text-xl font-semibold mb-2 text-indigo-500">Manage Stories</h3>
          <p className="text-gray-600 mb-4">Edit or delete your shared stories anytime.</p>
          <Link
            to="/dashboard/manage-stories"
            className="inline-block px-4 py-2 rounded-full bg-emerald-600 text-white hover:bg-emerald-700 transition"
          >
            Manage
          </Link>
        </motion.div>

        {/* Explore Community (optional) */}
        <motion.div
          variants={cardVariants}
          whileHover="hover"
          className="bg-white rounded-2xl shadow-lg p-6 text-center border border-orange-200 md:col-span-2 lg:col-span-1"
        >
          <Compass className="text-orange-600 mx-auto mb-4" size={42} />
          <h3 className="text-xl font-semibold mb-2 text-indigo-500">Join Our Community</h3>
          <p className="text-gray-600 mb-4">Connect with fellow travelers, share ideas & get inspired.</p>
          <Link
            to="/community"
            className="inline-block px-4 py-2 rounded-full bg-orange-600 text-white hover:bg-orange-700 transition"
          >
            Explore
          </Link>
        </motion.div>
      </div>

       <div className='flex justify-center items-center mt-15'>
         <Link to="/dashboard/join-guide">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn btn-accent px-6 text-white text-lg rounded-full shadow-md cursor-pointer"
                  >
                    Apply for Tour Guide
                  </motion.button>
                </Link>
       </div>
    </div>
  );
};

export default TouristPanel;
