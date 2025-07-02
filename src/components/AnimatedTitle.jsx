import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const symbols = ["<", "/", ">"];
const symbolSets = [
  [" ", "❰", "|", "*", "&", "#", "^", "~", "❰"],
  [" ", "-", "/", "\\", "=", "!", "$", "/", "/"],
  [" ", ".", "❱", "]", "}", "❱", "❱"]
];

const SymbolSlot = ({ targetSymbol, symbols, isMobile }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let i = 0;
    let interval;

    const startCycle = () => {
      i = 0;
      interval = setInterval(() => {
        if (i < symbols.length) {
          setCurrentIndex(i);
          i++;
        } else {
          clearInterval(interval);
          // Restart cycle after a pause
          setTimeout(startCycle, 2000); // Adjust loop delay (ms)
        }
      }, 100); // Speed of symbol roll
    };

    startCycle();
    return () => clearInterval(interval);
  }, [symbols]);

  return (
    <motion.span
      key={currentIndex}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.1 }}
      className={`inline-block font-mono text-white ${isMobile ? 'text-xl' : 'text-3xl'}`}
    >
      {symbols[currentIndex]}
    </motion.span>
  );
};

const AnimatedTitle = ({ isMobile }) => {
  const [showSymbols, setShowSymbols] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSymbols(true);
    }, 3000); // Delay after main text (adjust as needed)
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`text-center ${isMobile ? 'mt-[-10px]' : 'mt-[-25px]'}`}>
      <AnimatePresence>
        <motion.div
            className="text-blue-400 font-bold font-cursive overflow-hidden"
            initial={{ width: 0 }}
            animate={{ width: "auto" }}
            transition={{ duration: 1.5, delay: 0.1 }}
            style={{
                fontFamily: "cursive",
                fontSize: isMobile ? 24 : 34,
                whiteSpace: "nowrap",
                display: "inline-block",
                borderRight: "1px solid transparent",
            }}
        >
          Full-Stack Developer {" "}
          {!showSymbols ? (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className={isMobile ? 'text-xl' : 'text-3xl'}
            >
              &lt;/&gt;
            </motion.span>
          ) : (
            <span className="inline-flex gap-1 md:gap-2">
              <SymbolSlot targetSymbol="❰" symbols={symbolSets[0]} isMobile={isMobile} />
              <SymbolSlot targetSymbol="/" symbols={symbolSets[1]} isMobile={isMobile} />
              <SymbolSlot targetSymbol="❱" symbols={symbolSets[2]} isMobile={isMobile} />
            </span>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AnimatedTitle;