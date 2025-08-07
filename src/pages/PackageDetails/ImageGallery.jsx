import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react"; 
const GallerySection = ({ pkg }) => {
  const galleryItems = pkg?.images || [];
  const [selectedImage, setSelectedImage] = useState(null);

  if (!galleryItems.length) {
    return (
      <div className="p-4 text-center text-gray-500">No images available</div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-12">Gallery</h2>

      {/* --- Custom Grid Layout --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 lg:grid-rows-2 gap-4">
        <div
          className="lg:col-span-2 lg:row-span-2 relative rounded-xl overflow-hidden shadow-lg cursor-pointer group"
          onClick={() => setSelectedImage(galleryItems[0])}
        >
          <img
            src={galleryItems[0]}
            alt="gallery-1"
            className="w-full h-full object-cover transform transition duration-500 group-hover:scale-110"
          />
        </div>
        <div
          className="lg:col-span-2 relative rounded-xl overflow-hidden shadow-lg cursor-pointer group"
          onClick={() => setSelectedImage(galleryItems[1])}
        >
          <img
            src={galleryItems[1]}
            alt="gallery-2"
            className="w-full h-full object-cover transform transition duration-500 group-hover:scale-110"
          />
        </div>
        <div
          className="lg:col-span-2 relative rounded-xl overflow-hidden shadow-lg cursor-pointer group"
          onClick={() => setSelectedImage(galleryItems[2])}
        >
          <img
            src={galleryItems[2]}
            alt="gallery-3"
            className="w-full h-full object-cover transform transition duration-500 group-hover:scale-110"
          />
        </div>
        <div
          className="lg:col-span-2 relative rounded-xl overflow-hidden shadow-lg cursor-pointer group"
          onClick={() => setSelectedImage(galleryItems[3])}
        >
          <img
            src={galleryItems[3]}
            alt="gallery-4"
            className="w-full h-full object-cover transform transition duration-500 group-hover:scale-110"
          />
        </div>
        {galleryItems[4] && (
          <div
            className="lg:col-span-2 lg:row-span-2 flex items-center justify-center cursor-pointer"
            onClick={() => setSelectedImage(galleryItems[4])}
          >
            <div className="w-56 h-56 rounded-full overflow-hidden shadow-lg group relative">
              <img
                src={galleryItems[4]}
                alt="gallery-5"
                className="w-full h-full object-cover transform transition duration-500 group-hover:scale-110"
              />
            </div>
          </div>
        )}
      </div>

      {/* --- Image Zoom Modal --- */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Close Button */}
            <button
              className="absolute top-6 right-6 bg-white/80 hover:bg-white text-black rounded-full p-2 shadow-lg"
              onClick={() => setSelectedImage(null)}
            >
              <X size={24} />
            </button>

            <motion.img
              src={selectedImage}
              alt="Zoomed"
              className="max-w-4xl w-full max-h-[90vh] object-contain rounded-xl"
              initial={{ scale: 0.7 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.7 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GallerySection;
