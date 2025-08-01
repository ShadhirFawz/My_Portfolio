import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import JetpackCompose from '../assets/images/jetpack-compose.png';
import Sidebar from "../components/Sidebar";
import { ComplexNavbar } from "../components/Navbar";
import ResumePDF from "../Shadhir_Resume.pdf";
import AnimatedCloseButton from "../components/AnimatedCloseButoon";
import { FaLaptopCode, FaBook, FaGraduationCap } from "react-icons/fa";

// Tech stack icons from TechStackScroll.jsx
const techStack = [
  { name: "Java", src: "https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/Java-Dark.svg", url: "https://www.java.com/" },
  { name: "JavaScript", src: "https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/JavaScript.svg", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
  { name: "Python", src: "https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/Python-Dark.svg", url: "https://www.python.org/" },
  { name: "HTML5", src: "https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/HTML.svg", url: "https://www.w3.org/html/" },
  { name: "TypeScript", src: "https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/TypeScript.svg", url: "https://www.typescriptlang.org/" },
  { name: "CSS3", src: "https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/CSS.svg", url: "https://www.w3.org/Style/CSS/Overview.en.html" },
  { name: "C++", src: "https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/CPP.svg", url: "https://cpp-lang.net/" },
  { name: "PHP", src: "https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/PHP-Dark.svg", url: "https://www.php.net/" },
  { name: "Dart", src: "https://www.vectorlogo.zone/logos/dartlang/dartlang-icon.svg", url: "https://dart.dev" },
  { name: "React", src: "https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/React-Dark.svg", url: "https://react.dev/" },
  { name: "Express.js", src: "https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/ExpressJS-Dark.svg", url: "https://expressjs.com/" },
  { name: "Node.js", src: "https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/NodeJS-Dark.svg", url: "https://nodejs.org/en" },
  { name: "Bootstrap", src: "https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/Bootstrap.svg", url: "https://getbootstrap.com/" },
  { name: "Spring Boot", src: "https://www.vectorlogo.zone/logos/springio/springio-icon.svg", url: "https://spring.io/projects/spring-boot" },
  { name: "Tailwind CSS", src: "https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg", url: "https://tailwindcss.com/" },
  { name: "Jetpack Compose", src: JetpackCompose, url: "https://developer.android.com/jetpack/compose" },
  { name: "MySQL", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original-wordmark.svg", url: "https://www.mysql.com/" },
  { name: "MongoDB", src: "https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/MongoDB.svg", url: "https://www.mongodb.com/" },
  { name: "Oracle", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg", url: "https://www.oracle.com/" },
  { name: "Firebase", src: "https://www.vectorlogo.zone/logos/firebase/firebase-icon.svg", url: "https://firebase.google.com/" },
  { name: "GitHub", src: "https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/Github-Dark.svg", url: "https://github.com/" },
  { name: "Android Studio", src: "https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/AndroidStudio-Dark.svg", url: "https://developer.android.com/studio" },
  { name: "VS Code", src: "https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/VSCode-Dark.svg", url: "https://code.visualstudio.com/" },
  { name: "Postman", src: "https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg", url: "https://www.postman.com/" },
  { name: "Git", src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-plain.svg", url: "https://git-scm.com/" },
  { name: "Eclipse IDE", src: "https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/Eclipse-Dark.svg", url: "https://www.eclipse.org/" },
  { name: "Figma", src: "https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/Figma-Dark.svg", url: "https://www.figma.com/" },
];

// Categorize icons for accordion
const languages = ["Java", "JavaScript", "Python", "HTML5", "TypeScript", "CSS3", "C++", "PHP", "Dart"];
const frameworks = ["React", "Express.js", "Node.js", "Bootstrap", "Spring Boot", "Tailwind CSS", "Jetpack Compose"];
const databases = ["MySQL", "MongoDB", "Oracle", "Firebase"];
const tools = ["GitHub", "Android Studio", "VS Code", "Postman", "Git", "Eclipse IDE", "Figma"];

const AnimatedRedSquare = () => {
  return (
    <motion.div
      className="absolute top-[12%] left-0 w-4 h-4 bg-gray-500/85 rounded-sm z-20"
      initial={{ x: '-100%' }}
      animate={{ x: '100vw' }}
      transition={{
        duration: 14,
        ease: "linear",
        repeat: Infinity,
        repeatType: "loop",
        delay: 2
      }}
    />
  );
};

const TechStack = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [openAccordion, setOpenAccordion] = useState("Languages");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    console.log("ResumePDF URL:", ResumePDF);
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const section = document.querySelector('.education-experience-section');
    const observerOptions = {
      threshold: 0.3
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        } else {
          entry.target.classList.remove('visible');
        }
      });
    }, observerOptions);

    if (section) {
      observer.observe(section);
    } else {
      console.error('Education & Experience section not found!');
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

    useEffect(() => {
    const cards = document.querySelectorAll('.education-card');
    const observerOptions = {
      threshold: 0.3
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('slide-in');
          entry.target.classList.remove('slide-out');
        } else {
          entry.target.classList.add('slide-out');
          entry.target.classList.remove('slide-in');
        }
      });
    }, observerOptions);

    cards.forEach(card => {
      observer.observe(card);
    });

    return () => {
      cards.forEach(card => {
        observer.unobserve(card);
      });
    };
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    
    // Store original styles
    const originalHtmlOverflow = html.style.overflow;
    const originalBodyOverflow = body.style.overflow;
    
    // Enable scrolling
    html.style.overflow = 'auto';
    body.style.overflow = 'auto';
    
    return () => {
      // Restore original styles
      html.style.overflow = originalHtmlOverflow;
      body.style.overflow = originalBodyOverflow;
    };
  }, []);


  const toggleReadMore = () => setIsExpanded(!isExpanded);
  const toggleAccordion = (section) => {
    setOpenAccordion(openAccordion === section ? null : section);
  };

  if (isMobile) {
    return (
      <div className="fixed inset-0 overflow-y-auto">
        <div className="fixed inset-0 bg-gradient-to-l from-purple-900/90 via-black to-blue-900/80 p-4 md:p-6">
          <motion.div
            className="absolute inset-0 pointer-events-none"
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
    <div className="min-h-screen flex flex-col">
      <div
        className="relative w-full flex-1 overflow-y-auto scroll-smooth bg-gradient-to-l from-purple-900/90 via-black to-blue-900/80"
        style={{
          background: `
            radial-gradient(circle at 20% 20%, rgba(75, 0, 130, 0.4), rgba(0, 0, 0, 0.8)),
            radial-gradient(circle at 80% 50%, rgba(0, 191, 255, 0.3), rgba(0, 0, 0, 0.8)),
            radial-gradient(circle at 30% 80%, rgba(138, 43, 226, 0.3), rgba(0, 0, 0, 0.8)),
            linear-gradient(to left, rgba(75, 0, 130, 0.9), rgba(0, 0, 0, 1), rgba(0, 71, 171, 0.8))
          `,
          minHeight: '150vh'
        }}
      >
        <motion.div
          className="absolute inset-0 pointer-events-none"
          transition={{ duration: 0.3 }}
        />

        <div className="absolute left-[7%] h-full w-1 z-0 opacity-50">
          <motion.div 
            className="h-full w-px bg-white"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          />
        </div>

        <div className="absolute top-[10%] w-full h-1 z-0 opacity-50">
          <motion.div 
            className="w-full h-px bg-white"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          />
          <motion.div 
            className="w-full mt-1 h-px bg-white"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
          />
        </div>

        <AnimatedRedSquare />

        <div className="fixed top-10 left-55 w-full h-[80px] bg-transparent z-80">
          <ComplexNavbar />
        </div>

        {isResumeOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsResumeOpen(false)}
          >
            <motion.div
              className="relative bg-gray-900 rounded-lg shadow-lg w-full max-w-4xl h-[95vh] overflow-hidden"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatedCloseButton onClick={() => setIsResumeOpen(false)} />
              <object
                data={ResumePDF}
                type="application/pdf"
                className="w-full h-full"
              >
                <p className="text-white text-center p-4">Your browser does not support PDF viewing. Please download the resume.</p>
              </object>
            </motion.div>
          </motion.div>
        )}

        <section className="relative w-full max-w-screen-6xl px-6 md:px-32 py-5 mt-28">
          <div className="mx-auto py-3 my-4">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-1/2 pt-8">
                <div className="flex items-center gap-4">
                  <motion.h1
                    className="text-4xl md:text-5xl font-bold font-serif text-white"
                    style={{ fontFamily: "'Times New Roman', Times, serif" }}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  >
                    About Me
                  </motion.h1>
                  <motion.div
                    className="flex-1 overflow-hidden"
                    initial={{ x: 300 }}
                    animate={{ x: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                  >
                    <div className="relative w-[80%] h-1 bg-blue-500 rounded-full mt-2" />
                    <div className="relative w-[80%] h-1 bg-white rounded-full mt-1 ml-[7px]" />
                  </motion.div>
                </div>
                <div className="min-h-[200px]">
                  <motion.p
                    className="mt-4 text-lg font-bold text-gray-300"
                    style={{ fontFamily: "Cambria, Cochin, Georgia, Times, 'Times New Roman', serif" }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    I'm Shadhir Fawz, I've finished my schooling at St.Sylvester's College Kandy. Being as a Senior Prefect, bought 
                    me good leadership qualities and Teamwork. Completing my Advanced level, I've started my Bachelors higher studies 
                    at SLIIT in Software Engineering. I embarked on my journey to enhance my technical skills three years ago, dedicating myself 
                    to continuous learning and development.
                    <span className={isExpanded ? "hidden" : "inline"}> . . . </span>
                    <span className={isExpanded ? "inline" : "hidden"}>
                      <br /><br />
                      Over this period, I have successfully honed my expertise, particularly in Java, JavaScript, HTML5,
                      Bootstrap, and CSS. My commitment to excellence and my passion for technology drive me to meet and exceed professional 
                      standards consistently. I am enthusiastic about applying my knowledge and skills in a professional setting, contributing 
                      to innovative projects, and continuously growing within the industry.
                    </span>
                  </motion.p>
                </div>
                
                <motion.button
                  className="mt-1 px-2 py-0.25 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors text-xs"
                  onClick={toggleReadMore}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ fontFamily: "sans-serif" }}
                >
                  {isExpanded ? "Read Less" : "Read More"}
                </motion.button>
                <motion.div
                  className="mt-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                </motion.div>
                <div className="flex items-center space-x-2">
                  <motion.button
                    className="bottom-0 right-0 px-0 py-0 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors relative overflow-hidden"
                    onClick={() => setIsResumeOpen(true)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{ fontFamily: "sans-serif", zIndex: 90 }}
                  >
                    <span className="relative z-20">Get My Resume</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="absolute bottom-0.5 right-0.5 w-3 h-3 text-white"
                      style={{ zIndex: 50 }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                      />
                    </svg>
                    <motion.div
                      className="absolute bottom-0 right-0"
                      style={{
                        width: 0,
                        height: 0,
                        borderStyle: "solid",
                        borderWidth: "0 0 28px 28px",
                        borderColor: "transparent transparent rgba(76, 69, 69, 0.5) transparent",
                        zIndex: 15,
                      }}
                      initial={{ rotateZ: 0, translateY: 0 }}
                    />
                    <div
                      className="absolute bottom-0 right-0"
                      style={{
                        width: 0,
                        height: 0,
                        borderStyle: "solid",
                        borderWidth: "0 0 28px 28px",
                        borderColor: "transparent transparent rgba(0, 0, 0, 0.3) transparent",
                        zIndex: 5,
                      }}
                    />
                  </motion.button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-9 h-9 text-gray-400 hover:text-blue-400 transition-colors"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                    />
                  </svg>
                </div>
              </div>

              <div className="w-full md:w-1/2 mt-10 md:mt-0 pt-8 z-60">
                {[
                  { title: "Languages", items: languages },
                  { title: "Frameworks & Libraries", items: frameworks },
                  { title: "Databases", items: databases },
                  { title: "Tools", items: tools },
                ].map((section, index) => (
                  <div
                    key={section.title}
                    className="mb-4"
                    onMouseEnter={() => setOpenAccordion(section.title)}
                    onMouseLeave={() => {
                      if (openAccordion === section.title) setOpenAccordion(null);
                    }}
                  >
                    <motion.div
                      className="w-full bg-gray-800 rounded-lg shadow-lg cursor-pointer"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: index * 0.2 }}
                    >
                      <button
                        className="w-full text-left px-6 py-12 text-3xl font-cursive text-white flex justify-between items-center"
                        style={{ fontFamily: "cursive", fontSize: 18 }}
                        onClick={() => toggleAccordion(section.title)}
                      >
                        {section.title}
                        <span>{openAccordion === section.title ? "−" : "•"}</span>
                      </button>
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{
                          height: openAccordion === section.title ? "auto" : 0,
                          opacity: openAccordion === section.title ? 1 : 0,
                        }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 py-4">
                          <div className="flex flex-col items-center gap-6">
                            {Array.from({ length: Math.ceil(section.items.length / 7) }).map((_, i) => (
                              <div
                                key={i}
                                className="flex flex-wrap justify-center gap-4"
                                style={{ maxWidth: "calc(7 * (3rem + 1rem))" }}
                              >
                                {section.items.slice(i * 7, (i + 1) * 7).map((item) => {
                                  const tech = techStack.find((t) => t.name === item);
                                  return (
                                    <motion.div
                                      key={tech.name}
                                      className="relative w-12 h-12 cursor-pointer"
                                      whileHover={{ scale: 1.2, rotate: 5 }}
                                      onClick={() => window.open(tech.url, "_blank")}
                                    >
                                      <img
                                        src={tech.src}
                                        alt={tech.name}
                                        className="w-full h-full object-contain"
                                        style={tech.style || {}}
                                      />
                                    </motion.div>
                                  );
                                })}
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  </div>
                ))}
                <div className="flex items-center space-x-3 mt-6">
                  <Link to="/projects" className="text-white no-underline">
                    <motion.button
                      className="bottom-0 right-0 px-0 py-0 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors relative overflow-hidden"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      style={{ fontFamily: "sans-serif", zIndex: 90 }}
                    >
                      <span className="relative z-20">View My Work</span>
                    </motion.button>
                  </Link>
                  <FaLaptopCode className="w-9 h-9 text-gray-400 hover:text-blue-400 transition-colors" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="education-experience-section relative w-full max-w-screen-6xl px-6 md:px-32 py-5 my-5">
          <div className="mx-auto">
            <motion.div
              className="flex flex-col md:flex-row gap-8 items-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="w-full md:w-1/2">
                <motion.h2
                  className="text-4xl md:text-5xl font-bold text-white mb-4"
                  style={{ fontFamily: "'Times New Roman', Times, serif" }}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  Education & Experience
                </motion.h2>
                <motion.div
                  className="flex mb-3 pl-4 pr-0 py-2 bg-gray-800 rounded-lg shadow-lg"
                  variants={{
                    'slide-in': { x: 0, opacity: 1 },
                    'slide-out': { x: -100, opacity: 0 }
                  }}
                  initial="slide-out"
                  animate="slide-in"
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <FaBook className="w-10 h-10 my-4 mr-6 text-gray-300" />
                  <div>
                    <h4 className="font-bold text-white text-xl">Education</h4>
                    <p
                      className="font-bold text-gray-300"
                      style={{ marginLeft: "20px", fontFamily: "Arial, Helvetica, sans-serif" }}
                    >
                      &#x2022; Advanced Level - Physical Science Stream<br />
                      &#x203A; St.Sylvester's College Kandy
                    </p>
                  </div>
                  <span className="relative top-2 right-0 text-gray-400 text-sm font-semibold" style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
                    2018 - 2020
                  </span>
                </motion.div>
                <motion.div
                  className="flex mb-3 pl-4 pr-0 py-2 bg-gray-800 rounded-lg shadow-lg"
                  variants={{
                    'slide-in': { x: 0, opacity: 1 },
                    'slide-out': { x: -100, opacity: 0 }
                  }}
                  initial="slide-out"
                  animate="slide-in"
                  transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
                >
                  <FaGraduationCap className="w-12 h-12 my-4 mr-4 text-gray-300" />
                  <div>
                    <h4 className="font-bold text-white text-xl">Higher Education</h4>
                    <p
                      className="font-bold text-gray-300"
                      style={{ marginLeft: "20px", fontFamily: "Arial, Helvetica, sans-serif" }}
                    >
                      &#x2022; BSc (Hons) Software Engineering<br />
                      &#x203A; SLIIT (Sri Lanka Institute of Information Technology)
                    </p>
                  </div>
                </motion.div>
              </div>
              <div className="w-full md:w-1/2">
                <motion.img
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"
                  className="w-full rounded-[15px] shadow-lg"
                  alt="Education Background"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 1 }}
                />
              </div>
            </motion.div>
          </div>
        </section>

        <Sidebar />
      </div>
    </div>
  );
};

export default TechStack;