// src/pages/About/TypingAnimation.jsx
import React from "react";
import Typical from "react-typical";

const TypingAnimation = ({ steps = [], loop = Infinity, className = "" }) => {
  if (!Array.isArray(steps) || steps.length === 0) return null;
  return (
    <Typical
      steps={steps}
      loop={loop}
      wrapper="span"
      className={className}
    />
  );
};

export default TypingAnimation;
