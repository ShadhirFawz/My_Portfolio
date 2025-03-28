import React, { useState } from "react";
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
  UserCircleIcon,
  CodeBracketSquareIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
  Bars2Icon,
  FolderIcon,
} from "@heroicons/react/24/solid";
import { FcContacts } from "react-icons/fc";
import { GrGithub } from "react-icons/gr";
import FuilioImg from "../assets/images/FuilioImg.jpg"
import PharmacyImg from "../assets/images/PharmacyImg.png"
import SaloonImg from "../assets/images/SaloonImg.png"

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

// Status-based color mapping
const statusColors = {
  Completed: "bg-green-500",
  "In Progress": "bg-yellow-500",
  "On Hold": "bg-red-500",
};

// Project links for dropdown menu
const projectLinks = [
  {
    title: "Fuilio_App",
    link: "https://github.com/ShadhirFawz/Fuilio_App",
    description: "Based on the environmental sustainability criteria, addressing the problems faced by the residents related to environment.The app was streamlined with many features which includes garbage management, a reward based system for the collected garbages, a tree donation and plantation management. Visit the project for more ...",
    image: FuilioImg,
    status: "Completed",
  },
  {
    title: "Pharmacy and Lab Management System",
    link: "https://github.com/ShadhirFawz/Pharmacy-management-MERN",
    description: "Online system which cover both pharmacy and laboratory sectors includingbuying and selling medicines, make lab test appointments and download test reports when available delivery facilities and much more features",
    image: PharmacyImg,
    status: "Completed",
  },
];

export default function ProjectsMenu() {
  const [hoveredProject, setHoveredProject] = useState(null);

  return (
    <div className="relative group">
      {/* Projects Button */}
      <button className="flex items-center gap-2 font-medium text-blue-600 px-6 py-2 rounded-lg transition-all hover:bg-gray-800">
        <CodeBracketSquareIcon className="h-5 w-5" />
        Projects
        <ChevronDownIcon className="h-4 w-4 transition-transform group-hover:rotate-180" />
      </button>

      {/* Dropdown */}
      <div className="absolute right-2 top-11.5 w-120 bg-gray-900 shadow-lg rounded-lg hidden group-hover:block">
        <h3 className="text-white text-lg font-light px-4 py-2 border-b border-gray-700 flex items-center gap-2">
          <FolderIcon className="h-5 w-5 text-blue-400" /> Recent Projects
        </h3>
        {projectLinks.map((project, index) => (
          <div
          key={index}
          className="relative flex items-start p-3 space-x-3 hover:bg-gray-800 rounded-lg cursor-pointer transition-all"
          onMouseEnter={() => setHoveredProject(project)}
        >
          {/* Status Indicator */}
          <div className="absolute bottom-2 right-2 flex items-center gap-1 text-sm text-white">
            <span>{project.status}</span>
            <div className={`h-3 w-3 rounded-full ${statusColors[project.status]}`} />
          </div>
            <div className="w-1/4">
              <img src={project.image} alt={project.title} className="w-full h-auto rounded-md" />
            </div>
            <div className="w-3/4">
              <h3 className="text-white font-light">{project.title}</h3>
              <p className="text-gray-400 text-sm">{project.description}</p>
              {/* View Project Link with Hover Effect */}
              <a
                href={project.link}
                className="text-blue-400 underline flex items-center gap-1 transition-all hover:gap-2"
                style={{ fontFamily: "Times New Roman" , fontSize: "15px"}}
              >
                View Project
                <span className="ml-1 transition-transform transform translate-x-1 group-hover:-translate-x-1">  →</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Navbar Links (Projects + Contact)
function NavList() {
  return (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
      <ProjectsMenu />
      <Typography as="a" target="_blank" rel="noopener noreferrer" href="https://github.com/ShadhirFawz" className="font-medium">
        <MenuItem className="flex items-center gap-2 lg:rounded-full">
        <GrGithub className="h-[24px] w-[20px]" />
        </MenuItem>
      </Typography>
    </ul>
  );
}

export function ComplexNavbar() {
  const [isNavOpen, setIsNavOpen] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 960) setIsNavOpen(false);
    });
  }, []);

  return (
    <Navbar style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }} className="mx-auto max-w-5xl p-1.5 lg:rounded-full lg:pl-6">
      <div className="relative mx-2.5 flex items-center justify-between">
        <div class="rounded-md h-7 w-7 border-4 border-t-4 border-blue-500 animate-spin absolute"></div>
        <div className="flex">
          <Typography as="a" href="/" className="mr-4 ml-12 cursor-pointer" style={{ fontFamily: "Times New Roman" }}>
            MY PORTFOLIO
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
  );
}
