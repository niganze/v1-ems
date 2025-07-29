import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import event1 from '../assets/event1.jpg';
import event2 from '../assets/event2.jpg';
import event3 from '../assets/event3.jpg';
import event4 from '../assets/ebent4.jpg';

const bgImages = [event1, event2, event3, event4];
const subheadline = 'For 25 years, we have helped clients build effective global influence platforms to engage their audiences.';

const BrandStory: React.FC = () => {
  const [bgIndex, setBgIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setBgIndex(i => (i + 1) % bgImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.section
      className="w-full min-h-[60vh] flex flex-col md:flex-row items-stretch bg-gradient-to-br from-indigo-900 via-purple-900 to-violet-900 overflow-hidden relative"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.7 }}
    >
      {/* Left: Text */}
      <div className="flex-1 flex flex-col justify-center px-8 py-16 md:py-24 z-10 relative">
        <span className="text-lg font-bold mb-4 tracking-widest text-[#BFA46F]">OUR BRAND STORY</span>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-8" style={{fontFamily: 'serif'}}>
          We are a global brand<br />
          experience & event<br />
          communications agency.
        </h1>
      </div>
      {/* Right: Slideshow and animated card */}
      <div className="flex-1 relative min-h-[350px] md:min-h-0 flex items-center justify-center">
        {/* Slideshow */}
        <AnimatePresence mode="wait">
          {bgImages.map((img, i) =>
            i === bgIndex ? (
              <motion.div
                key={img}
                className="absolute inset-0 w-full h-full bg-cover bg-center grayscale rounded-l-3xl"
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 1.2 }}
                style={{ backgroundImage: `url(${img})` }}
              />
            ) : null
          )}
        </AnimatePresence>
        <div className="absolute inset-0 bg-emsPurple/60 rounded-l-3xl" />
        {/* Animated subheadline card */}
        <motion.div
          className="relative z-10 max-w-lg w-full mx-auto px-8 py-6 bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 text-white text-lg md:text-xl animate-pulse"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
        >
          {subheadline}
        </motion.div>
        {/* Accent number and line */}
        <div className="absolute bottom-10 left-10 flex items-end gap-4 z-10">
          <span className="text-white text-3xl md:text-4xl font-light tracking-widest">01</span>
          <span className="block w-16 h-0.5 bg-white/60 mb-2" />
        </div>
      </div>
    </motion.section>
  );
};

export default BrandStory;
