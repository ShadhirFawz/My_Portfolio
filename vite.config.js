import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import viteImagemin from 'vite-plugin-imagemin';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Enable Fast Refresh with optimized settings
      fastRefresh: true,
      // Use SWC for faster transpilation (replaces Babel)
      babel: {
        plugins: [],
      },
      jsx: 'automatic',
    }),
    tailwindcss(),
    viteImagemin({
      gifsicle: { optimizationLevel: 3 },
      optipng: { optimizationLevel: 7 },
      mozjpeg: { quality: 80 },
      pngquant: { quality: [0.8, 0.9] },
      svgo: { plugins: [{ name: 'removeViewBox', active: false }] },
    }),
  ],
  base: process.env.VITE_BASE_PATH || "https://shadf-portfolio.vercel.app",
  assetsInclude: ["**/*.png", "**/*.pdf", "**/*.jpg", "**/*.jpeg", "**/*.svg"],
  resolve: {
    dedupe: ["react", "react-dom"],
  },
  build: {
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'framer-motion'],
          three: ['three', '@react-three/fiber', '@react-three/drei', '@react-three/postprocessing'], // Split Three.js-related libraries
          ui: ['@material-tailwind/react', '@heroicons/react'], // Split UI libraries
        },
      },
    },
    // Enable code splitting for CSS
    cssCodeSplit: true,
    // Reduce bundle size by removing unused code
    treeshake: 'recommended',
    // Optimize for production with smaller chunks
    chunkSizeWarningLimit: 600, // Increase limit to reduce warnings
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion', 'three', '@react-three/fiber', '@react-three/drei'],
    // Force pre-bundling of dynamic imports
    force: true,
  },
  // Enable caching for faster rebuilds
  cacheDir: 'node_modules/.vite-cache',
  // Enable production-ready optimizations during development
  esbuild: {
    minify: true,
    treeShaking: true,
    target: 'esnext',
  },
  // Optimize CSS with Tailwind
  css: {
    transformer: 'lightningcss', // Use Lightning CSS for faster processing
    lightningcss: {
      drafts: {
        nesting: true,
      },
    },
  },
});