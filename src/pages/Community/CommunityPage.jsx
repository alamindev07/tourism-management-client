import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FacebookShareButton, FacebookIcon } from "react-share";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaUserCircle, FaCalendarAlt, FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";

const CommunityPage = () => {
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState("");

  const { data: stories = [], isLoading } = useQuery({
    queryKey: ["allStories"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/stories");
      return res.data;
    },
  });

  if (isLoading)
    return <div className="text-center py-20 text-gray-600 text-xl">Loading stories...</div>;

  // Filter stories by search term
  const filteredStories = stories.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    story.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="px-4 md:px-10 lg:px-20 py-14 bg-gray-50 min-h-screen">
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
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredStories.length > 0 ? (
          filteredStories.map((story) => (
            <motion.div
              key={story._id}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col hover:shadow-xl"
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
                  <span className="text-sm text-gray-700">{story.userName}</span>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                  <span className="flex items-center gap-1">
                    <FaCalendarAlt />{" "}
                    {new Date(story.createdAt).toLocaleDateString()}
                  </span>

                  <FacebookShareButton
                    url={`${window.location.origin}/community`}
                    quote={story.title}
                    hashtag="#CommunityStory"
                    className="flex items-center gap-2"
                  >
                    <FacebookIcon size={32} round />
                    <span className="hidden md:inline text-blue-600 font-semibold">
                      Share
                    </span>
                  </FacebookShareButton>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">No stories found.</p>
        )}
      </div>
    </section>
  );
};

export default CommunityPage;
