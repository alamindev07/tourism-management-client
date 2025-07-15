import React from "react";

const LoadingSpinner = ({
  size = 64,
  color = "rgba(255, 255, 255, 0.8)",
  borderWidth = 4,
  speed = "1s",
}) => {
  const spinnerStyle = {
    width: `${size}px`,
    height: `${size}px`,
    borderTop: `${borderWidth}px solid ${color}`,
    borderRight: `${borderWidth}px solid transparent`,
    animation: `spin ${speed} linear infinite`,
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#1e1e2f] to-[#2a2a4f]">
      <div className="relative">
        {/* Blurred Ring */}
        <div className="absolute inset-0 rounded-full animate-pulse"
             style={{
               background: 'radial-gradient(circle, rgba(255,255,255,0.1), transparent)',
               filter: 'blur(4px)',
             }}></div>

        {/* Spinner */}
        <div
          className="rounded-full border-solid"
          style={spinnerStyle}
        ></div>
      </div>

      {/* Optional Label */}
      {/* <p className="ml-4 text-white text-lg animate-pulse">Loading...</p> */}
    </div>
  );
};

export default LoadingSpinner;
