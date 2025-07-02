import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import axios from "axios";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { HiPaperAirplane } from "react-icons/hi";
import Sidebar from "../components/Sidebar";
import PhoneRevealButton from "../components/PhoneButton";
import ContactGIF from "../assets/images/gifgittest.gif";
import { ComplexNavbar } from "../components/Navbar";
import { FaGithub, FaLinkedin, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { GrMail } from "react-icons/gr";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    subject: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState({ success: false, message: "" });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [screenSize, setScreenSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [clickedIndex, setClickedIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [hoverStates, setHoverStates] = useState({
    linkedin: 'hidden',
    email: 'hidden',
    github: 'hidden'
  });
  const [trailPoints, setTrailPoints] = useState([]);
  const [isMoving, setIsMoving] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setScreenSize({ width: window.innerWidth, height: window.innerHeight });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.margin = '';
      document.body.style.padding = '';
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    const body = document.body;
    if (isDrawerOpen) {
      body.classList.add("drawer-open");
    } else {
      body.classList.remove("drawer-open");
    }
    return () => body.classList.remove("drawer-open");
  }, [isDrawerOpen]);

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

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(stopTimeout);
      cancelAnimationFrame(rafId);
    };
  }, [shouldReduceMotion]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClick = (e, index, link) => {
    e.preventDefault();
    setClickedIndex(index);
    setTimeout(() => {
      window.location.href = `/${link.toLowerCase()}`;
      setClickedIndex(null);
    }, 500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    try {
      const response = await axios.post("https://portfolio-backend-<yourname>.koyeb.app/send-email", formData);
      setTimeout(() => {
        setLoading(false);
        setSuccess(true);
        setFormData({ subject: "", email: "", message: "" });
        document.getElementById("messageBox").innerText = "";
        setTimeout(() => setSuccess(false), 2000);
      }, 1500);
    } catch (error) {
      setLoading(false);
      alert("Something went wrong! Please try again later.");
    }
  };

  // Animation variants
  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.2, ease: "easeOut" } },
  };

  const lineVariants = {
    hidden: { x: 400 },
    visible: { x: 0, transition: { duration: 0.6, delay: 0.4, ease: "easeOut" } },
  };

  const locationVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.6, ease: "easeOut" } },
  };

  if (isMobile) {
    return (
      <div className="fixed inset-0 overflow-y-auto">
        <div 
          className="fixed inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800 p-4 md:p-6"
        >
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(50, 150, 255, 0.2), rgba(0, 0, 0, 0.7))`,
            }}
            transition={{ duration: 0.3 }}
          />
          <div className="md:hidden flex items-center justify-center h-full z-500">
            <div className="bg-gray-800 rounded-lg p-6 text-center">
              <h2 className="text-xl font-bold text-white mb-2" style={{ fontFamily: "'Times New Roman', serif" }}>
                Mobile Version Coming Soon
              </h2>
              <p className="text-gray-300 text-sm" style={{ fontFamily: "sans-serif" }}>
                This page is currently available only on desktop.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        width: `${screenSize.width}px`,
        height: `${screenSize.height}px`,
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: "10px",
        background: "linear-gradient(to bottom right, #1a1a1a, #000000, #2a2a2a)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Sidebar />
      
      {/* Navbar & Drawer */}
      {isMobile ? (
        <button
          onClick={() => setIsDrawerOpen(!isDrawerOpen)}
          className="text-white fixed z-[100] bg-gray-900 rounded-full shadow-lg pointer-events-auto"
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
        <div className="fixed top-10 left-55 w-full h-[80px] bg-transparent z-80">
          <ComplexNavbar />
        </div>
      )}

      {/* Mobile Drawer with Navigation Links */}
      {isMobile && isDrawerOpen && (
        <motion.div
          initial={{ x: -150 }}
          animate={{ x: 0 }}
          exit={{ x: -50 }}
          className="absolute top-0 left-0 w-2/4 h-screen bg-black bg-opacity-90 p-6 flex flex-col items-start z-40 space-y-4 pointer-events-auto"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-800 via-transparent to-transparent opacity-50 rounded-full w-[700px] h-[600px] -top-10 -left-36"></div>
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

      {/* Background Effect */}
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

      {/* Left Navigation Section with Glow */}
      <motion.div
        initial={{ x: 0 }}
        whileHover={{ x: -10 }}
        transition={{ type: "spring", stiffness: 200, damping: 10 }}
        onClick={() => (window.location.href = "/")}
        className="fixed top-0 left-0 h-full w-[12.5%] bg-gray-900 flex items-center justify-center cursor-pointer shadow-lg"
        style={{
          boxShadow: "0px 0px 20px rgba(0, 200, 255, 0.6)",
          transition: "box-shadow 0.3s ease-in-out",
        }}
      >
        <motion.div
          className="text-white text-3xl"
          whileHover={{ scale: 1.2 }}
          style={{ opacity: 0.8 }}
        >
          ❰
        </motion.div>
      </motion.div>

      {/* Main Content Container - Now positioned below navbar */}
      <div className="w-full h-full flex items-center justify-center" style={{ marginTop: isMobile ? '0' : '80px' }}>
        <motion.div
          className="flex items-center justify-center"
          variants={formVariants}
          initial="hidden"
          animate={shouldReduceMotion ? { opacity: 1, y: 0 } : "visible"}
        >
          {/* Contact Form */}
          <div className="w-[600px] h-[560px] p-6 bg-gray-800 rounded-2xl shadow-2xl z-10">
            <h3 className="text-amber-50 text-center mb-3 flex items-center" style={{ fontFamily: "Poppins", fontSize: 23 }}>
              <GrMail className="w-8 h-8 mr-2 text-center" />
              Contact Forum
            </h3>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-7">
              <h2 className="font-normal text-cyan-100 mb-1" style={{ fontFamily: "sans-serif" }}>
                Choose your concern
              </h2>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-700 text-white outline-none focus:ring-0 focus:ring-gray-900"
                style={{ appearance: "none", fontFamily: "serif" }}
                required
              >
                <option value="">Select a subject</option>
                <option value="Project Inquiry">Project Inquiry</option>
                <option value="Job Opportunity">Job Opportunity</option>
                <option value="Technical Support">Technical Support</option>
                <option value="General Inquiry">General Inquiry</option>
                <option value="Collaboration Request">Collaboration Request</option>
                <option value="Feedback">Feedback</option>
                <option value="Other">Other</option>
              </select>
              <h2 className="font-normal text-cyan-100 mb-1" style={{ fontFamily: "sans-serif" }}>
                Your Email
              </h2>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-950"
                style={{ textTransform: "capitalize" }}
                required
              />
              <h2 className="font-normal text-cyan-100 mb-1" style={{ fontFamily: "sans-serif" }}>
                Let me know your concern in brief
              </h2>
              <div
                id="messageBox"
                contentEditable
                className="w-full p-2 rounded bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-950"
                style={{ minHeight: '150px', whiteSpace: 'pre-wrap', wordWrap: 'break-word', textTransform: "capitalize" }}
                onInput={(e) => setFormData({ ...formData, message: e.target.textContent })}
              />
              <div className="flex items-center gap-4"> {/* New container for button + success indicator */}
                <button
                  type="submit"
                  className="w-45 p-2 bg-blue-500 hover:bg-blue-600 rounded text-white transition duration-300 flex justify-center items-center space-x-2"
                  disabled={loading}
                  style={{ fontFamily: "sans-serif" }}
                >
                  {loading ? (
                    <motion.div className="flex space-x-1">
                      <motion.span
                        className="w-2 h-2 bg-white rounded-full"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ repeat: Infinity, duration: 1, ease: "easeInOut", staggerChildren: 0.2 }}
                      />
                      <motion.span
                        className="w-2 h-2 bg-white rounded-full"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ repeat: Infinity, duration: 1, ease: "easeInOut", delay: 0.2 }}
                      />
                      <motion.span
                        className="w-2 h-2 bg-white rounded-full"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ repeat: Infinity, duration: 1, ease: "easeInOut", delay: 0.4 }}
                      />
                    </motion.div>
                  ) : (
                    <>
                      <HiPaperAirplane className="w-6 h-6 inline-block -mt-1 mr-2" style={{ transform: "rotate(40deg)" }} />
                      Send Message
                    </>
                  )}
                </button>
                
                {/* Success indicator moved outside */}
                {success && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1.3, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                    className="flex items-center justify-center"
                  >
                    <motion.div
                      className="w-7 h-7 bg-green-500 rounded-full flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 10 }}
                    >
                      <motion.svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="white"
                        className="w-5 h-5"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                      </motion.svg>
                    </motion.div>
                  </motion.div>
                )}
              </div>
            </form>
          </div>
          <div className="h-120 w-[5px] bg-gradient-to-b from-gray-500 via-gray-400 to-gray-500 opacity-50 mx-10 rounded-2xl"></div>
          <div className="flex flex-col place-items-start space-y-4">
            <PhoneRevealButton />
            <div className="flex justify-items-start w-full mt-6 space-x-8">
              <a 
                href="https://www.linkedin.com/in/shadhir-fawz-30739730a/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="relative bg-blue-950 text-white p-2 rounded-lg text-3xl overflow-hidden"
                onMouseEnter={() => setHoverStates({...hoverStates, linkedin: true})}
                onMouseLeave={() => {
                  setHoverStates({...hoverStates, linkedin: 'exiting'});
                  setTimeout(() => setHoverStates({...hoverStates, linkedin: false}), 300);
                }}
              >
                <div className="relative z-10">
                  <FaLinkedin />
                </div>
                <motion.div
                  className="absolute inset-0 bg-white z-0"
                  animate={{ 
                    x: hoverStates.linkedin === true ? '0%' : 
                      hoverStates.linkedin === 'exiting' ? '100%' : '-110%',
                    transition: { duration: 0.3 }
                  }}
                />
              </a>
              <a 
                href="mailto:ShadhirFawz19@gmail.com" 
                className="relative bg-blue-950 text-white p-2 rounded-lg text-3xl overflow-hidden"
                onMouseEnter={() => setHoverStates({...hoverStates, email: true})}
                onMouseLeave={() => {
                  setHoverStates({...hoverStates, email: 'exiting'});
                  setTimeout(() => setHoverStates({...hoverStates, email: false}), 300);
                }}
              >
                <div className="relative z-10">
                  <FaEnvelope />
                </div>
                <motion.div
                  className="absolute inset-0 bg-white z-0"
                  animate={{ 
                    x: hoverStates.email === true ? '0%' : 
                      hoverStates.email === 'exiting' ? '100%' : '-110%',
                    transition: { duration: 0.3 }
                  }}
                />
              </a>
              <a 
                href="https://github.com/ShadhirFawz" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="relative bg-blue-950 text-white p-2 rounded-lg text-3xl overflow-hidden"
                onMouseEnter={() => setHoverStates({...hoverStates, github: true})}
                onMouseLeave={() => {
                  setHoverStates({...hoverStates, github: 'exiting'});
                  setTimeout(() => setHoverStates({...hoverStates, github: false}), 300);
                }}
              >
                <div className="relative z-10">
                  <FaGithub />
                </div>
                <motion.div
                  className="absolute inset-0 bg-white z-0"
                  animate={{ 
                    x: hoverStates.github === true ? '0%' : 
                      hoverStates.github === 'exiting' ? '100%' : '-110%',
                    transition: { duration: 0.3 }
                  }}
                />
              </a>
            </div>
            <motion.div
              className="h-1 w-[400px] bg-gradient-to-b from-gray-500 via-gray-400 to-gray-600 opacity-50 mx-0 mt-5 rounded-2xl"
              variants={lineVariants}
              initial="hidden"
              animate={shouldReduceMotion ? { x: 0 } : "visible"}
            />
            <motion.h3
              className="text-cyan-100 text-center mt-2 mb-3 flex items-center z-10"
              style={{ fontFamily: "Poppins", fontSize: 15 }}
              variants={locationVariants}
              initial="hidden"
              animate={shouldReduceMotion ? { opacity: 1, y: 0 } : "visible"}
            >
              <FaMapMarkerAlt className="w-5 h-7 text-center object-contain mr-3.5" />
              Kandy, Sri Lanka
            </motion.h3>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactForm;