import { Link } from "react-router-dom";

const TourGuideCard = ({ guide }) => {
  return (
    <div className="bg-white shadow-xl rounded-xl p-5 hover:scale-[1.02] transition">
      <img
        src={guide.photoURL || "https://i.ibb.co/album/FakeUser.jpg"}
        alt={guide.name}
        className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
      />
      <h3 className="text-xl font-semibold text-center mb-1">{guide.name}</h3>
      <p className="text-center text-sm text-gray-500">{guide.email}</p>
      <div className="mt-4 text-center">
        <Link
          to={`/guide-details/${guide._id}`}
          className="btn btn-sm btn-outline btn-primary"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
};

export default TourGuideCard;
