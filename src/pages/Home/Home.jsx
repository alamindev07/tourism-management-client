import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Autoplay } from 'swiper/modules';
import banner1 from '../../assets/banner1.jpg';
import banner2 from '../../assets/banner2.jpg';
import OverviewSection from '../../components/HomSections/OverviewSection';

const Home = () => {
  return (
    <div className="space-y-20">
      {/* === Banner Section === */}
      <section className="relative">
        <Swiper
          navigation
          autoplay={{ delay: 3000 }}
          modules={[Navigation, Autoplay]}
          className="h-[70vh] w-full"
        >
          {[banner1, banner2].map((img, idx) => (
            <SwiperSlide key={idx}>
              <div
                className="h-[70vh] bg-cover bg-center relative"
                style={{ backgroundImage: `url(${img})` }}
              >
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center text-white space-y-4"
                  >
                    <h1 className="text-4xl md:text-6xl font-bold">
                      Explore the World With Us
                    </h1>
                    <p className="text-lg max-w-xl mx-auto">
                      Discover breathtaking places and experience amazing adventures.
                    </p>
                  </motion.div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    {/* === overview Section === */}
      <OverviewSection />
    </div>
  );
};

export default Home;
