import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation, Link } from "react-router-dom";
import { FaCode, FaEnvelope, FaUser, FaEnvelopeOpen, FaAngleLeft, FaAngleRight } from "react-icons/fa";

const Sidebar = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isEnvelopeHovered, setIsEnvelopeHovered] = useState(false);
  const [isTechHovered, setIsTechHovered] = useState(false);
  const [showCodeIcon, setShowCodeIcon] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [animateBrackets, setAnimateBrackets] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isMobile) return null;

  return (
    <div
      className="fixed top-0 right-0 h-full w-2/8 z-50"
      onMouseEnter={() => setIsSidebarOpen(true)}
      onMouseLeave={() => setIsSidebarOpen(false)}
    >
      {/* Border Animation */}
      <svg className="absolute top-1/4 right-5 w-20 h-80" viewBox="0 0 98 400">
        <motion.rect
          x="6"
          y="5"
          width="85"
          height="395"
          rx="50"
          ry="50"
          fill="none"
          stroke="rgba(255,255,255,0.5)"
          strokeWidth="4"
          strokeDasharray="1000"
          initial={{ strokeDashoffset: 1000 }}
          animate={{
            strokeDashoffset: isHovered || isSidebarOpen ? 0 : 1000,
          }}
          transition={{
            duration: 1,
            ease: "easeInOut",
          }}
        />
      </svg>

      {/* Sidebar Panel */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: isSidebarOpen ? "0%" : "100%" }}
        transition={{ type: "spring", stiffness: 120 }}
        className="fixed top-1/4 right-5 h-80 w-18 bg-gray-900 rounded-full flex flex-col items-center justify-center space-y-8 shadow-lg border-1 border-b-blue-200"
      >
        {/* Home */}
        <motion.div
          whileHover={{ rotateY: 180 }}
          transition={{ duration: 0.7 }}
        >
          <Link
            to="/"
            className="text-white text-3xl hover:text-blue-400 transition"
          >
            <FaUser className="w-8 h-8 text-fuchsia-300 hover:text-blue-400 lg:rounded-2xl" />
          </Link>
        </motion.div>

        <div className="flex justify-center items-center">
          <div className="w-1 h-1 bg-white rounded-full opacity-90"></div>
        </div>

        {/* Tech */}
        <Link
          to={location.pathname === "/tech" ? "#" : "/tech"}
          className={`text-white text-3xl transition ${location.pathname === "/tech" ? "opacity-50 cursor-default pointer-events-none" : "hover:text-blue-400"}`}
          onMouseEnter={() => {
            if (!hasAnimated && location.pathname !== "/tech") {
              setShowCodeIcon(false);
              setAnimateBrackets(true);
              setHasAnimated(true);
              setTimeout(() => {
                setShowCodeIcon(true);
                setAnimateBrackets(false);
              }, 500);
            }
          }}
          onMouseLeave={() => setHasAnimated(false)}
        >
          {location.pathname === "/tech" ? (
            <FaCode className="w-8 h-8 text-fuchsia-300 opacity-50" />
          ) : animateBrackets ? (
            <motion.div className="flex items-center">
              <motion.span
                className="mr-2"
                initial={{ x: 0 }}
                animate={{ x: -10 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <FaAngleLeft className="w-6 h-6 text-fuchsia-300" />
              </motion.span>
              <motion.span
                className="ml-2"
                initial={{ x: 0 }}
                animate={{ x: 10 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <FaAngleRight className="w-6 h-6 text-fuchsia-300" />
              </motion.span>
            </motion.div>
          ) : (
            <FaCode className="w-8 h-8 text-fuchsia-300 hover:text-blue-400 lg:rounded-full" />
          )}
        </Link>

        <div className="flex justify-center items-center">
          <div className="w-1 h-1 bg-white rounded-full opacity-90"></div>
        </div>

        {/* Contact */}
        <Link
          to={location.pathname === "/contact" ? "#" : "/contact"}
          className={`text-white text-3xl transition ${location.pathname === "/contact" ? "opacity-50 cursor-default pointer-events-none" : "hover:text-blue-400"}`}
          onMouseEnter={() => location.pathname !== "/contact" && setIsEnvelopeHovered(true)}
          onMouseLeave={() => location.pathname !== "/contact" && setIsEnvelopeHovered(false)}
        >
          {isEnvelopeHovered ? (
            <FaEnvelopeOpen className="w-8 h-8 text-fuchsia-300 hover:text-blue-400" />
          ) : (
            <FaEnvelope className="w-8 h-8 text-fuchsia-300 hover:text-blue-400" />
          )}
        </Link>
      </motion.div>
    </div>
  );
};

export default Sidebar;
