
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info, Clock, Users, MapPin } from "lucide-react";

const AboutTour = ({ pkg }) => {
  const [expanded, setExpanded] = useState(false);
  const maxChars = 300;

  const shortText =
    pkg.description?.length > maxChars
      ? pkg.description.slice(0, maxChars) + "..."
      : pkg.description;

  return (
    <motion.section
      className="mt-8 px-4 md:px-8"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      aria-label="About the tour section"
    >
      {/* Heading */}
      <div className="flex items-center gap-3 mb-6 select-none">
        <Info className="text-gradient-blue w-8 h-8" />
        <h2 className="text-4xl font-extrabold text-gradient-blue">
          About The Tour
        </h2>
      </div>

      {/* Tour Description */}
      <motion.p
        key={expanded ? "full" : "short"}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 8 }}
        transition={{ duration: 0.4 }}
        className="max-w-3xl text-lg font-medium leading-relaxed text-slate-600600 dark:text-red-200"
      >
        {expanded ? pkg.description : shortText}
      </motion.p>

      {/* Read More / Read Less */}
      {pkg.description?.length > maxChars && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-4 font-semibold text-gradient-blue hover:text-gradient-pink underline transition-colors focus:outline-none focus:ring-2 focus:ring-gradient-blue"
          aria-expanded={expanded}
          aria-controls="tour-description"
        >
          {expanded ? "Read Less" : "Read More"}
        </button>
      )}

      {/* Extra Info */}
      <motion.div
        layout
        className=" mt-8 flex flex-col sm:flex-row justify-around gap-6 max-w-4xl mx-auto"
      >
        {[
          {
            icon: <Clock className="w-6 h-6 text-gradient-pink" />,
            label: "Duration",
            value: pkg.duration || "N/A",
          },
          {
            icon: <Users className="w-6 h-6 text-gradient-pink" />,
            label: "Group Size",
            value: pkg.groupSize || "Flexible",
          },
          {
            icon: <MapPin className="w-6 h-6 text-gradient-pink" />,
            label: "Location",
            value: pkg.location || "Worldwide",
          },
        ].map(({ icon, label, value }) => (
          <motion.div
            key={label}
            whileHover={{ scale: 1.1, color: "#FF6B6B" }}
            whileFocus={{ scale: 1.1, color: "#FF6B6B" }}
            tabIndex={0}
            className="bg-gradient-to-br from-blue-100 via-steel to-blue-100 cursor-pointer flex flex-col items-center gap-1 p-2 rounded-lg"
            aria-label={`${label}: ${value}`}
          >
            <div className="text-3xl ">{icon}</div>
            <h3 className="text-xl font-semibold text-gradient-blue">{label}</h3>
            <p className="text-md font-medium text-gradient-text">{value}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default AboutTour;
