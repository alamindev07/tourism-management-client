import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, ChevronDown, ChevronUp } from "lucide-react";

const TourPlan = ({ pkg }) => {
  const [openDay, setOpenDay] = useState(null);

  const toggleDay = (day) => {
    setOpenDay(openDay === day ? null : day);
  };

  const tourPlans = [
    "Explore famous landmarks and cultural attractions.",
    "Visit scenic spots and enjoy local food experiences.",
    "Relax and discover hidden gems of the area.",
    "Adventure activities and guided tours included."
  ];

  return (
    <section className="mt-10">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Tour Plan</h2>
      <div className="space-y-4">
        {[...Array(parseInt(pkg.duration) || 1)].map((_, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
          >
            <button
              className="flex justify-between items-center w-full px-5 py-4 bg-gradient-to-r from-green-50 to-white cursor-pointer"
              onClick={() => toggleDay(index)}
            >
              <div className="flex items-center gap-3">
                <span className="flex items-center bg-green-500 text-white font-semibold rounded-md px-3 py-1 text-sm">
                  Day {index + 1}
                </span>
                <span className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-green-600" />
                  {`Exciting Tour Plan for Day ${index + 1}`}
                </span>
              </div>
              {openDay === index ? (
                <ChevronUp className="text-gray-600 w-6 h-6" />
              ) : (
                <ChevronDown className="text-gray-600 w-6 h-6" />
              )}
            </button>

            <AnimatePresence>
              {openDay === index && (
                <motion.div
                  className="px-5 py-4 bg-white text-gray-600 leading-relaxed"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {tourPlans[index % tourPlans.length]}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TourPlan;
