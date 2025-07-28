// src/pages/About/TypingAnimation.jsx
import React from "react";
import { Typewriter } from "react-simple-typewriter";


const TypingAnimation = ({ steps = [], loop = Infinity, className = "" }) => {
  if (!Array.isArray(steps) || steps.length === 0) return null;
  return (
    <Typewriter
      steps={steps}
      loop={loop}
      wrapper="span"
      className={className}
    />
  );
};

export default TypingAnimation;
