
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Autoplay } from 'swiper/modules';

import OverviewSection from '../../components/HomSections/OverviewSection';
import Banner from '../../components/HomSections/Banner';

const Home = () => {
  return (
    <div className="space-y-10">
    {/* === Banner Section === */}
      <Banner />
    {/* === overview Section === */}
      <OverviewSection />
   


    </div>
  );
};

export default Home;
