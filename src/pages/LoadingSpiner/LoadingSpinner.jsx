

import React from "react";

const LoadingSpinner = ({ size = 80, speed = "1s" }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-purple-100 to-blue-200">
      <div
        className={`relative`}
        style={{ width: `${size}px`, height: `${size}px` }}
      >
        {/* Glowing Outer Ring with moving */}
        <div
          className="absolute inset-0 rounded-full animate-pulse"
          style={{
            background:
              "radial-gradient(circle, rgba(124,58,237,0.2), transparent)",
            filter: "blur(6px)",
          }}
        ></div>

        {/* Spinner Ring */}
        <div
          className={`animate-spin rounded-full border-[6px] border-t-transparent border-b-transparent border-l-purple-500 border-r-blue-500`}
          style={{
            width: `${size}px`,
            height: `${size}px`,
            animationDuration: speed,
          }}
        ></div>

        {/* Inner Glow Circle */}
        <div
          className="absolute inset-3 rounded-full bg-white/60 backdrop-blur-[2px]"
          style={{
            boxShadow: "inset 0 0 8px rgba(255,255,255,0.3)",
          }}
        ></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
