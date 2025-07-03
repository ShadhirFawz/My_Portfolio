import React, { useState, useEffect, useRef } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  IconButton,
} from "@material-tailwind/react";
import {
  CodeBracketSquareIcon,
  ChevronDownIcon,
  Bars2Icon,
  FolderIcon,
  HomeIcon
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { GrHome } from "react-icons/gr";
import FuilioImg from "../assets/images/FuilioImg.jpg";
import CSpace from "../assets/images/CSpaceImg.jpg"
import PharmacyImg from '../assets/images/PharmacyImg.png';
import { motion } from "framer-motion";

// Status-based color mapping
const statusColors = {
  Completed: "bg-green-500",
  "In Progress": "bg-yellow-500",
  "On Hold": "bg-red-500",
};

// Project links for dropdown menu
const projectLinks = [
  {
    title: "CSpace",
    link: "https://github.com/ShadhirFawz/REST-Countries",
    description: "RestCountries API based project with responsive and intuiative user interface. Features include browse countries, add to favorites, make notes for each countries",
    image: CSpace,
    status: "Completed",
  },
  {
    title: "Pharmacy and Lab Management System",
    link: "https://github.com/ShadhirFawz/Pharmacy-management-MERN",
    description: "Online system which cover both pharmacy and laboratory sectors including buying and selling medicines, make lab test appointments and download test reports when available delivery facilities and much more features",
    image: PharmacyImg,
    status: "Completed",
  },
  {
    title: "Fuilio_App",
    link: "https://github.com/ShadhirFawz/Fuilio_App",
    description: "This is a Flutter Firebase Project that integrates Flutter for the frontend and Firebase for backend services like authentication, Firestore, and cloud functions.",
    image: FuilioImg,
    status: "Completed",
  },
];

// Tech stack data for each project (icons from react-icons or custom)
const techStacks = {
  CSpace: [
    { name: " ", image: "https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/MongoDB.svg" },
    { name: " ", image: "https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/React-Dark.svg" },
    { name: " ", image: "https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/TailwindCSS-Dark.svg" },
    { name: " ", image: "https://www.vectorlogo.zone/logos/framer/framer-icon.svg" },
  ],
  "Pharmacy and Lab Management System": [
    { name: " ", image: "https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/MongoDB.svg" },
    { name: " ", image: "https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/React-Dark.svg" },
    { name: " ", image: "https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/NodeJS-Dark.svg" },
    { name: " ", image: "https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/ExpressJS-Dark.svg" },
  ],
  Fuilio_App: [
    { name: " ", image: "https://www.vectorlogo.zone/logos/dartlang/dartlang-icon.svg" },
    { name: " ", image: "https://www.vectorlogo.zone/logos/firebase/firebase-icon.svg" },
    { name: " ", image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/swift/swift-original.svg" },
  ],
};

function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button variant="text" className="flex items-center gap-1 rounded-full">
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
    </Menu>
  );
}

export default function ProjectsMenu() {
  const [hoveredProject, setHoveredProject] = useState(null);
  const dropdownRef = useRef(null);
  const projectsContainerRef = useRef(null);

  const handleMouseEnter = (project) => {
    setHoveredProject(project);
  };

  const handleMouseLeave = () => {
    setHoveredProject(null);
  };

  return (
    <div className="relative group">
      {/* Projects Button (unchanged) */}
      <button 
      className="flex items-center gap-2 font-medium text-whie px-6 py-2 rounded-lg transition-all hover:bg-gray-800"
      style={{fontFamily: "revert"}}>
        <CodeBracketSquareIcon className="h-5 w-5" />
        Projects
        <ChevronDownIcon className="h-4 w-4 transition-transform group-hover:rotate-180" />
      </button>

      {/* Dropdown Container */}
      <div
        className="absolute right-2 top-11.5 w-120 bg-gray-900 shadow-lg rounded-lg hidden group-hover:block"
        ref={dropdownRef}
      >
        <h3 className="text-white text-lg font-light px-4 py-2 border-b border-gray-700 flex items-center gap-2">
          <FolderIcon className="h-5 w-5 text-blue-400" /> Recent Projects
        </h3>
        
        {/* Projects List with Scroll */}
        <div
          className="max-h-96 overflow-y-auto"
          ref={projectsContainerRef}
          style={{ scrollbarWidth: 'none' }}
        >
          <style>{`.max-h-96::-webkit-scrollbar { display: none; }`}</style>
          
          {projectLinks.map((project, index) => (
            <div
              key={index}
              className="relative flex items-start p-3 space-x-3 hover:bg-gray-800 rounded-lg cursor-pointer transition-all"
              onMouseEnter={() => handleMouseEnter(project)}
              onMouseLeave={handleMouseLeave}
            >
              {/* Status Indicator */}
              <div className="absolute bottom-2 right-2 flex items-center gap-1 text-sm text-white">
                <span>{project.status}</span>
                <div className={`h-3 w-3 rounded-full ${statusColors[project.status]}`} />
              </div>
              
              {/* Project Image */}
              <div className="w-1/4">
                <img
                  src={project.image}
                  alt={project.title}
                  className={`rounded-md ${index === 0 || index === 2 ? "w-20 h-40" : "w-fit h-fit"}`}
                />
              </div>
              
              {/* Project Details */}
              <div className="w-3/4">
                <h3 className="text-white font-light">{project.title}</h3>
                <p className="text-gray-400 text-sm">{project.description}</p>
                <a
                  href={project.link}
                  className="text-blue-400 underline flex items-center gap-1 transition-all hover:gap-2"
                  style={{fontFamily: "sans-serif"}}
                >
                  View Project
                  <span className="ml-1 transition-transform transform translate-x-1 group-hover:-translate-x-1">→</span>
                </a>
              </div>
            </div>
          ))}
          <div className="sticky bottom-0 bg-gray-900 border-t border-gray-700 p-2 text-center rounded-br-2xl rounded-bl-2xl">
            <Link
              to="/projects" 
              className="text-blue-400 hover:text-blue-300 transition-colors flex items-center justify-center gap-1"
              style={{fontFamily: "'Roboto', sans-serif", fontWeight: "normal"}}
            >
              View All Projects
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={1.5} 
                stroke="currentColor" 
                className="w-4 h-4"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Fixed Position Tech Stack Display */}
        {hoveredProject && (
          <motion.div
            className="absolute left-full ml-4 bg-gray-800 border border-gray-600 rounded-lg shadow-xl z-50"
            initial={{ x: -20, opacity: 0 }}
            animate={{ 
              x: 0, 
              opacity: 1,
              top: `calc(50% - 100px)` // Centered vertically relative to viewport
            }}
            exit={{ x: -20, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{ width: "60px" }}
          >
            {/* Arrow pointing to the projects */}
            <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-0 h-0 border-8 border-transparent border-r-gray-800" />
            
            {/* Dialog Header */}
            <div className="bg-gray-700 px-4 py-2 border-b border-gray-600 flex justify-center">
              <CodeBracketSquareIcon className="h-5 w-5 text-white" />
            </div>
            
            {/* Tech Stack Icons */}
            <div className="p-4 flex flex-col gap-3">
              {techStacks[hoveredProject.title].map((tech, idx) => (
                <motion.div
                  key={`${hoveredProject.title}-${idx}`}
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.2, duration: 0.3, ease: "easeOut" }}
                  className="flex items-center gap-3"
                >
                  <img src={tech.image} alt={tech.name} className="h-fit w-fit object-contain" />
                  <span className="text-white text-sm">{tech.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

// Navbar Links (Projects + Contact)
function NavList() {
  return (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
      <ProjectsMenu />
      <Typography as="a" target="_blank" rel="noopener noreferrer" className="font-medium">
        <Link to="/">
          <MenuItem className="flex items-center gap-2 lg:rounded-full">
            <HomeIcon className="h-[24px] w-[20px]" />
          </MenuItem>
        </Link>
      </Typography>
    </ul>
  );
}

export function ComplexNavbar() {
  const [isNavOpen, setIsNavOpen] = React.useState(false);
  const [isMounted, setIsMounted] = useState(false);

  React.useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 960) setIsNavOpen(false);
    });
  }, []);

  useEffect(() => {
    setIsMounted(true); // Trigger animation after mount
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 960) setIsNavOpen(false);
    });
    return () => window.removeEventListener("resize", () => {});
  }, []);

  return (
    <motion.div
      initial={{ x: "100vw", opacity: 0 }} // Start fully off-screen right
      animate={isMounted ? { x: 0, opacity: 1 } : {}}
      transition={{ 
        type: "spring", 
        stiffness: 80, 
        damping: 20,
        delay: 0.5,
      }}
      style={{
        position: "relative", // Prevents layout shift
        top: 0,
        right: 0,
        width: "100%", // Ensures full width
        maxWidth: "1200px", // Match your navbar's max-width
        margin: "2 bottom", // Center horizontally
      }}
    >
      <Navbar style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }} className="mx-auto max-w-5xl p-1.5 lg:rounded-full lg:pl-6">
        <div className="relative mx-2.5 flex items-center justify-between">
          <div class="rounded-md h-7 w-7 border-4 border-t-4 border-blue-500 animate-spin absolute"></div>
          <div className="flex">
            <Typography as="a" href="/" className="mr-4 ml-12 cursor-default" style={{ fontFamily: "Times New Roman" }}>
            <Link to="/" className="cursor-default">
              MY PORTFOLIO
            </Link>
            </Typography>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <NavList />
          </div>

          {/* Mobile Navigation Toggle */}
          <IconButton
            size="sm"
            variant="text"
            onClick={() => setIsNavOpen((prev) => !prev)}
            className="ml-auto mr-2 lg:hidden"
          >
            <Bars2Icon className="h-6 w-6" />
          </IconButton>
        </div>

        {/* Mobile Navigation */}
        <MobileNav open={isNavOpen} className="overflow-scroll">
          <NavList />
        </MobileNav>
      </Navbar>
    </motion.div>
  );
}