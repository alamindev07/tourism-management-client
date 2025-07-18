
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Autoplay } from 'swiper/modules';

import OverviewSection from '../../components/HomSections/OverviewSection';
import Banner from '../../components/HomSections/Banner';
import PackagesSection from './PackagesSection';
import TourismGuideSection from './TourismGuideSection';
// import PackagesSection from './PackagesSection';

const Home = () => {
  return (
    <div className="space-y-10">
    {/* === Banner Section === */}
      <Banner />
    {/* === overview Section === */}
      <OverviewSection />
    {/* === package Section === */}
   <TourismGuideSection></TourismGuideSection>


    </div>
  );
};

export default Home;
