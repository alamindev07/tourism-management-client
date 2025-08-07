import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const TourGuideCard = ({ guide }) => {
  return (
    <div className="bg-white dark:bg-slate-800 shadow-lg hover:shadow-2xl rounded-2xl p-6 transform transition duration-300 hover:scale-[1.03] border border-purple-100 hover:border-purple-300 bg-gradient-to-r from-blue-100 via-pink-100 to-pink-100">
      <div className="flex flex-col items-center">
        <img
          src={guide.photoURL || "https://i.ibb.co/album/FakeUser.jpg"}
          alt={guide.name}
          className="w-28 h-28 object-cover rounded-full border-4 border-purple-300 hover:border-pink-400 transition duration-300 shadow-md"
        />
        <h3 className="text-xl font-bold mt-4 text-center text-gray-800 dark:text-red-500">{guide.name}</h3>
        <p className="text-sm text-center text-gray-500 dark:text-amber-400">{guide.email}</p>

        <Link
          to={`/dashboard/guide/profile/${guide._id}`}
          className="mt-5 inline-flex items-center gap-2 text-sm px-4 py-2 rounded-full border border-purple-500 text-purple-700 hover:bg-purple-600 hover:text-white transition-all duration-300 font-medium shadow-sm"
        >
          <FaUserCircle className="text-lg" />
          View Profile
        </Link>



      </div>
    </div>
  );
};

export default TourGuideCard;
