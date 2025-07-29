
import { useState, useContext, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { FacebookIcon } from "react-share";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaUserCircle, FaCalendarAlt, FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import toast from "react-hot-toast";
import CustomHelmet from "../../components/shared/CustomHelmet";

const ITEMS_PER_PAGE = 8;

const CommunityPage = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data: stories = [], isLoading } = useQuery({
    queryKey: ["allStories"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/stories");
      return res.data;
    },
  });

  // Filter stories based on search term (this is memoized for performance)
  const filteredStories = useMemo(() => {
    return stories.filter(
      (story) =>
        story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        story.userName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [stories, searchTerm]);

  // Pagination logic
  const totalPages = Math.ceil(filteredStories.length / ITEMS_PER_PAGE);
  const paginatedStories = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredStories.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredStories, currentPage]);

  // Reset page on search
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  // Facebook Share handler
  const handleFacebookShareClick = (story) => {
    if (!user) {
      toast("Please login to share this story.");
      navigate("/login", {
        state: { from: location.pathname, shareStoryId: story._id },
      });
    } else {
      const shareUrl = `${window.location.origin}/community`;
      const shareText = story.title;
      const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        shareUrl
      )}&quote=${encodeURIComponent(shareText)}&hashtag=%23CommunityStory`;
      window.open(facebookShareUrl, "fbshare", "width=600,height=400");
    }
  };

  if (isLoading)
    return (
      <div className="text-center py-20 text-gray-600 text-xl">
        Loading stories...
      </div>
    );

  return (
    <section className="px-4 md:px-10 lg:px-20 py-14 min-h-screen ">
       <CustomHelmet title="Community - TourWise App" />
      <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
        Community Stories
      </h2>

      {/* Search Bar */}
      <div className="flex items-center max-w-md mx-auto bg-white shadow-md rounded-full px-4 mb-12">
        <FaSearch className="text-gray-400" />
        <input
          type="text"
          placeholder="Search by title or author..."
          className="flex-1 px-3 py-2 focus:outline-none rounded-full"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {/* Stories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {paginatedStories.length > 0 ? (
          paginatedStories.map((story) => (
            <motion.div
              key={story._id}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col hover:shadow-xl bg-gradient-to-r from-blue-100 via-pink-100 to-blue-100"
            >
              <img
                src={story.images?.[0] || "/placeholder.jpg"}
                alt={story.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="font-bold text-xl mb-2 text-gray-900 line-clamp-1">
                  {story.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {story.description}
                </p>

                <div className="flex items-center gap-3 mb-4">
                  {story.userPhoto ? (
                    <img
                      src={story.userPhoto}
                      alt={story.userName}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <FaUserCircle className="text-gray-400 text-2xl" />
                  )}
                  <span className="text-sm text-gray-700">
                    {story.userName}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                  <span className="flex items-center gap-1">
                    <FaCalendarAlt />{" "}
                    {new Date(story.createdAt).toLocaleDateString()}
                  </span>

                  <button
                    onClick={() => handleFacebookShareClick(story)}
                    className="flex items-center gap-2 text-blue-600 font-semibold hover:underline cursor-pointer"
                    type="button"
                  >
                    <FacebookIcon size={32} round />
                    <span className="hidden md:inline">Share</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No stories found.
          </p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-10 space-x-2 flex-wrap">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded bg-gray-300 text-gray-800 hover:bg-gray-400 disabled:opacity-50"
          >
            Prev
          </button>

          {[...Array(totalPages).keys()].map((num) => (
            <button
              key={num + 1}
              onClick={() => setCurrentPage(num + 1)}
              className={`px-4 py-2 rounded ${
                currentPage === num + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              {num + 1}
            </button>
          ))}

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded bg-gray-300 text-gray-800 hover:bg-gray-400 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
};

export default CommunityPage;
