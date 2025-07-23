
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useAxiosSecure from "../../hooks/useAxiosSecure";

function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const PopularDestinationsSection = () => {
  const [allDestinations, setAllDestinations] = useState([]);
  const [displayed, setDisplayed] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();
  const intervalRef = useRef(null);

  useEffect(() => {
    axiosSecure
      .get("/api/packages/popular")
      .then((res) => {
        setAllDestinations(res.data);
        setDisplayed(res.data.slice(0, 4));
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [axiosSecure]);

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    if (allDestinations.length > 4) {
      intervalRef.current = setInterval(() => {
        setDisplayed((prevDisplayed) => {
          let newSelection;
          let attempts = 0;
          do {
            newSelection = shuffleArray(allDestinations).slice(0, 4);
            attempts++;
          } while (
            attempts < 10 &&
            newSelection.every(
              (item, idx) => item._id === prevDisplayed[idx]?._id
            )
          );
          return newSelection;
        });
      }, 4000);
    }

    return () => clearInterval(intervalRef.current);
  }, [allDestinations]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  return (
    <div className="px-4 md:px-10 lg:px-20 py-14 bg-gray-50">
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-4xl font-extrabold text-center text-gray-800 mb-12 tracking-wide"
      >
        Popular Destinations
      </motion.h2>

      {loading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={JSON.stringify(displayed.map((d) => d._id))}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {displayed.map((item) => (
              <motion.div
                key={item._id}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                layout
                className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-500 cursor-pointer overflow-hidden flex flex-col"
              >
                <img
                  src={item.images?.[0]}
                  alt={item.title}
                  className="w-36 h-36 object-cover rounded-full mx-auto mt-6"
                />

                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="font-semibold text-xl text-gray-900 mb-4 text-center">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-3 mb-6 text-center">
                    {item.description}
                  </p>

                  <div className="flex justify-center gap-6 mt-auto">
                    <span className="bg-purple-200 text-purple-800 font-semibold px-4 py-2 rounded-full shadow-md text-sm select-none">
                      💰 {item.price.toLocaleString()} BDT
                    </span>
                    <span className="bg-pink-200 text-pink-800 font-semibold px-4 py-2 rounded-full shadow-md text-sm select-none">
                      🕒 {item.duration}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default PopularDestinationsSection;

