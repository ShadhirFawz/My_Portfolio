import { motion } from "framer-motion";
import { useState } from "react";

const GlitchText = ({ text, className }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.span
      className={`relative inline-block ${className} ${isHovered ? "glitch" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {text}
      <style jsx>{`
        .glitch {
          position: relative;
          animation: ${isHovered ? "glitch-skew 1s infinite linear alternate-reverse" : "none"};
        }
        .glitch::before,
        .glitch::after {
          content: "${text}";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
        }
        .glitch::before {
          color: #00ffff;
          animation: ${isHovered ? "glitch-before 1s infinite" : "none"};
          transform: translate(-2px, 2px);
        }
        .glitch::after {
          color: #ff00ff;
          animation: ${isHovered ? "glitch-after 0.8s infinite" : "none"};
          transform: translate(2px, -2px);
        }
        @keyframes glitch-skew {
          0% { transform: skew(0deg); }
          10% { transform: skew(2deg); }
          20% { transform: skew(-2deg); }
          30% { transform: skew(1deg); }
          40% { transform: skew(-1deg); }
          50% { transform: skew(0deg); }
          100% { transform: skew(0deg); }
        }
        @keyframes glitch-before {
          0% { opacity: 0; }
          10% { opacity: 0.8; transform: translate(-2px, 2px); }
          20% { opacity: 0; }
          30% { opacity: 0.6; transform: translate(-4px, 4px); }
          50% { opacity: 0; }
          100% { opacity: 0; }
        }
        @keyframes glitch-after {
          0% { opacity: 0; }
          15% { opacity: 0.7; transform: translate(2px, -2px); }
          25% { opacity: 0; }
          35% { opacity: 0.5; transform: translate(4px, -4px); }
          50% { opacity: 0; }
          100% { opacity: 0; }
        }
      `}</style>
    </motion.span>
  );
};

export default GlitchText;