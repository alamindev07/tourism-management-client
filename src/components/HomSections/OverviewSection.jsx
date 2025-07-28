// // src/pages/Home/Home.jsx
// import { motion } from "framer-motion";
// import overviewVideo from "../../assets/overview.mp4"; // replace with your actual video path
// import { Link } from "react-router-dom";

// const OverviewSection = () => {
//   return (
//     <section className="bg-base-200 py-16">
//       <div className="max-w-6xl mx-auto px-4">
//         <motion.div
//           initial={{ opacity: 0, y: 50 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, ease: "easeOut" }}
//           viewport={{ once: true }}
//           className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
//         >
//           {/* Text Section */}
//           <div className="space-y-6">
//             <h2 className="text-4xl md:text-5xl font-extrabold text-primary">
//               Explore the World with Us
//             </h2>
//             <p className="text-base-content text-lg leading-relaxed">
//               From mountains to beaches, we connect you with unforgettable journeys
//               and passionate local guides. Discover curated trips, unique cultures, and
//               once-in-a-lifetime adventures, all in one place.
//             </p>
//             <Link to="/Alltrips">
//               <button className="btn btn-primary rounded-full px-6 shadow-lg hover:scale-105 transition-transform duration-300">
//                 Browse Packages
//               </button>
//             </Link>
//           </div>

//           {/* Video Section */}
//           <div className="rounded-xl overflow-hidden shadow-2xl">
//             <video
//               src={overviewVideo}
//               controls
//               className="w-full h-auto rounded-xl border-2 border-primary"
//               preload="metadata"
//             />
//           </div>
     


//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default OverviewSection;



// src/pages/Home/Home.jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import overviewVideo from "../../assets/overview.mp4"; // replace with actual video

const OverviewSection = () => {
  return (
    <section className=" py-20 bg-gradient-to-r from-pink-100 via-blue-100 to-purple-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
        >
          {/* Text Content */}
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-extrabold text-primary leading-tight">
              🌍 Explore the World with Us
            </h2>
            <p className="text-lg text-base-content/80 leading-relaxed">
              From mountains to beaches, we connect you with unforgettable journeys
              and passionate local guides. Discover curated trips, unique cultures, and
              once-in-a-lifetime adventures — all in one place.
            </p>

            <Link to="/Alltrips">
            
              <button className=" bg-gradient-to-r from-purple-500 to-indigo-600 text-white
                                  hover:from-indigo-600 hover:to-purple-500 mt-4 btn-sm rounded-full px-5 py-2 shadow-lg
                                  transition-colors duration-300 cursor-pointer flex items-center gap-2">
                Browse Packages
                <FaArrowRight />
              </button>
            </Link>
          </div>

          {/* Video Section */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4 }}
            className="rounded-2xl overflow-hidden shadow-xl border border-primary"
          >
            <video
              src={overviewVideo}
              controls
              className="w-full h-auto object-cover rounded-2xl"
              preload="metadata"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default OverviewSection;
