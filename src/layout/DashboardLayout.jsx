import { Outlet, NavLink, useNavigate, Link } from "react-router-dom";
import { useContext, useState } from "react";
import {
  FaUser,
  FaUsers,
  FaHome,
  FaBars,
  FaArrowLeft,
  FaSuitcase,
  FaClipboardList,
  FaPlus,
  FaBookOpen,
  FaRoute,
  FaMapMarkedAlt,
} from "react-icons/fa";
import { AuthContext } from "../context/AuthProvider";
import useRole from "../hooks/useRole";
import LoadingSpinner from "../pages/LoadingSpiner/LoadingSpinner";
import { LucideLayoutDashboard } from "lucide-react";

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
        <LoadingSpinner />
      </div>
    );
  }

  const navItem = (to, icon, label) => (
    <NavLink
      to={to}
      onClick={handleLinkClick}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2 rounded-lg transition text-sm font-medium ${
          isActive
            ? "bg-green-100 text-green-800 font-semibold"
            : "hover:bg-slate-100 text-slate-700"
        }`
      }
    >
      {icon} {label}
    </NavLink>
  );

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-tr from-white to-slate-100">
      <div className="flex justify-between items-center p-4 bg-slate-800 text-white md:hidden shadow-md">
<Link to="/dashboard">        <h2 className="text-lg font-bold tracking-wide">Dashboard</h2>
</Link>
        <button onClick={toggleSidebar} className="focus:outline-none cursor-pointer">
          <FaBars size={24} />
        </button>
      </div>

      <aside
        className={`bg-white border-r w-full md:w-64 px-6 py-5 shadow-md transform transition-transform duration-300 ease-in-out z-20 ${
          isSidebarOpen ? "block" : "hidden"
        } md:block`}
      >
        <div className="mb-6">
         <h2 className="text-2xl md:text-3xl font-extrabold text-center md:text-left text-slate-800">
  <span className="text-green-600 animate-pulse flex  items-center gap-2"> <LucideLayoutDashboard />
   <span className="text-pink-600 typing-animation block mt-1">{role || "Anonymous"} <span className="text-green-600">Role</span></span>
</span>{" "}
 
</h2>

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
          className="flex items-center gap-2 text-sm text-slate-700 font-medium bg-green-500 px-3 py-2 rounded-md hover:bg-purple-200 transition w-full cursor-pointer"
        >
         <FaHome /> <FaArrowLeft /> Back to Home
        </button>

        <nav className="mt-6 flex flex-col gap-2">
          {navItem("/dashboard", <FaHome />, "Dashboard Home")}

          {/* Tourist role */}
          {role === "tourist" && (
            <>
              {navItem("/dashboard/profile", <FaUser />, "Manage Profile")}
              {navItem(
                "/dashboard/bookings",
                <FaClipboardList />,
                "My Bookings"
              )}
              {navItem(
                "/dashboard/manage-stories",
                <FaBookOpen />,
                "Manage Stories"
              )}
              {navItem("/dashboard/stories/add", <FaPlus />, "Add Stories")}
              {navItem(
                "/dashboard/join-guide",
                <FaRoute />,
                "Join as Tour Guide"
              )}
            </>
          )}

          {/* Guide role */}
          {role === "tourguide" && (
            <>
              {navItem("/dashboard/profile", <FaUser />, "Manage Profile")}
              {navItem(
                "/dashboard/assignedTours",
                <FaMapMarkedAlt />,
                "My Assigned Tours"
              )}
              {navItem("/dashboard/stories/add", <FaPlus />, "Add Stories")}
              {navItem(
                "/dashboard/manage-stories",
                <FaBookOpen />,
                "Manage Stories"
              )}
            </>
          )}

          {/* Admin role */}
          {role === "admin" && (
            <>
              {navItem("/dashboard/adminProfile", <FaUser />, "Manage Profile")}
             
              {navItem("/dashboard/stories/add", <FaPlus />, "Add Stories")}
              {navItem(
                "/dashboard/manage-stories",
                <FaBookOpen />,
                "Manage Stories"
              )}
              {navItem(
                "/dashboard/admin/add-package",
                <FaSuitcase />,
                "Add Packages"
              )}

              {navItem(
                "/dashboard/admin/manage-candidates",
                <FaUsers />,
                "Manage Candidates"
              )}
              {navItem(
                "/dashboard/admin/manage-users",
                <FaUsers />,
                "Manage All Users"
              )}
            </>
          )}
        </nav>
      </aside>

      <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
