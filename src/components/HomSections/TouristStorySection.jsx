import { useQuery } from '@tanstack/react-query';
import { FacebookShareButton, FacebookIcon } from 'react-share';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { format } from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';

const TouristStorySection = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const { data: stories = [], isLoading } = useQuery({
    queryKey: ['randomStories'],
    queryFn: async () => {
      const res = await axiosSecure.get('/api/stories/random');
      return res.data;
    },
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  return (
    <div className="px-4 md:px-10 lg:px-20 py-14 bg-gradient-to-b from-[#f9fbff] to-[#edf3fa]">
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-4xl font-extrabold text-center text-gray-800 mb-12 tracking-wide"
      >
        Traveler Stories
      </motion.h2>

      {isLoading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          <AnimatePresence mode="wait">
            {stories.map((story) => (
              <motion.div
                key={story._id}
                variants={{
                  hidden: { opacity: 0, x: 50 },
                  visible: { opacity: 1, x: 0 },
                  exit: { opacity: 0, x: -50 },
                }}
                initial="hidden"
                animate="visible"
                exit="exit"
                layout
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-500 cursor-pointer overflow-hidden flex flex-col bg-gradient-to-r from-green-50 via-olive-100 to-blue-100"
              >
                <img
                  src={story.images?.[0]}
                  alt={story.title}
                  className="w-36 h-36 object-cover rounded-full mx-auto mt-6"
                />

                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="font-semibold text-xl text-gray-900 mb-4 text-center">
                    {story.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-3 mb-6 text-center">
                    {story.description}
                  </p>

                  <div className="flex justify-center gap-3 mt-auto">
                    <span className="bg-green-100 text-green-700 font-semibold px-3 py-1 rounded-full text-xs shadow select-none">
                      ✍️ {story.userName}
                    </span>
                    <span className="bg-blue-100 text-blue-700 font-semibold px-3 py-1 rounded-full text-xs shadow select-none">
                      📅 {format(new Date(story.createdAt), 'MMM d, yyyy')}
                    </span>
                  </div>

                  <div className="flex justify-center mt-4">
                    {user ? (
                      <FacebookShareButton
                        url={`${window.location.origin}/story/${story._id}`}
                        quote={story.title}
                      >
                        <FacebookIcon size={32} round />
                      </FacebookShareButton>
                    ) : (
                      <button
                        type="button"
                        onClick={() =>
                          navigate('/login', {
                            state: { from: location.pathname },
                          })
                        }
                        className="cursor-pointer"
                        aria-label="Login to share on Facebook"
                      >
                        <FacebookIcon size={32} round />
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      <div className="text-center mt-12">
        <Link
          to="/community"
          className="inline-block bg-orange-600 hover:bg-green-500 px-8 py-3 rounded-full font-semibold shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300"
        >
          View All Stories
        </Link>
      </div>
    </div>
  );
};

export default TouristStorySection;
