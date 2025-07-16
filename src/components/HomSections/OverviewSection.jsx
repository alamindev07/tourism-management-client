// src/pages/Home/Home.jsx
import { motion } from "framer-motion";
import overviewVideo from "../../assets/overview.mp4"; // replace with your actual video path
import { Link } from "react-router-dom";

const OverviewSection = () => {
  return (
    <section className="bg-base-200 py-16">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
        >
          {/* Text Section */}
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-extrabold text-primary">
              Explore the World with Us
            </h2>
            <p className="text-base-content text-lg leading-relaxed">
              From mountains to beaches, we connect you with unforgettable journeys
              and passionate local guides. Discover curated trips, unique cultures, and
              once-in-a-lifetime adventures, all in one place.
            </p>
            <Link to="/trips">
              <button className="btn btn-primary rounded-full px-6 shadow-lg hover:scale-105 transition-transform duration-300">
                Browse Packages
              </button>
            </Link>
          </div>

          {/* Video Section */}
          <div className="rounded-xl overflow-hidden shadow-2xl">
            <video
              src={overviewVideo}
              controls
              className="w-full h-auto rounded-xl border-2 border-primary"
              preload="metadata"
            />
          </div>
     


        </motion.div>
      </div>
    </section>
  );
};

export default OverviewSection;
