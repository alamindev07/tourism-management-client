


import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import {
  FaUser,
  FaUsers,
  FaHome,
  FaUserShield,
  FaBars,
  FaArrowLeft,
} from "react-icons/fa";
import { AuthContext } from "../context/AuthProvider";

const DashboardLayout = () => {
  const { user } = useContext(AuthContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const handleBackHome = () => navigate("/");

  const handleLinkClick = () => {
    if (window.innerWidth < 768) setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Mobile Nav Toggle */}
      <div className="flex justify-between items-center p-4 bg-slate-800 text-white md:hidden">
        <h2 className="text-lg font-semibold">Dashboard</h2>
        <button onClick={toggleSidebar}>
          <FaBars size={24} />
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`bg-slate-100 w-full md:w-64 p-6 space-y-4 shadow-md transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "block" : "hidden"
        } md:block`}
      >
       

        <div className="mb-4">
  <h2 className="text-xl font-bold text-slate-700">Dashboard Menu</h2>
  {user && (
    <div className="mt-2 flex items-center gap-3 text-sm text-slate-600">
      <img
        src={user.photoURL || "https://via.placeholder.com/40"}
        alt="User Profile"
        className="w-10 h-10 rounded-full object-cover"
      />
      <div className="font-semibold truncate">
        {user.displayName || user.email}
      </div>
    </div>
  )}
</div>


        {/* Back Home Button */}
        <button
          onClick={handleBackHome}
          className="flex items-center gap-2 text-sm font-medium bg-slate-200 px-3 py-2 rounded-md hover:bg-slate-300 transition"
        >
          <FaArrowLeft /> Back to Home
        </button>

        {/* Nav Links */}
        <nav className="space-y-2 mt-6">
          <NavLink
            to="/dashboard"
            onClick={handleLinkClick}
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded-lg ${
                isActive ? "bg-slate-300 font-semibold" : "hover:bg-slate-200"
              }`
            }
          >
            <FaHome /> Home
          </NavLink>

          <NavLink
            to="/dashboard/tourist"
            onClick={handleLinkClick}
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded-lg ${
                isActive ? "bg-slate-300 font-semibold" : "hover:bg-slate-200"
              }`
            }
          >
            <FaUser /> Tourist Panel
          </NavLink>

          <NavLink
            to="/dashboard/guide"
            onClick={handleLinkClick}
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded-lg ${
                isActive ? "bg-slate-300 font-semibold" : "hover:bg-slate-200"
              }`
            }
          >
            <FaUsers /> Tour Guide Panel
          </NavLink>

          <NavLink
            to="/dashboard/admin"
            onClick={handleLinkClick}
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded-lg ${
                isActive ? "bg-slate-300 font-semibold" : "hover:bg-slate-200"
              }`
            }
          >
            <FaUserShield /> Admin Panel
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 bg-slate-50">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
