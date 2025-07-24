

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import { useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import "swiper/css";
import "swiper/css/navigation";
import banner1 from "../../assets/banner1.jpg";
import banner2 from "../../assets/banner2.jpg";
import { ChevronDown } from "lucide-react"; // 👈 Optional scroll icon

const bannerSlides = [
  {
    image: banner1,
    titleWords: ["Explore the World", "Travel with Joy", "Feel the Freedom"],
    titleColor: "text-yellow-300",
    subtitle:
      "Discover breathtaking places and experience unforgettable journeys with us.",
    subtitleColor: "text-white",
    buttonText: "Start Exploring",
    buttonLink: "/Alltrips",
    buttonBg: "bg-yellow-400",
    buttonTextColor: "text-black",
    typeSpeed: 80,
    deleteSpeed: 50,
    delaySpeed: 1200,
  },
  {
    image: banner2,
    titleWords: ["Adventure Awaits", "Unlock Hidden Gems", "Dare to Dream"],
    titleColor: "text-green-300",
    subtitle:
      "Experience the thrill of discovery and unlock destinations like never before.",
    subtitleColor: "text-white/90",
    buttonText: "Show All Trips",
    buttonLink: "/Alltrips",
    buttonBg: "bg-green-500",
    buttonTextColor: "text-white",
    typeSpeed: 60,
    deleteSpeed: 40,
    delaySpeed: 1600,
  },
];

const Banner = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative">
      <Swiper
        navigation
        autoplay={{ delay: 5000 }}
        loop
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        modules={[Navigation, Autoplay]}
        className="h-[70vh] w-full"
      >
        {bannerSlides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="h-[70vh] md:h-[80vh] bg-cover bg-center relative"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              {/* === Animated Overlay === */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="absolute inset-0 bg-black/60"
              />

              {/* === Text Layer === */}
              <div className="absolute inset-0 flex items-center justify-center px-4">
                {activeIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center space-y-6 max-w-3xl mx-auto"
                  >
                    {/* Auto Typing Title */}
                    <motion.h1
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                      className={`text-3xl sm:text-4xl md:text-5xl font-bold h-[4rem] ${slide.titleColor}`}
                    >
                      <Typewriter
                        words={slide.titleWords}
                        loop
                        cursor
                        cursorStyle="_"
                        typeSpeed={slide.typeSpeed}
                        deleteSpeed={slide.deleteSpeed}
                        delaySpeed={slide.delaySpeed}
                      />
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                      className={`text-base sm:text-lg px-2 md:px-0 ${slide.subtitleColor}`}
                    >
                      {slide.subtitle}
                    </motion.p>

                    {/* Button */}
                    <motion.a
                      href={slide.buttonLink}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.7, duration: 0.4 }}
                      className={`inline-block font-semibold px-6 py-3 rounded-full shadow-md hover:opacity-90 transition duration-300 ${slide.buttonBg} ${slide.buttonTextColor}`}
                    >
                      {slide.buttonText}
                    </motion.a>
                  </motion.div>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* === Scroll Down Indicator === */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
      >
        <ChevronDown className="w-8 h-8 text-white animate-bounce" />
      </motion.div>
    </section>
  );
};

export default Banner;
