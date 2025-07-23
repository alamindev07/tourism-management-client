

// export default TouristStorySection;
import { useEffect, useState } from 'react';
import { FacebookShareButton, FacebookIcon } from 'react-share';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { format } from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';

const TouristStorySection = () => {
  const [stories, setStories] = useState([]);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  // Fetch stories from backend
  const fetchStories = async () => {
    try {
      const res = await axiosSecure.get('/api/stories/random');
      setStories(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchStories();

    // Auto-refresh every 4 seconds
    const interval = setInterval(() => {
      fetchStories();
    }, 4000);

    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  const handleShareClick = (e) => {
    if (!user) {
      e.preventDefault();
      navigate('/login');
    }
  };

  return (
    <div className="px-4 md:px-10 lg:px-20 py-12 bg-gradient-to-b from-[#f9fbff] to-[#edf3fa]">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">Traveler Stories</h2>

      <AnimatePresence mode="wait">
        <motion.div
          key={JSON.stringify(stories.map((s) => s._id))} // animate when stories change
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.5 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stories.map((story) => (
            <motion.div
              key={story._id}
              className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={story.images?.[0]}
                alt={story.title}
                className="h-44 w-full object-cover transition-transform duration-300 hover:scale-105"
              />

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg line-clamp-1">{story.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-3">{story.description}</p>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center gap-2">
                    <img
                      src={story.userPhoto}
                      alt="user"
                      className="w-8 h-8 rounded-full border"
                    />
                    <div className="text-xs text-gray-700">
                      <div className="font-medium">{story.userName}</div>
                      <div className="text-gray-500">{format(new Date(story.createdAt), 'MMM d, yyyy')}</div>
                    </div>
                  </div>

                  <FacebookShareButton
                    url={`${window.location.origin}/story/${story._id}`}
                    quote={story.title}
                    onClick={handleShareClick}
                  >
                    <FacebookIcon size={28} round />
                  </FacebookShareButton>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      <div className="text-center mt-12">
        <Link
          to="/all-stories"
          className="inline-block bg-gradient-to-r from-orange-600 via-orange-500 to-orange-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-3 rounded-full font-semibold shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300"
        >
          View All Stories
        </Link>
      </div>
    </div>
  );
};

export default TouristStorySection;
