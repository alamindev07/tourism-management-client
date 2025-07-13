import { Link, NavLink } from 'react-router-dom';
import { useContext } from 'react';

// import { Avatar, Dropdown } from 'daisyui';
import logo from '../assets/navbarLogo.jpg';
import { AuthContext } from '../context/AuthProvider';
import toast from 'react-hot-toast';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged Out Successfylly")
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const navLinks = (
    <>
      <NavLink to="/" className={({ isActive }) => isActive ? 'text-blue-500 font-bold' : ''}>Home</NavLink>
      <NavLink to="/community" className={({ isActive }) => isActive ? 'text-blue-500 font-bold' : ''}>Community</NavLink>
      <NavLink to="/about" className={({ isActive }) => isActive ? 'text-blue-500 font-bold' : ''}>About Us</NavLink>
      <NavLink to="/trips" className={({ isActive }) => isActive ? 'text-blue-500 font-bold' : ''}>Trips</NavLink>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-md px-4">
      <div className="navbar-start">
        <Link to="/" className="flex items-center gap-1">
          <img src={logo} alt="Logo" className="h-10" />
          <span className="text-lg font-bold text-gray-800">Tourist Guide</span>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex gap-6">
        {navLinks}
      </div>
      <div className="navbar-end">
        {user ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={user?.photoURL || ''} alt="Profile" />
              </div>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-60">
              <li className="px-3 text-sm text-gray-500">{user?.displayName}</li>
              <li className="px-3 text-xs text-gray-400">{user?.email}</li>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/offers">Offer Announcements</Link></li>
              <li><button onClick={handleLogout}>Logout</button></li>
            </ul>
          </div>
        ) : (
          <>
            <Link to="/login" className="btn btn-outline btn-sm">Login</Link>
            <Link to="/register" className="btn btn-outline btn-sm ml-2">Register</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
