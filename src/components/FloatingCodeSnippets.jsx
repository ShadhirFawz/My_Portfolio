import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

// Sample code snippets for display
const codeSnippets = [
  "const App = () => <div>Hello World</div>",
  "useState(0)",
  "function handleClick() { }",
  "{ props.children }",
  "useEffect(() => {}, [])",
  "<motion.div animate={{ x: 100 }} />",
  "return <Component />",
];

const FloatingCodeSnippets = () => {
  const shouldReduceMotion = useReducedMotion();
  const [snippets, setSnippets] = useState([]);

  // Function to generate new snippets
  const resetSnippets = () => {
    const newSnippets = Array.from({ length: 8 }).map((_, index) => ({
      id: Date.now() + index, // Unique ID to avoid key conflicts
      text: codeSnippets[Math.floor(Math.random() * codeSnippets.length)],
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      duration: 5 + Math.random() * 5, // Random duration between 5-10s
      delay: Math.random() * 2, // Random start delay
    }));
    setSnippets(newSnippets);
  };

  // Initialize and loop every 30 seconds
  useEffect(() => {
    resetSnippets(); // Initial setup
    const interval = setInterval(resetSnippets, 3000); // Loop every 30s

    return () => clearInterval(interval); // Cleanup interval
  }, []);

  // Animation variants for floating effect
  const variants = (yStart) => ({
    initial: {
      y: yStart,
      opacity: 0,
    },
    animate: shouldReduceMotion
      ? { y: yStart, opacity: 0.2 }
      : {
          y: yStart - window.innerHeight - 100,
          opacity: [0, 0.3, 0.3, 0],
          transition: {
            y: { duration: 8, ease: "linear" },
            opacity: { duration: 8, times: [0, 0.2, 0.8, 1] },
            repeat: Infinity,
            repeatDelay: Math.random() * 3,
          },
        },
  });

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {snippets.map((snippet) => (
        <motion.div
          key={snippet.id}
          className="absolute text-cyan-400 text-sm font-mono opacity-20 select-none"
          style={{
            left: snippet.x,
            top: snippet.y,
            transform: "translate(-50%, 0)",
          }}
          variants={variants(snippet.y)}
          initial="initial"
          animate="animate"
          transition={{
            delay: snippet.delay,
            duration: snippet.duration,
          }}
        >
          {snippet.text}
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingCodeSnippets;