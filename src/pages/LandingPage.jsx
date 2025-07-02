import { motion, useReducedMotion } from "framer-motion";
import { useRef, useState, useMemo, useEffect } from "react";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import Github from "../assets/images/github-logo.png";
import Gmail from "../assets/images/gmail-logo.png";
import LinkedIn from "../assets/images/linkedin-logo.png";
import { ComplexNavbar } from "../components/Navbar";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import AnimatedSquares from "../components/SquareWheel";
import RotatingCard from "../components/RotatingCard";
import FloatingCodeSnippets from "../components/FloatingCodeSnippets";
import GlitchText from "../components/GlitchText";
import TechStackScroll from "../components/TechStackScroll";
import AnimatedTitle from "../components/AnimatedTitle";

const LandingPage = () => {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const shouldReduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [clickedIndex, setClickedIndex] = useState(null);
  const [showText, setShowText] = useState(false);
  const pageRef = useRef(null);
  const [pageHeight, setPageHeight] = useState(0);
  const [trailPoints, setTrailPoints] = useState([]);
  const [isMoving, setIsMoving] = useState(false);

  useEffect(() => {
    let rafId;
    let stopTimeout;

    const handleMouseMove = (e) => {
      if (!shouldReduceMotion) {
        if (!isMoving) {
          setTrailPoints([]); // Reset trail on new move
        }
        setIsMoving(true);
        const now = Date.now();
        const newPoint = {
          id: now + Math.random(),
          x: e.clientX,
          y: e.clientY,
          timestamp: now,
        };
        setTrailPoints((prev) => {
          const updated = [...prev, newPoint].slice(-20); // Limit to 20 points
          return updated;
        });
        setMousePosition({ x: e.clientX, y: e.clientY });

        clearTimeout(stopTimeout);
        stopTimeout = setTimeout(() => {
          setIsMoving(false);
          setTrailPoints((prev) => prev.map((p) => ({ ...p, fading: true })));
          setTimeout(() => setTrailPoints([]), 300); // Clear after fade
        }, 100);
      }
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setPageHeight(pageRef.current?.clientHeight || window.innerHeight);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    let timeout1, timeout2;
    const animateText = () => {
      setShowText(true);
      timeout1 = setTimeout(() => {
        setShowText(false);
        timeout2 = setTimeout(animateText, 1500);
      }, 2000);
    };
    animateText();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      document.body.style.overflow = "auto";
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      clearTimeout(stopTimeout);
      cancelAnimationFrame(rafId);
    };
  }, [isDrawerOpen, shouldReduceMotion]);

  const handleClick = (e, index, link) => {
    e.preventDefault(); // Prevent instant navigation
    setClickedIndex(index); // Mark the clicked link

    setTimeout(() => {
      window.location.href = `/${link.toLowerCase()}`;
      setClickedIndex(null); // Reset after navigation
    }, 500);
  };

  return (
    <div className="fixed inset-0 overflow-y-auto">
      <div
        className={`relative flex flex-col items-center justify-center w-full min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 p-6 pt-[100px] 
          ${isDrawerOpen ? "pointer-events-none" : ""}`} // ⬅️ Disables all interactions when drawer is open
      >
        <Sidebar />
        {/* Navbar & Drawer */}
        <nav className="fixed top-0 left-0 w-full flex justify-between items-center p-6 bg-transparent bg-opacity-90 backdrop-blur-md max-w-screen-2xl mx-auto z-50">
          <div className="relative flex items-center">
            <div className="relative overflow-hidden">
              <h1
                className="text-white text-2xl font-bold font-serif cursor-auto relative mt-2 md:mt-0"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                style={{ fontFamily: "cursive" }}
              >
                ShaD_F
              </h1>
              <motion.div
                className="absolute left-0 bottom-0 h-[2px] bg-blue-400"
                initial={{ width: 0 }}
                animate={hovered && !shouldReduceMotion ? { width: "60px" } : { width: 0 }}
                transition={{ duration: 1 }}
              />
            </div>
            <motion.span
              className="text-blue-400 text-2xl font-bold ml-2 font-cursive overflow-hidden relative"
              initial={{ width: 0 }}
              animate={hovered && !shouldReduceMotion ? { width: "auto" } : { width: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              style={{
                fontFamily: "serif",
                fontSize: 25,
                whiteSpace: "nowrap",
                display: "inline-block",
              }}
            >
              SHADHIR FAWZ
            </motion.span>
          </div>
          {isMobile ? (
            <button
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
              className="text-white fixed z-[100] bg-gray-900 rounded-full shadow-lg pointer-events-auto" // ⬅️ `z-[100]` ensures it's above everything
              style={{
                top: "5%",
                right: Math.min(window.innerWidth * 0.05, 20) + "px",
                width: Math.max(window.innerWidth * 0.1, 55) + "px",
                height: Math.max(window.innerWidth * 0.1, 55) + "px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {isDrawerOpen ? <XMarkIcon className="w-12 h-12" /> : <Bars3Icon className="w-12 h-12" />}
            </button>
          ) : (
            <ComplexNavbar />
          )}
        </nav>

        {/* Mobile Drawer with Navigation Links */}
        {isMobile && isDrawerOpen && (
          <motion.div
            initial={{ x: -150 }}
            animate={shouldReduceMotion ? { x: 0 } : { x: 0 }}
            exit={{ x: -50 }}
            className="absolute top-0 left-0 w-2/4 h-screen bg-black bg-opacity-90 p-6 flex flex-col items-start z-40 space-y-4 pointer-events-auto"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-800 via-transparent to-transparent opacity-50 rounded-full w-[700px] h-[600px] -top-10 -left-36"></div>

            {/* Nav Links */}
            <div className="flex flex-col space-y-6 mt-25">
              {["Portfolio", "Projects", "Contact"].map((text, index) => (
                <a
                  key={index}
                  href={`/${text.toLowerCase()}`}
                  className="relative text-gray-300 text-lg font-semibold font-serif py-2 px-8 w-full rounded-lg transition-all duration-300 hover:text-blue-400 hover:scale-105 overflow-visible block z-1"
                  onClick={(e) => handleClick(e, index, text)}
                >
                  <motion.div
                    className="absolute left-0 top-0 h-full bg-blue-500 opacity-20 border rounded-l-xl"
                    initial={{ width: "0%" }}
                    animate={clickedIndex === index && !shouldReduceMotion ? { width: "100%" } : {}}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  />
                  <span className="relative z-10 text-amber-50 font-serif">{text}</span>
                </a>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex justify-center w-full mt-auto space-x-6 pb-6">
              <a href="https://www.linkedin.com/in/shadhir-fawz-30739730a/" target="_blank" rel="noopener noreferrer" className="bg-gray-800 text-white p-2 rounded-lg text-3xl transition-all duration-300 hover:bg-emerald-950">
                <FaLinkedin />
              </a>
              <a href="mailto:ShadhirFawz19@gmail.com" className="bg-gray-800 text-white p-2 rounded-lg text-3xl transition-all duration-300 hover:bg-emerald-950">
                <FaEnvelope />
              </a>
              <a href="https://github.com/ShadhirFawz" target="_blank" rel="noopener noreferrer" className="bg-gray-800 text-white p-2 rounded-lg text-3xl transition-all duration-300 hover:bg-emerald-950">
                <FaGithub />
              </a>
            </div>
          </motion.div>
        )}
          <FloatingCodeSnippets />
          <TechStackScroll pageHeight={pageHeight} />
        {/* Background effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(50, 150, 255, 0.2), rgba(0, 0, 0, 0.7))`,
          }}
          transition={{ duration: 0.3 }}
        />
        <motion.svg
          className="absolute inset-0 pointer-events-none"
          style={{ width: '100%', height: '100%' }}
          initial={{ opacity: 1 }}
          animate={{ opacity: isMoving ? 1 : 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <defs>
            <linearGradient id="swordGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: 'rgba(0, 150, 255, 0.8)', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: 'rgba(0, 150, 255, 0.2)', stopOpacity: 0.2 }} />
            </linearGradient>
          </defs>
          <motion.path
            d={trailPoints.length > 1 ? `M ${trailPoints[0].x},${trailPoints[0].y} ${trailPoints.slice(1).map((p) => `L ${p.x},${p.y}`).join(' ')}` : ''}
            stroke="url(#swordGradient)"
            strokeWidth={trailPoints.length > 1 ? `10 ${trailPoints.slice(1).map((_, i) => Math.max(10 - (i + 1) * (8 / (trailPoints.length - 1)), 2)).join(' ')}` : '10'}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 1, strokeDashoffset: 0 }}
            animate={{ pathLength: isMoving ? 1 : 0, strokeDashoffset: isMoving ? 0 : 1 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />
          <circle
            cx={trailPoints.length > 0 ? trailPoints[0].x : 0}
            cy={trailPoints.length > 0 ? trailPoints[0].y : 0}
            r="5"
            fill="rgba(0, 150, 255, 0.8)"
          />
        </motion.svg>
        
        {/* Content Container */}
        <div
          className="relative z-10 flex flex-col md:flex-row items-center justify-center w-full max-w-screen-6xl px-6 md:px-32 text-center md:text-left min-h-[80vh] md:min-h-[70vh]"
        >
          <style>{`.max-h-96::-webkit-scrollbar { display: none; }`}</style>
          <div className="w-full md:w-1/2 space-y-10 flex flex-col items-center md:items-start">
            <motion.h1
              className="text-2xl md:text-5xl font-extrabold text-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={{ fontFamily: "serif" }}
            >
              Hello, I'm <GlitchText text="Shadhir" className="text-blue-400 inline" />
            </motion.h1>

            {/* Lines Below Hello */}
            <div className="flex flex-col space-y-2 w-auto items-start">
              <div>
                <AnimatedTitle />
              </div>
              <AnimatedSquares />
            </div>

            {/* Animated Infinite Gradient Underline */}
            <motion.div
              className="relative mt-[-30px] h-2 w-full max-w-[250px] md:max-w-[350px] rounded-full overflow-hidden brightness-85"
            >
              <motion.div
                className="absolute inset-0 w-full h-full"
                style={{
                  background: "linear-gradient(90deg, #EE696B, #C35D8A, #90559F, #6C4C99, #523A78, #EE696B)",
                  backgroundSize: "1000% 100%", // Much longer gradient for ultra-smoothness
                }}
                animate={
                  shouldReduceMotion
                    ? { backgroundPositionX: "0%" }
                    : { backgroundPositionX: ["0%", "1000%"] }
                }
                transition={{ 
                  repeat: Infinity,
                  duration: 80, // Slower movement (30 seconds per loop)
                  ease: "linear",
                }}
              />
            </motion.div>

            <motion.p
              className="text-lg text-gray-300 font-light leading-relaxed px-4 md:px-0"
              initial={{ opacity: 0 }}
              animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              Hi there! I'm a Full-Stack Developer who transforms ideas into dynamic web experiences.
              Being experienced in Java, JavaScript, Python, and frameworks currently in trend, I design user-friendly and engaging interfaces.
              Dive below and explore my creations to see how I make things happen.
            </motion.p>

            {/* Call to Action & Social Icons */}
            
            <div className="flex flex-col items-center md:flex-row space-y-6 md:space-y-0 md:space-x-12">
              {/* Let's Connect Button */}
              <motion.div
                className="relative flex items-center w-fit"
                onMouseEnter={() => setShowMessage(true)}
                onMouseLeave={() => setShowMessage(false)}
                onTouchStart={() => setShowMessage(true)}
                onTouchEnd={() => setShowMessage(false)}
              >
                <motion.button
                  className="relative z-10 px-8 py-4 text-lg font-medium bg-blue-600 rounded-lg shadow-md border border-blue-50 text-gray-100 transition-all duration-300 flex items-center"
                  animate={showMessage && !shouldReduceMotion ? { x: -40 } : { x: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{fontFamily: "sans-serif"}}
                >
                  Let's Connect
                </motion.button>

                <a href="/contact" className="absolute left-full ml-[-40px]">
                  <motion.button
                    className="flex items-center justify-center w-11 h-11 text-blue-600 rounded-t-md rounded-e-none rounded-b-md shadow-lg flex-none"
                    initial={{ opacity: 0, x: -40 }}
                    animate={
                      showMessage && !shouldReduceMotion
                        ? { opacity: 1, x: 0 }
                        : { opacity: 0, x: -40 }
                    }
                    transition={{ duration: 0.3 }}
                    style={{ backgroundColor: "#262626" }}
                    onClick={() => navigate("/contact")}
                  >
                    <FaEnvelope className="text-white w-5 h-5 flex-none" />
                  </motion.button>
                </a>
              </motion.div>

              {/* Social Icons */}
              <div className="flex space-x-8 mb-6 md:mb-0"> {/* Added margin-bottom on mobile */}
                <motion.a
                  href="https://www.linkedin.com/in/shadhir-fawz-30739730a/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
                  animate={
                    shouldReduceMotion ? {} : { y: [0, -8, 0] }
                  }
                  transition={
                    shouldReduceMotion
                      ? {}
                      : { repeat: Infinity, duration: 5 }
                  }
                >
                  <img src={LinkedIn} className="w-12 cursor-pointer" />
                </motion.a>
                <motion.a
                  href="mailto:ShadhirFawz19@gmail.com"
                  whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
                  animate={
                    shouldReduceMotion ? {} : { y: [0, -8, 0] }
                  }
                  transition={
                    shouldReduceMotion
                      ? {}
                      : { repeat: Infinity, duration: 5 }
                  }
                >
                  <img src={Gmail} className="w-12 cursor-pointer" />
                </motion.a>
                <motion.a
                  href="https://github.com/ShadhirFawz"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
                  animate={
                    shouldReduceMotion ? {} : { y: [0, -8, 0] }
                  }
                  transition={
                    shouldReduceMotion
                      ? {}
                      : { repeat: Infinity, duration: 5 }
                  }
                >
                  <img src={Github} className="w-12 cursor-pointer" />
                </motion.a>
              </div>
            </div>
          </div>

          <motion.div 
            className="w-3/4 h-full md:w-1/2 flex justify-center mt-70 md:mt-0 overflow-visible"
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 50,
              damping: 10,
              delay: 0.5 // Optional delay to coordinate with other animations
            }}
          >
            <RotatingCard />
          </motion.div>
        </div>
      </div>
    </div>
    
  );
};

export default LandingPage;