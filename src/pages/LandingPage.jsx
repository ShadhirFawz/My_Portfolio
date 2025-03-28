import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import ProfileImg from "../assets/images/fulldp.png";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import Github from "../assets/images/github-logo.png";
import Gmail from "../assets/images/gmail-logo.png";
import LinkedIn from "../assets/images/linkedin-logo.png";
import { ComplexNavbar } from "../components/Navbar";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Sidebar from "../components/Sidebar";
import ContactForm from "../components/ContactForm";
import { useNavigate } from "react-router-dom";


const LandingPage = () => {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [clickedIndex, setClickedIndex] = useState(null);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setShowText(true);
    };
  
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
  
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);
  
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
      document.body.style.overflow = "auto"; // Enable scrolling back
    }
  
    // Automatic animation loop for lines & text
    let timeout1, timeout2;
    const animateLines = () => {
      setMousePosition({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  
      // After lines stop moving, reveal text
      timeout1 = setTimeout(() => {
        setShowText(true);
  
        // Hide text after a delay, then restart the loop
        timeout2 = setTimeout(() => {
          setShowText(false);
          animateLines(); // Restart animation
        }, 2000); // Text stays visible for 2 seconds
      }, 1500); // Wait 1s after the lines stop before showing text
    };
  
    animateLines(); // Start animation loop
  
    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      document.body.style.overflow = "auto"; // Reset scrolling
      clearTimeout(timeout1);
      clearTimeout(timeout2);
    };
  }, [isDrawerOpen]); // Added showText as a dependency

  const handleClick = (e, index, link) => {
    e.preventDefault(); // Prevent instant navigation
    setClickedIndex(index); // Mark the clicked link

    setTimeout(() => {
      window.location.href = `/${link.toLowerCase()}`;
      setClickedIndex(null); // Reset after navigation
    }, 500);
  };

  return (
    <div
      className={`relative flex flex-col items-center justify-center w-full min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 overflow-hidden p-6 pt-[100px] 
        ${isDrawerOpen ? "pointer-events-none" : ""}`} // ⬅️ Disables all interactions when drawer is open
    >
      <Sidebar />
      {/* Navbar & Drawer */}
      <nav className="fixed top-0 left-0 w-full flex justify-between items-center p-6 bg-transparent bg-opacity-90 backdrop-blur-md max-w-screen-2xl mx-auto z-50">
        <div className="relative flex items-center">
          <div className="relative overflow-hidden">
            <h1
              className="text-white text-2xl font-bold font-serif cursor-none relative mt-2 md:mt-0"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              style={{ fontFamily: "cursive" }}
            >
              Shad_
            </h1>
            <motion.div
              className="absolute left-0 bottom-0 h-[2px] bg-blue-400"
              initial={{ width: 0 }}
              animate={hovered ? { width: "60px" } : { width: 0 }}
              transition={{ duration: 1 }}
            />
          </div>
          <motion.span
            className="text-blue-400 text-2xl font-bold ml-2 font-cursive overflow-hidden relative"
            initial={{ width: 0 }}
            animate={hovered ? { width: "auto" } : { width: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            style={{
              fontFamily: "serif",
              fontSize: 49,
              whiteSpace: "nowrap",
              display: "inline-block",
            }}
          >
            Fawz
            
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
          animate={{ x: 0 }}
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
                  animate={clickedIndex === index ? { width: "100%" } : {}}
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
      
      {/* Background effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(50, 150, 255, 0.2), rgba(0, 0, 0, 0.7))`,
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Content Container */}
      <div
        className="relative z-10 flex flex-col md:flex-row items-center justify-center w-full max-w-screen-6xl px-6 md:px-32 text-center md:text-left min-h-[80vh] md:min-h-[70vh]"
      >
        <div className="w-full md:w-1/2 space-y-10 flex flex-col items-center md:items-start">
          <motion.h1
            className="text-5xl md:text-6xl font-extrabold text-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ fontFamily: "serif" }}
          >
            Hello, I'm <span className="text-blue-400">Shadhir</span>
          </motion.h1>

          {/* Lines Below Hello */}
          <div className="relative w-full flex flex-col items-start mt-[-20px] space-y-1">
            {/* First Line */}
            <motion.div
              className="h-[5px] bg-white rounded-l-full"
              initial={{ width: 0 }}
              animate={{ width: "40%" }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: 0.2
              }}
              onAnimationComplete={() => setShowText(true)} // Trigger text reveal
            />

            {/* Second Line */}
            <motion.div
              className="h-[5px] bg-blue-600 rounded-l-full"
              style={{ marginTop: "4px", marginLeft: "40px" }}
              initial={{ width: 0 }}
              animate={{ width: "calc(40% - 40px)" }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: 0.2
              }}
            />

            {/* Revealing Text */}
            <motion.span
              className="text-blue-400 text-2xl font-bold font-cursive overflow-hidden"
              initial={{ width: 0 }}
              animate={showText ? { width: "auto" } : { width: 0 }}
              transition={{ duration: 1, delay: 0.1 }}
              style={{
                fontFamily: "cursive",
                fontSize: 32,
                whiteSpace: "nowrap",
                display: "inline-block",
                borderRight: "1px solid transparent",
              }}
            >
              Full-Stack Developer <span className="text-white">❰ / ❱</span>
            </motion.span>           
          </div>

          {/* Animated Infinite Gradient Underline */}
          <motion.div
            className="relative mt-[-20px] h-2 w-full max-w-[250px] md:max-w-[350px] rounded-full overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 w-full h-full"
              style={{
                background:
                  "linear-gradient(90deg, #EE696B, #C35D8A, #90559F, #6C4C99, #523A78, #EE696B)",
                backgroundSize: "300% 250%",
                filter: "brightness(1.2) blur(1px)",
              }}
              animate={{ backgroundPositionX: ["0%", "100%"] }}
              transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
            />
          </motion.div>

          <motion.p
            className="text-lg text-gray-300 font-light leading-relaxed px-4 md:px-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
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
                animate={showMessage ? { x: -40 } : { x: 0 }}
                transition={{ duration: 0.3 }}
              >
                Let's Connect
              </motion.button>

              <a href="/contact" className="absolute left-full ml-[-40px]">
                <motion.button
                  className="flex items-center justify-center w-11 h-11 text-blue-600 rounded-t-md rounded-e-none rounded-b-md shadow-lg flex-none"
                  initial={{ opacity: 0, x: -40 }}
                  animate={showMessage ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
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
                whileHover={{ scale: 1.1 }}
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 5 }}
              >
                <img src={LinkedIn} className="w-12 cursor-pointer" />
              </motion.a>
              <motion.a
                href="mailto:ShadhirFawz19@gmail.com"
                whileHover={{ scale: 1.1 }}
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 5 }}
              >
                <img src={Gmail} className="w-12 cursor-pointer" />
              </motion.a>
              <motion.a
                href="https://github.com/ShadhirFawz"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 5 }}
              >
                <img src={Github} className="w-12 cursor-pointer" />
              </motion.a>
            </div>
          </div>
        </div>

        {/* Profile Image (Hidden on Mobile) */}
        <motion.div className="hidden md:block relative w-110 h-120 mx-auto md:mx-44 border border-gray-900 rounded-3xl overflow-hidden">
        <img src={ProfileImg} alt="Profile" className="w-full h-full object-cover" />
          <div className="absolute inset-x-0 top-0 h-4/4 bg-gradient-to-t to-transparent from-gray-400 opacity-90 mix-blend-overlay"></div>
          <div className="absolute inset-y-0 left-0 w-2/4 bg-gradient-to-l to-transparent from-gray-600 opacity-150 mix-blend-overlay"></div>
          <div className="absolute inset-y-0 right-0 w-2/4 bg-gradient-to-r to-transparent from-gray-600 opacity-150 mix-blend-overlay"></div>
        </motion.div>
      </div>
    </div>
  );
};

export default LandingPage;
