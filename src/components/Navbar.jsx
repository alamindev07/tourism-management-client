

import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import logo from "../assets/navbarLogo.jpg";
import { AuthContext } from "../context/AuthProvider";
import { FaUserCircle } from "react-icons/fa";

import { FiUser, FiMail, FiGrid, FiGift, FiLogOut } from "react-icons/fi";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await logout();
Swal.fire({
        icon: "success",
        title: "Logout Successful!",
        confirmButtonColor: "#3085d6",
      });
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const navLinks = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "text-blue-600 font-bold" : "text-gray-700 hover:text-blue-500 transition"
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/community"
        className={({ isActive }) =>
          isActive ? "text-blue-600 font-bold" : "text-gray-700 hover:text-blue-500 transition"
        }
      >
        Community
      </NavLink>
      <NavLink
        to="/about"
        className={({ isActive }) =>
          isActive ? "text-blue-600 font-bold" : "text-gray-700 hover:text-blue-500 transition"
        }
      >
        About Us
      </NavLink>
      <NavLink
        to="/Alltrips"
        className={({ isActive }) =>
          isActive ? "text-blue-600 font-bold" : "text-gray-700 hover:text-blue-500 transition"
        }
      >
        Trips
      </NavLink>
    </>
  );

  // Fallback name and avatar
  const displayName = user?.displayName?.trim() || "Guest";
  const photoURL = user?.photoURL?.trim();
  const email = user?.email || "";

  return (
    <div className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="h-10 w-10 rounded-full" />
          <span className="text-xl font-bold text-slate-800">TourWise</span>
        </Link>

        {/* Navigation links */}
        <div className="hidden lg:flex gap-6 items-center">{navLinks}</div>

        {/* Auth Section */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} className="cursor-pointer flex items-center gap-2">
                {photoURL ? (
                  <img
                    src={photoURL}
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full border border-slate-300 object-cover"
                  />
                ) : (
                  <FaUserCircle className="text-3xl text-slate-500" />
                )}
              </div>
             

               <ul
      tabIndex={0}
      className="dropdown-content menu menu-sm mt-3 p-3 shadow-xl rounded-xl w-64 bg-white/80 backdrop-blur-md border border-gray-200 space-y-1"
    >
      <li className="flex items-center gap-2 px-3 py-1 text-sm font-semibold text-gray-800">
        <FiUser className="text-blue-500" />
        {displayName}
      </li>
      <li className="flex items-center gap-2 px-3 py-1 text-xs text-gray-600 truncate">
        <FiMail className="text-green-500" />
        {email}
      </li>

      <li>
        <Link
          to="/dashboard"
          className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all hover:bg-blue-100 text-gray-700 hover:text-blue-700 font-medium"
        >
          <FiGrid /> Dashboard
        </Link>
      </li>

      <li>
        <Link
          to="/offers"
          className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all hover:bg-purple-100 text-gray-700 hover:text-purple-700 font-medium"
        >
          <FiGift /> Offer Announcements
        </Link>
      </li>

      <li>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-2 w-full rounded-lg transition-all bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 font-medium"
        >
          <FiLogOut /> Logout
        </button>
      </li>
    </ul>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link to="/login" className="btn btn-sm btn-outline btn-accent rounded-full px-4">
                Login
              </Link>
              <Link to="/register" className="btn btn-sm bg-purple-600 text-white rounded-full px-4 hover:bg-blue-700">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile nav */}
      <div className="lg:hidden px-4 py-2 border-t bg-gray-50 flex justify-center gap-6 text-sm">
        {navLinks}
      </div>
    </div>
  );
};

export default Navbar;
