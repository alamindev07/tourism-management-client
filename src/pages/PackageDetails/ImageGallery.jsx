
import { useState, useEffect } from "react";

const ImageGallery = ({ pkg }) => {
  const images = pkg?.images || [];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Auto-slide every 3 seconds
  useEffect(() => {
    if (!images.length) return;
    const interval = setInterval(() => {
      setSelectedIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  if (!images.length) {
    return <div className="p-4 text-center text-gray-500">No images available</div>;
  }

  return (
    <div className="flex flex-col items-center">
      {/* Main Image */}
      <div
        className="w-full max-w-4xl h-80 mb-4 cursor-zoom-in relative"
        onClick={() => setLightboxOpen(true)}
      >
        <img
          src={images[selectedIndex]}
          alt="Selected"
          className="w-full h-full object-cover rounded-lg shadow-md transition-all duration-300"
        />
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 text-sm rounded">
          Click to zoom
        </div>
      </div>

      {/* Thumbnail list */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Thumb-${index}`}
            className={`w-20 h-20 object-cover rounded-md cursor-pointer border-2 ${
              selectedIndex === index ? "border-blue-500" : "border-transparent"
            }`}
            onClick={() => setSelectedIndex(index)}
          />
        ))}
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
          <img
            src={images[selectedIndex]}
            alt="Full Screen"
            className="max-w-full max-h-full rounded-lg"
          />
          <button
            className="absolute top-5 right-5 text-white text-3xl font-bold"
            onClick={() => setLightboxOpen(false)}
          >
            &times;
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
