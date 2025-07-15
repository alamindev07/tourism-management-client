



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
import useRole from "../hooks/useRole";
import LoadingSpinner from "../pages/LoadingSpiner/LoadingSpinner";

const DashboardLayout = () => {
  const { user } = useContext(AuthContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const [role, isRoleLoading] = useRole();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const handleBackHome = () => navigate("/");
  const handleLinkClick = () => {
    if (window.innerWidth < 768) setIsSidebarOpen(false);
  };

  if (isRoleLoading) {
    return (
      <div>
        <LoadingSpinner></LoadingSpinner>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-tr from-white to-slate-100">
      {/* Mobile Top Bar */}
      <div className="flex justify-between items-center p-4 bg-slate-800 text-white md:hidden shadow-md">
        <h2 className="text-lg font-bold tracking-wide">Dashboard</h2>
        <button onClick={toggleSidebar} className="focus:outline-none">
          <FaBars size={24} />
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`bg-white border-r w-full md:w-64 px-6 py-5 shadow-md transform transition-transform duration-300 ease-in-out z-20 ${
          isSidebarOpen ? "block" : "hidden"
        } md:block`}
      >
        <div className="mb-6">
          <h2 className="text-2xl font-extrabold text-slate-800">Tourism Admin</h2>
          {user && (
            <div className="mt-4 flex items-center gap-3 text-slate-700">
              <img
                src={user.photoURL || "https://via.placeholder.com/40"}
                alt="User"
                className="w-12 h-12 rounded-full border-2 border-slate-300 object-cover"
              />
              <div className="text-sm leading-5">
                <p className="font-semibold truncate">
                  {user.displayName || "Anonymous"}
                </p>
                <p className="text-xs text-slate-500 truncate">{user.email}</p>
              </div>
            </div>
          )}
        </div>

        <button
          onClick={handleBackHome}
          className="flex items-center gap-2 text-sm text-slate-700 font-medium bg-slate-100 px-3 py-2 rounded-md hover:bg-slate-200 transition w-full"
        >
          <FaArrowLeft /> Back to Home
        </button>

        {/* Navigation Links */}
        <nav className="mt-6 flex flex-col gap-2 text-sm font-medium">
          <NavLink
            to="/dashboard"
            onClick={handleLinkClick}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                isActive
                  ? "bg-blue-100 text-blue-800 font-semibold"
                  : "hover:bg-slate-100 text-slate-700"
              }`
            }
          >
            <FaHome /> Dashboard Home
          </NavLink>

          {role === "tourist" && (
            <NavLink
              to="/dashboard/tourist"
              onClick={handleLinkClick}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                  isActive
                    ? "bg-blue-100 text-blue-800 font-semibold"
                    : "hover:bg-slate-100 text-slate-700"
                }`
              }
            >
              <FaUser /> Tourist Panel
            </NavLink>
          )}

          {role === "guide" && (
            <NavLink
              to="/dashboard/guide"
              onClick={handleLinkClick}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                  isActive
                    ? "bg-blue-100 text-blue-800 font-semibold"
                    : "hover:bg-slate-100 text-slate-700"
                }`
              }
            >
              <FaUsers /> Tour Guide Panel
            </NavLink>
          )}

          {role === "admin" && (
            <>
              <NavLink
                to="/dashboard/admin"
                onClick={handleLinkClick}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                    isActive
                      ? "bg-blue-100 text-blue-800 font-semibold"
                      : "hover:bg-slate-100 text-slate-700"
                  }`
                }
              >
                <FaUserShield /> Admin Panel
              </NavLink>

              <NavLink
                to="/dashboard/admin/manage-users"
                onClick={handleLinkClick}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                    isActive
                      ? "bg-blue-100 text-blue-800 font-semibold"
                      : "hover:bg-slate-100 text-slate-700"
                  }`
                }
              >
                <FaUsers /> Manage Users
              </NavLink>
            </>
          )}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
