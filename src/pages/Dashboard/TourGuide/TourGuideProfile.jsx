import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const TourGuideProfile = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data: guide, isLoading, error } = useQuery({
    queryKey: ["tour-guide", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/users/id/${id}`);
      return res.data;
    },
  });

  if (isLoading) 
    return <div className="text-center py-20">Loading profile...</div>;

  if (error) 
    return <div className="text-center text-red-500">Failed to load guide profile</div>;

  return (
    <div className="max-w-7xl mx-auto p-6 md:p-10 bg-white rounded-lg shadow-lg mt-10">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 btn btn-success text-white rounded hover:bg-primary-dark transition"
      >
        ← Back
      </button>

      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        {/* Profile Picture */}
        <img
          src={guide?.photoURL || "https://via.placeholder.com/150"}
          alt={guide?.name || "Tour Guide"}
          className="w-40 h-40 rounded-full object-cover border-4 border-primary shadow-lg"
        />

        {/* Profile Info */}
        <div className="flex-1">
          <h1 className="text-4xl font-extrabold mb-2">{guide?.name || "Unnamed Guide"}</h1>
          <p className="text-gray-600 mb-1"><strong>Email:</strong> {guide?.email}</p>
          {guide?.phone && <p className="text-gray-600 mb-1"><strong>Phone:</strong> {guide.phone}</p>}
          {guide?.role && <p className="text-gray-600 mb-1"><strong>Role:</strong> {guide.role}</p>}
          {guide?.createdAt && (
            <p className="text-gray-500 text-sm mb-4">
              Joined: {new Date(guide.createdAt).toLocaleDateString()}
            </p>
          )}

          {/* Bio or Description */}
          <div className="bg-gray-50 p-4 rounded-md shadow-inner">
            <h2 className="text-2xl font-semibold mb-2">About Me</h2>
            <p className="text-gray-700 italic">{guide?.bio || "No bio available."}</p>
          </div>
        </div>
      </div>

      {/* Add more sections as needed, like social links, languages spoken, reviews, etc. */}

    </div>
  );
};

export default TourGuideProfile;
