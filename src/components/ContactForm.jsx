import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { HiPaperAirplane } from "react-icons/hi";
import Sidebar from "./Sidebar";
import PhoneRevealButton from "./PhoneButton";
import ContactGIF from "../assets/images/gifgittest.gif"

const ContactForm = () => {
  const [formData, setFormData] = useState({
    subject: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState({ success: false, message: "" });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [screenSize, setScreenSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Track screen resize for full-screen layout
  useEffect(() => {
    const updateScreenSize = () => {
      setScreenSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", updateScreenSize);
    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  // Track mouse movement for background effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Update state on window resize
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false); // Reset success state
    
    try {
      const response = await axios.post("http://localhost:5000/send-email", formData);
      
      // Simulating a small delay for better animation UX
      setTimeout(() => {
        setLoading(false);
        setSuccess(true); // Show success animation
        
        // Reset form fields
        setFormData({ subject: "", email: "", message: "" });
        document.getElementById("messageBox").innerText = ""; // Reset the text content
        
        // Hide success animation after 2 seconds
        setTimeout(() => setSuccess(false), 2000);
      }, 1500);
      
    } catch (error) {
      setLoading(false);
      alert("Something went wrong! Please try again later.");
    }
  };

  return (
    <div
      style={{
        width: `${screenSize.width}px`, // Full dynamic width
        height: `${screenSize.height}px`, // Full dynamic height
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start", // Push form to the left
        padding: "20px",
        background: "linear-gradient(to bottom right, #1a1a1a, #000000, #2a2a2a)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Sidebar />
      {/* Background Effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(50, 150, 255, 0.2), rgba(0, 0, 0, 0.7))`,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Left Navigation Section with Glow */}
      <motion.div
        initial={{ x: 0 }}
        whileHover={{ x: -10 }} // Slide slightly outward on hover
        transition={{ type: "spring", stiffness: 200, damping: 10 }}
        onClick={() => (window.location.href = "/")} // Navigate on click
        className="fixed top-0 left-0 h-full w-[12.5%] bg-gray-900 flex items-center justify-center cursor-pointer shadow-lg"
        style={{
          boxShadow: "0px 0px 20px rgba(0, 200, 255, 0.6)", // Glow Effect
          transition: "box-shadow 0.3s ease-in-out",
        }}
      >
        <motion.div
          className="text-white text-3xl"
          whileHover={{ scale: 1.2 }} // Slight scale effect on hover
          style={{ opacity: 0.8 }}
        >
          ❰
        </motion.div>
      </motion.div>

      {/* Left-Aligned Contact Form (Styled with Tailwind) */}
      {isMobile ? (
        <div className="w-[100%] max-w-screen h-auto p-5 bg-gray-800 rounded-xl shadow-lg z-10 flex flex-col space-y-3">
          {/* Mobile Title */}
          <h3 
            className="text-amber-50 text-center flex items-center justify-center"
            style={{ fontFamily: "Poppins", fontSize: 20 }}
          >
            <img 
              src={ContactGIF} 
              alt="Contact GIF" 
              className="w-12 h-12 object-contain"
            />
            Contact Forum
          </h3>
      
          {/* Mobile Form */}
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            {/* Subject Dropdown */}
            <h2 className="font-normal text-cyan-100" style={{ fontFamily: "sans-serif" }}>
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
      
            {/* Email Input */}
            <h2 className="font-normal text-cyan-100" style={{ fontFamily: "sans-serif" }}>
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
      
            {/* Message Input (contentEditable) */}
            <h2 className="font-normal text-cyan-100" style={{ fontFamily: "sans-serif" }}>
              Let me know your concern in brief
            </h2>
            <div
              id="messageBox"
              contentEditable
              className="w-full p-2 rounded bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-950"
              style={{ minHeight: '150px', whiteSpace: 'pre-wrap', wordWrap: 'break-word', textTransform: "capitalize" }}
              onInput={(e) => setFormData({ ...formData, message: e.target.textContent })}
            >
            </div>
      
            {/* Submit Button */}
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
              ) : success ? (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1.3, opacity: 1 }}
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
              ) : (
                <>
                  <HiPaperAirplane className="w-6 h-6 inline-block -mt-1 mr-2" style={{ transform: "rotate(40deg)" }} />
                  Send Message
                </>
              )}
            </button>
      
            {/* Status Message */}
            {status.message && (
              <p className={`text-center mt-2 ${status.success ? "text-green-400" : "text-red-400"}`}>
                {status.message}
              </p>
            )}
          </form>
        </div>
      ) : (
        <div className="flex items-center">
          {/* Contact Form */}
          <div className="w-[600px] h-[560px] p-6 bg-gray-800 rounded-2xl shadow-2xl z-10 ml-32">
            <h3 className="text-amber-50 text-center mb-3 flex items-center" style={{ fontFamily: "Poppins", fontSize: 23 }}>
              <img src={ContactGIF} alt="Contact GIF" className="w-13 h-14 text-center object-contain" />
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
              >
              </div>

              {/* Submit Button */}
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
                ) : success ? (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1.3, opacity: 1 }}
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
                ) : (
                  <>
                    <HiPaperAirplane className="w-6 h-6 inline-block -mt-1 mr-2" style={{ transform: "rotate(40deg)" }} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Vertical Separator Line */}
          <div className="h-150 w-[5px] bg-gradient-to-b from-gray-500 via-gray-400 to-gray-500 opacity-50 mx-10 rounded-2xl"></div>

          {/* Phone Button */}
          <div className="flex flex-col items-start space-y-4">
            <PhoneRevealButton />
          </div>
        </div>
      )}
  
    </div>
  );
};

export default ContactForm;
