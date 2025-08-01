import { useEffect, useRef } from "react";
import JetpackCompose from '../assets/images/jetpack-compose.png';

const techStack = [
  { name: "Java", src: "https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/Java-Dark.svg" },
  { name: "JavaScript", src: "https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/JavaScript.svg" },
  { name: "Python", src: "https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/Python-Dark.svg" },
  { name: "HTML5", src: "https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/HTML.svg" },
  { name: "TypeScript", src: "https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/TypeScript.svg" },
  { name: "CSS3", src: "https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/CSS.svg" },
  { name: "C++", src: "https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/CPP.svg" },
  { name: "PHP", src: "https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/PHP-Dark.svg" },
  { name: "Dart", src: "https://www.vectorlogo.zone/logos/dartlang/dartlang-icon.svg", style: { filter: "brightness(0) invert(1)" } },
  { name: "React", src: "https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/React-Dark.svg" },
  { name: "Express.js", src: "https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/ExpressJS-Dark.svg" },
  { name: "Node.js", src: "https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/NodeJS-Dark.svg" },
  { name: "Bootstrap", src: "https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/Bootstrap.svg" },
  { name: "Spring Boot", src: "https://www.vectorlogo.zone/logos/springio/springio-icon.svg" },
  { name: "Tailwind CSS", src: "https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg" },
  { name: "Jetpack Compose", src: JetpackCompose },
  { name: "MySQL", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original-wordmark.svg" },
  { name: "MongoDB", src: "https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/MongoDB.svg" },
  { name: "Oracle", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg" },
  { name: "Firebase", src: "https://www.vectorlogo.zone/logos/firebase/firebase-icon.svg" },
  { name: "GitHub", src: "https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/Github-Dark.svg" },
  { name: "Android Studio", src: "https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/AndroidStudio-Dark.svg" },
  { name: "VS Code", src: "https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/VSCode-Dark.svg" },
  { name: "Postman", src: "https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg" },
  { name: "Git", src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-plain.svg" },
  { name: "Eclipse IDE", src: "https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/Eclipse-Dark.svg" },
  { name: "Figma", src: "https://raw.githubusercontent.com/tandpfun/skill-icons/main/icons/Figma-Dark.svg" },
];

const technicalNames = {
  Java: "Java SE/EE",
  JavaScript: "ECMAScript",
  Python: "Python 3",
  HTML5: "HyperText Markup Language 5",
  TypeScript: "TypeScript",
  CSS3: "Cascading Style Sheets 3",
  "C++": "C++17",
  PHP: "PHP 8",
  Dart: "Dart SDK",
  React: "React.js",
  "Express.js": "Express Framework",
  "Node.js": "Node.js Runtime",
  Bootstrap: "Bootstrap 5",
  "Spring Boot": "Spring Boot Framework",
  "Tailwind CSS": "Tailwind CSS",
  "Jetpack Compose": "Jetpack Compose UI",
  MySQL: "MySQL Database",
  MongoDB: "MongoDB NoSQL",
  Oracle: "Oracle Database",
  Firebase: "Firebase Platform",
  GitHub: "GitHub Version Control",
  "Android Studio": "Android Studio IDE",
  "VS Code": "Visual Studio Code",
  Postman: "Postman API Platform",
  Git: "Git Version Control",
  "Eclipse IDE": "Eclipse IDE",
  Figma: "Figma Design Tool",
};

const TechStackScroll = ({ pageHeight, isMobile }) => {
  const containerRef = useRef(null);
  const iconRefs = useRef([]);
  const itemHeight = isMobile ? 60 : 80; // Smaller icons on mobile
  const itemWidth = isMobile ? 60 : 80; // Width for horizontal scroll

  const updateZoom = () => {
    const center = isMobile ? window.innerWidth / 2 : pageHeight / 2;
    iconRefs.current.forEach((el, index) => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const itemPos = isMobile ? rect.left + rect.width / 2 : rect.top + rect.height / 2;
      const distanceFromCenter = Math.abs(center - itemPos);
      const zoomRange = isMobile ? 100 : 150;
      const scale = distanceFromCenter < zoomRange
        ? 1 + (1 - distanceFromCenter / zoomRange) * 0.5
        : 1;
      el.style.transform = `scale(${scale})`;
      el.style.transition = "transform 2s ease-in-out";
    });
    requestAnimationFrame(updateZoom);
  };

  useEffect(() => {
    let animationFrame;
    const startZoom = () => {
      animationFrame = requestAnimationFrame(updateZoom);
    };
    startZoom();
    return () => cancelAnimationFrame(animationFrame);
  }, [pageHeight, isMobile]);

  useEffect(() => {
    let animationFrame;
    const startZoom = () => {
      animationFrame = requestAnimationFrame(updateZoom);
    };
    startZoom();

    const container = containerRef.current;
    const handleMouseEnter = () => {
      container.querySelector(".scroll-container").style.animationPlayState = "paused";
    };
    const handleMouseLeave = () => {
      container.querySelector(".scroll-container").style.animationPlayState = "running";
    };

    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);
    container.style.pointerEvents = "auto";

    return () => {
      cancelAnimationFrame(animationFrame);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
      container.style.pointerEvents = "none";
    };
  }, [pageHeight, isMobile]);

  return (
    <div
      ref={containerRef}
      className={`absolute ${isMobile ? 'bottom-0 left-0 w-full h-auto' : 'left-5 top-0 w-24 h-[calc(100vh-100px)]'} overflow-hidden pointer-events-none z-50`}
      style={{ marginTop: isMobile ? 0 : "100px" }}
    >
      <style>
        {`
          @keyframes scrollUp {
            0% { transform: translateY(0); }
            100% { transform: translateY(-${techStack.length * itemHeight}px); }
          }
          @keyframes scrollLeft {
            0% { transform: translateX(0); }
            100% { transform: translateX(-${techStack.length * itemWidth}px); }
          }
          .scroll-container {
            animation: ${isMobile ? `scrollLeft ${techStack.length * 2}s linear infinite` : `scrollUp ${techStack.length * 2}s linear infinite`};
            animation-play-state: running;
          }
          .scroll-container.paused {
            animation-play-state: paused;
          }
        `}
      </style>
      <div
        className="scroll-container"
        style={{ 
          display: "flex", 
          flexDirection: isMobile ? "row" : "column", 
          alignItems: "center" 
        }}
      >
        {[...techStack, ...techStack].map((tech, index) => (
          <div
            key={`${tech.name}-${index}`}
            ref={(el) => (iconRefs.current[index] = el)}
            className="relative flex justify-center items-center mx-2 my-4 group"
            style={{ width: isMobile ? 48 : 60, height: isMobile ? 48 : 60 }}
          >
            <img
              src={tech.src}
              alt={tech.name}
              className={`w-${isMobile ? '8' : '12'} h-${isMobile ? '8' : '12'} object-contain transition-transform duration-300 group-hover:scale-120`}
              style={{
                filter: "grayscale(100%)",
                ...tech.style,
                maskImage: `url(${tech.src})`,
                maskSize: "contain",
                WebkitMaskImage: `url(${tech.src})`,
                WebkitMaskSize: "contain",
                background: "linear-gradient(135deg, #60a5fa, #1f2937)",
              }}
            />
            <div
              className="absolute bottom-0 w-full h-4 opacity-30"
              style={{
                background: "linear-gradient(180deg, rgba(96, 165, 250, 0.3), transparent)",
                filter: "blur(4px)",
              }}
            />
            <span
              className={`absolute ${isMobile ? 'bottom-[-25px]' : 'top-[-15px]'} hidden group-hover:block bg-gray-800 text-white text-xs font-mono px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap`}
              style={{ transform: isMobile ? "translateY(10px)" : "translateY(-10px)" }}
            >
              {technicalNames[tech.name] || tech.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechStackScroll;