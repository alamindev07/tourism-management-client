import { FaFacebookF, FaTwitter, FaInstagram, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-tr from-indigo-950 via-purple-900 to-indigo-900 text-white pt-10 pb-6 px-4 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 border-b border-purple-800 pb-8">
        
        {/* Logo & About */}
        <div>
          <h2 className="text-2xl font-bold mb-3">TourWise</h2>
          <p className="text-sm text-gray-300">
            Explore the world with expert guides and custom travel packages. Experience the journey of a lifetime.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-300">
            <li><Link to="/" className="hover:text-pink-400 transition">Home</Link></li>
            <li><Link to="/tours" className="hover:text-pink-400 transition">Tours</Link></li>
            <li><Link to="/guides" className="hover:text-pink-400 transition">Guides</Link></li>
            <li><Link to="/contact" className="hover:text-pink-400 transition">Contact</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
          <ul className="space-y-2 text-gray-300">
            <li className="flex items-center gap-2">
              <FaPhoneAlt className="text-pink-400" />
              +880 1234 567890
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope className="text-pink-400" />
              support@tourwise.com
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex gap-4 text-2xl">
            <a href="#" className="hover:text-pink-400 transition"><FaFacebookF /></a>
            <a href="#" className="hover:text-pink-400 transition"><FaTwitter /></a>
            <a href="#" className="hover:text-pink-400 transition"><FaInstagram /></a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center text-sm text-gray-400 mt-6">
        &copy; {new Date().getFullYear()} TourWise. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
