import React from 'react';
import { motion } from 'framer-motion';

export default function AnimatedCloseButton({ onClick }) {
    return (
        <motion.button
            onClick={onClick}
            className="absolute top-2 right-6 flex items-center justify-center z-[60] rounded-full bg-gray-500/100 hover:bg-gray-500/70 backdrop-blur-sm p-2 transition-colors cursor-pointer"
            whileTap={{ 
                scale: 0.9,
                rotate: 0
            }}
            initial={{ opacity: 0 }}
            animate={{ 
                opacity: 1,
                rotate: 0
            }}
            exit={{ opacity: 0 }}
        >
            <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                whileHover={{ 
                    rotate: -90,
                    transition: { duration: 0.3 }
                }}
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </motion.svg>
        </motion.button>
    );
}