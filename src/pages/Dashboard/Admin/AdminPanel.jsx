// src/pages/Dashboard/Admin/AdminPanel.jsx
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Link } from 'react-router-dom';
import { Users, Settings, ShieldCheck, NotebookText } from 'lucide-react';
import CustomHelmet from '../../../components/shared/CustomHelmet';

const cardVariants = {
  hover: {
    scale: 1.05,
    transition: { duration: 0.3 },
  },
};

const AdminPanel = () => {
  return (
    <div className="p-6 md:p-10 min-h-screen bg-gradient-to-br from-white via-indigo-50 to-indigo-100">
            <CustomHelmet title="Admin Pannel - TourWise App" />
     
     
      <motion.div className="text-center mb-6">
        <TypeAnimation
          sequence={[
            'Welcome, Admin! 👑',
            2000,
            'Manage users and permissions ⚙️',
            2000,
            'Review guide applications ✅',
            2000,
            'Oversee all system data 📊',
            2000,
          ]}
          wrapper="h2"
          speed={40}
          repeat={Infinity}
          className="text-3xl md:text-4xl font-bold text-indigo-800"
        />
        <p className="text-gray-600 mt-2 text-sm md:text-base">
          This is your central control room. Govern all user roles, content, and access.
        </p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto mt-10">
        {/* Manage Users */}
        <motion.div variants={cardVariants} whileHover="hover" className="bg-white rounded-2xl shadow-lg p-6 text-center border border-indigo-200">
          <Users className="text-indigo-600 mx-auto mb-4" size={42} />
          <h3 className="text-xl font-semibold mb-2 text-pink-400">Manage Users</h3>
          <p className="text-gray-600 mb-4">View, update, and assign roles to users.</p>
          <Link to="/dashboard/admin/manage-users" className="inline-block px-4 py-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition">
            Open Users
          </Link>
        </motion.div>

        {/* Manage Guide Applications */}
        <motion.div variants={cardVariants} whileHover="hover" className="bg-white rounded-2xl shadow-lg p-6 text-center border border-teal-200">
          <ShieldCheck className="text-teal-600 mx-auto mb-4" size={42} />
          <h3 className="text-xl font-semibold mb-2 text-amber-400">Review Guide Requests</h3>
          <p className="text-gray-600 mb-4">Approve or reject tour guide applications.</p>
          <Link to="/dashboard/admin/manage-candidates" className="inline-block px-4 py-2 rounded-full bg-teal-600 text-white hover:bg-teal-700 transition">
            Review Requests
          </Link>
        </motion.div>

        {/* Admin Stories */}
        <motion.div variants={cardVariants} whileHover="hover" className="bg-white rounded-2xl shadow-lg p-6 text-center border border-purple-200">
          <NotebookText className="text-purple-600 mx-auto mb-4" size={42} />
          <h3 className="text-xl font-semibold mb-2 text-sky-400">Explore Stories</h3>
          <p className="text-gray-600 mb-4">See all user stories whatever they shared</p>
          <Link to="/community" className="inline-block px-4 py-2 rounded-full bg-purple-600 text-white hover:bg-purple-700 transition">
            View Stories
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminPanel;
