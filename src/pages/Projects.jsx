import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ComplexNavbar } from "../components/Navbar";
import FuilioImg from "../assets/images/FuilioImg.jpg";
import CSpace from "../assets/images/CSpaceImg.jpg";
import SaloonImg from '../assets/images/SaloonImg.png';
import PharmacyImg from '../assets/images/PharmacyImg.png';
import EcosphereImg from '../assets/images/ecosphere1.png';
import Sidebar from "../components/Sidebar";

const Projects = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const projects = [
    {
      id: 0,
      title: "EcoSphere",
      type: "Flutter",
      year: "2024",
      description: "Based on the environmental sustainability criteria, addressing the problems faced by the residents related to environment. The app was streamlined with many features which includes garbage management, a reward based system for the collected garbages, a tree donation and plantation management.",
      techStack: [
        { name: "Dart", icon: "https://www.vectorlogo.zone/logos/dartlang/dartlang-icon.svg", link: "https://dart.dev" },
        { name: "Firebase", icon: "https://www.vectorlogo.zone/logos/firebase/firebase-icon.svg", link: "https://firebase.google.com" },
        { name: "Swift", icon: "https://www.vectorlogo.zone/logos/swift/swift-icon.svg", link: "https://developer.apple.com/swift/" },
        { name: "HTML", icon: "https://www.vectorlogo.zone/logos/w3_html5/w3_html5-icon.svg", link: "https://developer.mozilla.org/en-US/docs/Web/HTML" }
      ],
      image: EcosphereImg,
      projectLink: "https://github.com/ShadhirFawz/EcoSphere_App"
    },
    {
      id: 1,
      title: "BPMS",
      type: "Full - Stack Dev",
      year: "2023",
      description: "An Online Beauty Saloon website build for customers to make appointments for the saloon packages available. The site contains three characters mainly the Admin, Beautician and Customers.",
      techStack: [
        { name: "PHP", icon: "https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/PHP-Dark.svg", link: "https://www.php.net/" },
        { name: "JavaScript", icon: "https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/JavaScript.svg", link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
        { name: "CSS", icon: "https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/CSS.svg", link: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
        { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original-wordmark.svg", link: "https://www.mysql.com/" }
      ],
      image: SaloonImg,
      projectLink: "https://github.com/ShadhirFawz/Beauty-Saloon"
    },
    {
      id: 2,
      title: "HPL System",
      type: "Mern Stack",
      year: "2024",
      description: "Online system which cover both pharmacy and laboratory sectors including buying and selling medicines, make lab test appointments and download test reports when available delivery facilities and much more features",
      techStack: [
        { name: "JavaScript", icon: "https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/JavaScript.svg", link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
        { name: "MongoDB", icon: "https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/MongoDB.svg", link: "https://www.mongodb.com/" },
        { name: "React.js", icon: "https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/React-Dark.svg", link: "https://reactjs.org/" },
        { name: "Node.js", icon: "https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/NodeJS-Dark.svg", link: "https://nodejs.org/" },
        { name: "Express.js", icon: "https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/ExpressJS-Dark.svg", link: "https://expressjs.com/" }
      ],
      image: PharmacyImg,
      projectLink: "https://github.com/ShadhirFawz/Pharmacy-management-MERN"
    },
    {
      id: 3,
      title: "FuiLio_App",
      type: "Flutter",
      year: "2024",
      description: "This project utilizes Flutter framework using Dart, allowing vehicle owners to track their vehicle expenses seamlessly. The app is efficient to handle multiple vehicles at the same time. Integrated with Firebase, as the primary data storage platform with authentication for users to ensuer security for user credentials.",
      techStack: [
        { name: "Dart", icon: "https://www.vectorlogo.zone/logos/dartlang/dartlang-icon.svg", link: "https://dart.dev" },
        { name: "Firebase", icon: "https://www.vectorlogo.zone/logos/firebase/firebase-icon.svg", link: "https://firebase.google.com" },
        { name: "Swift", icon: "https://www.vectorlogo.zone/logos/swift/swift-icon.svg", link: "https://developer.apple.com/swift/" },
        { name: "HTML", icon: "https://www.vectorlogo.zone/logos/w3_html5/w3_html5-icon.svg", link: "https://developer.mozilla.org/en-US/docs/Web/HTML" }
      ],
      image: FuilioImg,
      projectLink: "https://github.com/ShadhirFawz/Fuilio_App/tree/master"
    },
    {
      id: 4,
      title: "CSpace",
      type: "Full - Stack Dev",
      year: "2025",
      description: "RestCountries API based project with responsive and intuiative user interface. Features include browse countries, add to favorites, make notes for each countries.",
      techStack: [
        { name: "React.js", icon: "https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/React-Dark.svg", link: "https://reactnative.dev/" },
        { name: "TailwindCss", icon: "https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/TailwindCSS-Dark.svg", link: "https://tailwindcss.com/" },
        { name: "Motion", icon: "https://www.vectorlogo.zone/logos/framer/framer-icon.svg", link: "https://motion.dev/" },
        { name: "Express.js", icon: "https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/ExpressJS-Dark.svg", link: "https://expressjs.com/" },
        { name: "MongoDB", icon: "https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/MongoDB.svg", link: "https://www.mongodb.com/" }
      ],
      image: CSpace,
      projectLink: "https://github.com/ShadhirFawz/REST-Countries"
    }
  ];

  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleCardClick = (index) => {
    setActiveIndex(index);
  };

  const getCardPosition = (index, activeIndex, totalCards) => {
    const position = (index - activeIndex + totalCards) % totalCards;
    if (position === 0) {
      return { className: "active", zIndex: 10, opacity: 1, transform: "translateX(0) scale(1)", x: 0 };
    } else if (position === 1) {
      return { className: "right", zIndex: 5, opacity: 0.7, transform: "translateX(25%) scale(0.9)", x: 25 };
    } else if (position === totalCards - 1) {
      return { className: "left", zIndex: 5, opacity: 0.7, transform: "translateX(-25%) scale(0.9)", x: -25 };
    } else {
      return { className: "hidden", zIndex: 0, opacity: 0, transform: "translateX(0) scale(0.8)", x: 0 };
    }
  };

  if (isMobile) {
    return (
      <div className="fixed inset-0 overflow-y-auto">
        <div 
          className="fixed inset-0 bg-gradient-to-l from-purple-900/90 via-black to-blue-900/80 p-4 md:p-6"
          onMouseMove={handleMouseMove}
        >
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
    <div className="fixed inset-0 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-gradient-to-l from-purple-900/90 via-black to-blue-900/80 p-4 md:p-6"
        onMouseMove={handleMouseMove}
        style={{
          background: `
            radial-gradient(circle at 20% 20%, rgba(75, 0, 130, 0.4), rgba(0, 0, 0, 0.8)),
            radial-gradient(circle at 80% 50%, rgba(0, 191, 255, 0.3), rgba(0, 0, 0, 0.8)),
            radial-gradient(circle at 30% 80%, rgba(138, 43, 226, 0.3), rgba(0, 0, 0, 0.8)),
            linear-gradient(to left, rgba(75, 0, 130, 0.9), rgba(0, 0, 0, 1), rgba(0, 71, 171, 0.8))
          `,
        }}
      >
        {/* Mouse hover effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          transition={{ duration: 0.3 }}
        />

        {/* Navbar Placeholder */}
        <div className="fixed top-10 left-55 w-full h-[80px] bg-transparent z-80">
          <ComplexNavbar />
        </div>

        {/* Main container */}
        <div className="container mx-auto h-full flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 py-8 pt-20">
          {/* Left wheel - Narrower Project cards */}
          <div className="w-full md:w-[30%] max-w-sm h-[500px] relative">
            {projects.map((project, index) => {
              const { className, zIndex, opacity, transform, x } = getCardPosition(index, activeIndex, projects.length);

              return (
                <motion.div
                  key={project.id}
                  className={`absolute inset-0 bg-gray-800 rounded-xl shadow-lg overflow-visible cursor-pointer transition-all duration-300 flex flex-col z-${zIndex} ${className} ${index === activeIndex ? 'border border-blue-400' : 'border border-gray-700'}`}
                  style={{ 
                    opacity, 
                    transform,
                    boxShadow: `
                      0 -10px 15px -5px rgba(75, 0, 130, 0.4),
                      0 -5px 10px -3px rgba(138, 43, 226, 0.3),
                      0 10px 15px -5px rgba(0, 191, 255, 0.3),
                      0 5px 10px -3px rgba(138, 43, 226, 0.2)
                    `
                  }}
                  animate={{ x: `${x}%`, scale: className === "active" ? 1 : className === "hidden" ? 0.8 : 0.9 }}
                  transition={{ type: "tween", duration: 0.15, ease: "easeInOut" }}
                  onClick={() => handleCardClick(index)}
                  whileHover={{ scale: className === "active" ? 1.02 : 0.95 }}
                >
                  <div className="p-4 h-full flex flex-col">
                    <h1 className="text-xl font-bold text-center text-white mb-3 opacity-85" style={{ fontFamily: "'Palatino Linotype', 'Book Antiqua', serif" }}>
                      {project.title}
                    </h1>
                    <div className="flex justify-center mb-3">
                      <span className="text-xs text-gray-400 uppercase font-bold tracking-wider">Tech Stack</span>
                    </div>
                    <div className="flex flex-col items-center gap-3 mb-3">
                      {Array.from({ length: Math.ceil(project.techStack.length / 3) }).map((_, rowIndex) => (
                        <div key={rowIndex} className="flex justify-center gap-4 w-full">
                          {project.techStack.slice(rowIndex * 3, rowIndex * 3 + 3).map((tech, i) => (
                            <a 
                              key={i} 
                              href={tech.link} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="group flex flex-col items-center"
                            >
                              <div className="w-12 h-12 flex items-center justify-center p-1 bg-gray-700 rounded-lg transition-all duration-300 group-hover:bg-blue-900 group-hover:scale-110">
                                <img 
                                  src={tech.icon} 
                                  alt={tech.name} 
                                  className="w-full h-full object-contain"
                                />
                              </div>
                              <span className="text-xs font-bold text-gray-300 mt-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                                {tech.name}
                              </span>
                            </a>
                          ))}
                        </div>
                      ))}
                    </div>
                    <hr className="border-t-3 border-gray-500 my-2 mx-auto w-3/4 rounded-full" />
                    <div className="flex-grow flex items-center justify-center p-1 overflow-visible">
                      <motion.div 
                        className="relative h-full w-full flex items-center justify-center"
                        whileHover={{ scale: 1.03 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <img 
                          src={project.image} 
                          alt={project.title} 
                          className="max-h-[220px] object-contain rounded-lg"
                          style={{ 
                            width: "auto",
                            transform: project.id === 3 ? "translateY(-15px) scale(0.9)" : "none",
                            filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))"
                          }}
                        />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right wheel - Project details (same width) */}
          <motion.div 
            className="w-auto lg:ml-20 md:w-[60%] lg:w-[50%] bg-gray-800 rounded-xl shadow-lg p-6 h-[465px] overflow-y-auto z-75"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="h-full flex flex-col">
              <h1 className="text-2xl font-bold text-white mb-3 opacity-80" style={{ fontFamily: "'Times New Roman', serif" }}>
                {projects[activeIndex].title}
              </h1>
              
              <div className="flex items-center mb-4">
                <span className="text-blue-400 text-sm uppercase font-bold mr-3 tracking-wider" style={{ fontFamily: "Arial, sans-serif" }}>
                  {projects[activeIndex].type}
                </span>
                <span className="text-gray-400 text-sm">{projects[activeIndex].year}</span>
              </div>
              
              <p className="text-gray-300 text-sm mb-4 leading-relaxed" style={{ fontFamily: "sans-serif" }}>
                {projects[activeIndex].description}
              </p>
              
              {/* Tech Stack Categorization */}
              <div className="mb-4">
                {/* Frontend Section */}
                <div className="mb-3">
                  <h3 className="text-sm font-semibold text-blue-300 mb-1"
                      style={{ fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif" }}
                  >
                    Frontend:</h3>
                  <div className="flex flex-wrap gap-2">
                    {projects[activeIndex].techStack
                      .filter(tech => ['Dart', 'JavaScript', 'React.js', 'HTML', 'CSS', 'Swift', 'Motion'].includes(tech.name))
                      .map((tech, i) => (
                        <div key={`front-${i}`} className="flex items-center gap-1 bg-gray-700 px-2 py-1 rounded-md">
                          <img 
                            src={tech.icon} 
                            alt={tech.name} 
                            className="w-4 h-4 object-contain"
                          />
                          <span className="text-xs text-gray-200">{tech.name}</span>
                        </div>
                      ))}
                  </div>
                </div>
                
                {/* Backend Section */}
                <div className="mb-3">
                  <h3 className="text-sm font-semibold text-blue-300 mb-1"
                      style={{ fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif" }}
                  >
                    Backend:</h3>
                  <div className="flex flex-wrap gap-2">
                    {projects[activeIndex].techStack
                      .filter(tech => ['PHP', 'Node.js', 'Express.js', 'Firebase'].includes(tech.name))
                      .map((tech, i) => (
                        <div key={`back-${i}`} className="flex items-center gap-1 bg-gray-700 px-2 py-1 rounded-md">
                          <img 
                            src={tech.icon} 
                            alt={tech.name} 
                            className="w-4 h-4 object-contain"
                          />
                          <span className="text-xs text-gray-200">{tech.name}</span>
                        </div>
                      ))}
                  </div>
                </div>
                
                {/* Database Section */}
                <div className="mb-3">
                  <h3 className="text-sm font-semibold text-blue-300 mb-1"
                      style={{ fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif" }}
                  >
                    Database:</h3>
                  <div className="flex flex-wrap gap-2">
                    {projects[activeIndex].techStack
                      .filter(tech => ['MySQL', 'MongoDB', 'Firebase'].includes(tech.name))
                      .map((tech, i) => (
                        <div key={`db-${i}`} className="flex items-center gap-1 bg-gray-700 px-2 py-1 rounded-md">
                          <img 
                            src={tech.icon} 
                            alt={tech.name} 
                            className="w-4 h-4 object-contain"
                          />
                          <span className="text-xs text-gray-200">{tech.name}</span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              
              <button 
                onClick={() => window.open(projects[activeIndex].projectLink, '_blank')}
                className="scroll-mt-20 scroll-mb-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-5 rounded-lg transition-all duration-300 self-start text-sm"
                style={{fontFamily: "revert"}}
              >
                See Project
              </button>
            </div>
          </motion.div>
        </div>
        <Sidebar />
      </div>
    </div>
  );
};

export default Projects;