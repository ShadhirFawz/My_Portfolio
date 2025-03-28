import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FaPhoneAlt, FaHandPointer } from "react-icons/fa";

const PhoneReveal = () => {
  const phoneNumber = "+94 760431665"; // Actual phone number
  const [hovered, setHovered] = useState(false);
  const [progress, setProgress] = useState(0); // Tracks how much of the number is revealed
  const [glowEffect, setGlowEffect] = useState("none");

  useEffect(() => {
    if (progress > 0) {
      setGlowEffect("0px 0px 20px rgba(0, 200, 255, 0.6)"); // Apply glow effect
    } else {
      setGlowEffect("none"); // Remove glow when not hovered
    }
  }, [progress]);

  const handleMouseMove = (e) => {
    if (!hovered) return;

    const boundingBox = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - boundingBox.left; // Get cursor position relative to div
    const percentage = Math.min(1, Math.max(0, (mouseX / boundingBox.width) * 1.05)); // Adjust scaling

    setProgress(percentage); // Update progress based on mouse movement
  };

  return (
    <div 
      className="relative mt-[-250px] flex items-center w-[370px] h-[48px] overflow-visible bg-gray-900 p-0 rounded-lg opacity-70 z-50"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setProgress(0); }} // Reset on leave
      onMouseMove={handleMouseMove}
    >
      {/* Phone Number (Revealed One by One with Glow Effect) */}
      <div 
        className="absolute left-4 text-white font-extralight text-lg tracking-wide select-none"
        style={{ 
          clipPath: `inset(0 ${100 - progress * 100}% 0 0)`, // Reveal effect
          boxShadow: glowEffect, // Dynamic Glow Effect
          transition: "box-shadow 0.3s ease-in-out !important", // Smooth transition
          fontFamily: "sans-serif",
        }}
      >
        {phoneNumber}
      </div>

      {/* Phone Icon (Moves as Cursor) */}
      <motion.div
        className="relative z-10 px-6 py-3 text-lg font-medium bg-blue-950 rounded-lg shadow-md border border-blue-950 text-gray-100 transition-all duration-300 flex items-center"
        style={{ left: `${progress * 80}%` }} // Moves with cursor, reduced gap
      >
        <FaPhoneAlt className="text-white w-6 h-5" />
      </motion.div>

      {/* Cursor Pointer Symbol (Only appears if not fully revealed) */}
      <motion.div
        className="absolute right-3 text-gray-400 text-2xl select-none pointer-events-none"
        initial={{ opacity: 1 }}
        animate={{ opacity: progress > 0.9 ? 0 : 1 }} // Hide when almost fully revealed
        transition={{ duration: 0.5 }}
      >
        <FaHandPointer className="text-white w-6 h-5.5" />
      </motion.div>
    </div>
  );
};

export default PhoneReveal;
