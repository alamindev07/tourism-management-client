


import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import PackagesSection from "./PackagesSection";
import { useQuery } from "@tanstack/react-query";
import TourGuideCard from "../../components/HomSections/TourGuideCard";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useState } from "react";

const TourismGuideSection = () => {
  const axiosSecure = useAxiosSecure();
  const [tabIndex, setTabIndex] = useState(0);

  const { data: tourGuides = [], isLoading } = useQuery({
    queryKey: ["randomTourGuides"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/users/role/tourguide/random?count=6");
      return res.data;
    },
  });

  return (
    <section className="px-4 md:px-10 py-10 bg-gradient-to-br from-indigo-950 via-orange-900 to-indigo-900 text-white">
      {/* bg-gradient-to-br from-indigo-950 via-purple-900 to-indigo-900 */}
      <h2 className="text-3xl font-bold text-center mb-10">
        Tourism and Travel Guide
      </h2>

      <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
        <TabList className="flex justify-center flex-wrap gap-4 sm:gap-6 mb-8 border-b border-purple-700">
          {["Our Packages", "Meet Our Tour Guides"].map((label, index) => (
            <Tab
              key={label}
              className={`cursor-pointer relative px-5 py-2 rounded-t-lg text-lg font-medium transition-all duration-300 ${
                tabIndex === index
                  ? "text-white bg-purple-700 shadow-md"
                  : "text-purple-300 hover:text-white hover:bg-purple-600"
              }`}
            >
              {label}
              {tabIndex === index && (
                <div className="absolute bottom-0 left-0 w-full h-[3px] bg-pink-400 rounded-full animate-pulse"></div>
              )}
            </Tab>
          ))}
        </TabList>

        <TabPanel>
          <PackagesSection />
        </TabPanel>

        <TabPanel>
          {isLoading ? (
            <div className="text-center py-10 text-purple-200">Loading tour guides...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {tourGuides.map((guide) => (
                <TourGuideCard key={guide._id} guide={guide} />
              ))}
            </div>
          )}
        </TabPanel>
      </Tabs>
    </section>
  );
};

export default TourismGuideSection;
