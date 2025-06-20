import React from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

const AnimatedSquares = () => {
  const x = useMotionValue(0);
  const lineWidth = useTransform(x, [-10, 400], [0, 400]);

  return (
    <div style={{ position: "relative", height: "auto" }}>
      {/* Line that draws as square moves */}
      <motion.div
        style={{
          position: "absolute",
          top: "5px",
          left: "9px",
          height: "2px",
          whiteSpace: "nowrap",
          display: "inline-block",
          backgroundColor: "#1e5c94",
          width: lineWidth,
        }}
      />

      {/* Moving squares container */}
      <motion.div
        style={{
          position: "relative",
          width: "20px",
          height: "20px",
          margin: "9px",
          bottom: "25px",
          x,
        }}
        animate={{ x: [-10, 390] }}
        transition={{
          duration: 1.5,
          ease: "easeOut",
          repeat: 0,
        }}
        onAnimationComplete={() => {
          x.set(390);
        }}
      >
        {/* Blue Square */}
        <motion.div
          style={{
            position: "absolute",
            width: "8px",
            height: "8px",
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
            width: "8px",
            height: "8px",
            top: "10px",
            left: "10px",
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