import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import PackagesSection from "./PackagesSection";
import { useQuery } from "@tanstack/react-query";
import TourGuideCard from "../../components/HomSections/TourGuideCard";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const TourismGuideSection = () => {
  const axiosSecure = useAxiosSecure();

  const { data: tourGuides = [], isLoading } = useQuery({
    queryKey: ["randomTourGuides"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users/role/tourguide/random?count=6");
      return res.data;
    },
  });

  return (
    <section className="px-4 md:px-10 py-10 bg-base-100">
      <h2 className="text-3xl font-bold text-center mb-6">
        Tourism and Travel Guide
      </h2>

      <Tabs>
        <TabList className="flex justify-center gap-6 mb-6 border-b">
          <Tab className="tab tab-bordered">Our Packages</Tab>
          <Tab className="tab tab-bordered">Meet Our Tour Guides</Tab>
        </TabList>

        <TabPanel>
          <PackagesSection />
        </TabPanel>

        <TabPanel>
          {isLoading ? (
            <div className="text-center">Loading tour guides...</div>
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
