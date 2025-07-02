import { motion, useAnimation } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const GlitchText = ({ text, className }) => {
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();
  const textRef = useRef(null);

  useEffect(() => {
    if (!textRef.current) return;

    const element = textRef.current;
    const letters = element.querySelectorAll('span[data-letter]');
    
    if (isHovered) {
      // Calculate positions of each letter
      const letterPositions = Array.from(letters).map(letter => {
        const rect = letter.getBoundingClientRect();
        const containerRect = element.getBoundingClientRect();
        return rect.left - containerRect.left + rect.width/2;
      });

      // Create jump animation between each letter
      const sequence = letterPositions.map((xPos, index) => ({
        x: xPos,
        y: [0, -20, 0], // Jump up and down
        transition: {
          duration: 0.4,
          ease: [0.2, 0.8, 0.4, 1] // Bouncy easing
        }
      }));

      // Start animation sequence
      controls.start(async () => {
        await controls.start({ opacity: 1, x: letterPositions[0], y: 0 });
        
        for (let i = 0; i < sequence.length; i++) {
          await controls.start(sequence[i]);
        }
      });
    } else {
      controls.start({ 
        opacity: 0,
        x: 0,
        y: 0 
      });
    }
  }, [isHovered]);

  return (
    <motion.span
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Text container with letters */}
      <span 
        ref={textRef} 
        className={`relative inline-block ${isHovered ? "glitch" : ""}`}
      >
        {text.split("").map((letter, index) => (
          <span 
            key={index} 
            data-letter 
            className="inline-block relative px-[2px]"
          >
            {letter}
          </span>
        ))}
      </span>
      
      {/* Jumping ball */}
      <motion.span
        className="absolute bottom-15 left-5 w-4 h-4 bg-blue-500 rounded-full shadow-lg z-10"
        initial={{ opacity: 0 }}
        animate={controls}
        style={{
          transform: 'translate(-120%, -150%)'
        }}
      />
      
      {/* Glitch effect layers */}
      {isHovered && (
        <>
          <span className="glitch-layer before">{text}</span>
          <span className="glitch-layer after">{text}</span>
        </>
      )}
      
      <style jsx>{`
        .glitch {
          position: relative;
          animation: glitch-skew 1s infinite linear alternate-reverse;
        }
        
        .glitch-layer {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          pointer-events: none;
        }
        
        .glitch-layer.before {
          color: #00ffff;
          animation: glitch-before 1s infinite;
          transform: translate(-2px, 2px);
        }
        
        .glitch-layer.after {
          color: #ff00ff;
          animation: glitch-after 0.8s infinite;
          transform: translate(2px, -2px);
        }
        
        @keyframes glitch-skew {
          0% { transform: skew(0deg); }
          10% { transform: skew(2deg); }
          20% { transform: skew(-2deg); }
          30% { transform: skew(1deg); }
          40% { transform: skew(-1deg); }
          50% { transform: skew(0deg); }
          100% { transform: skew(0deg); }
        }
        
        @keyframes glitch-before {
          0% { opacity: 0; }
          10% { opacity: 0.8; transform: translate(-2px, 2px); }
          20% { opacity: 0; }
          30% { opacity: 0.6; transform: translate(-4px, 4px); }
          50% { opacity: 0; }
          100% { opacity: 0; }
        }
        
        @keyframes glitch-after {
          0% { opacity: 0; }
          15% { opacity: 0.7; transform: translate(2px, -2px); }
          25% { opacity: 0; }
          35% { opacity: 0.5; transform: translate(4px, -4px); }
          50% { opacity: 0; }
          100% { opacity: 0; }
        }
      `}</style>
    </motion.span>
  );
};

export default GlitchText;