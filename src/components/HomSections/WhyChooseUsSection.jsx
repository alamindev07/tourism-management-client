import { motion } from "framer-motion";

const WhyChooseUsSection = () => {
  const features = [
    { icon: "🌍", title: "Expert Tour Guides", desc: "Professional and experienced guides to enhance your travel experience." },
    { icon: "💰", title: "Best Price Guarantee", desc: "We ensure you get the best value for every booking." },
    { icon: "⏱", title: "24/7 Support", desc: "Round-the-clock assistance for your travel queries and emergencies." },
    { icon: "⭐", title: "Trusted by 10k+ Travelers", desc: "Join thousands of happy travelers who trust our service." }
  ];

  return (
    <div className="px-4 md:px-10 lg:px-20 py-12 bg-gray-50">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold text-center mb-10"
      >
        Why Choose Us?
      </motion.h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((item, index) => (
          <motion.div 
            key={index} 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.2, type: "spring" }}
            className="bg-white shadow rounded-xl p-6 text-center hover:shadow-lg transition"
          >
            <div className="text-4xl mb-4">{item.icon}</div>
            <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
            <p className="text-gray-600 text-sm">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default WhyChooseUsSection;
