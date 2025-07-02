import React from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

const AnimatedSquares = ({ isMobile }) => {

  if (isMobile) {
    return null;
  }
  
  const maxWidth = isMobile ? 200 : 500;
  const x = useMotionValue(0);
  const lineWidth = useTransform(x, [-10, maxWidth], [0, maxWidth]);

  

  return (
    <div style={{ position: "relative", height: "auto" }}>
      {/* Line that draws as square moves */}
      <motion.div
        style={{
          position: "absolute",
          top: isMobile ? "3px" : "5px",
          height: "2px",
          whiteSpace: "nowrap",
          display: "inline-block",
          backgroundColor: "#1e5c94",
          width: lineWidth,
          maxWidth: `${maxWidth}px`,
        }}
      />

      {/* Moving squares container */}
      <motion.div
        style={{
          position: "relative",
          width: isMobile ? "16px" : "20px",
          height: isMobile ? "16px" : "20px",
          margin: isMobile ? "7px" : "9px",
          bottom: isMobile ? "20px" : "25px",
          x,
        }}
        animate={{ x: [-10, maxWidth - 50] }} // Adjusted for mobile
        transition={{
          duration: 1.5,
          ease: "easeOut",
          repeat: 0,
        }}
        onAnimationComplete={() => {
          x.set(maxWidth - 50);
        }}
      >
        {/* Blue Square */}
        <motion.div
          style={{
            position: "absolute",
            width: isMobile ? "6px" : "8px",
            height: isMobile ? "6px" : "8px",
            top: "0",
            left: "0",
            backgroundColor: "#3b82f6",
            transformOrigin: "center center",
          }}
          animate={{
            rotate: [0, 90, 180, 270, 360],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* White Square */}
        <motion.div
          style={{
            position: "absolute",
            width: isMobile ? "6px" : "8px",
            height: isMobile ? "6px" : "8px",
            top: isMobile ? "8px" : "10px",
            left: isMobile ? "8px" : "10px",
            backgroundColor: "#ffffff",
            transformOrigin: "center center",
          }}
          animate={{
            rotate: [0, 90, 180, 270, 360],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </motion.div>
    </div>
  );
};

export default AnimatedSquares;