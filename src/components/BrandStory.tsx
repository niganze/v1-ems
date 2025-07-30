
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
      className="w-full min-h-[60vh] flex flex-col md:flex-row items-stretch bg-black overflow-hidden relative"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.7 }}
    >
      {/* Subtle background glow effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-emsPurple/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-emsBlue/10 rounded-full blur-3xl"></div>
      </div>

      {/* Left: Text */}
      <div className="flex-1 flex flex-col justify-center px-8 py-16 md:py-24 z-10 relative">
        <span className="text-lg font-bold mb-4 tracking-widest text-emsOrange">OUR BRAND STORY</span>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-emsWhite leading-tight mb-8 overflow-hidden" style={{fontFamily: 'serif'}}>
          {/* Animated text with stagger effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {["We are a global brand", "experience & event", "communications agency."].map((line, lineIndex) => (
              <div key={lineIndex} className="block overflow-hidden">
                <motion.span
                  className="inline-block"
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.5 + lineIndex * 0.2,
                    ease: [0.25, 0.25, 0.25, 0.75]
                  }}
                >
                  {line.split(' ').map((word, wordIndex) => (
                    <motion.span
                      key={wordIndex}
                      className="inline-block mr-3 relative"
                      initial={{ opacity: 0, y: 50, rotateX: -90 }}
                      animate={{ opacity: 1, y: 0, rotateX: 0 }}
                      transition={{
                        duration: 0.6,
                        delay: 0.7 + lineIndex * 0.3 + wordIndex * 0.1,
                        ease: "easeOut"
                      }}
                      whileHover={{
                        scale: 1.05,
                        color: "#3FA9F5", // emsBlue color
                        transition: { duration: 0.2 }
                      }}
                    >
                      {/* Word with gradient shimmer effect */}
                      <span className="relative inline-block">
                        {word}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-emsBlue/30 to-transparent"
                          initial={{ x: '-100%', opacity: 0 }}
                          animate={{ x: '200%', opacity: [0, 1, 0] }}
                          transition={{
                            duration: 1.5,
                            delay: 1 + lineIndex * 0.3 + wordIndex * 0.1,
                            ease: "easeInOut"
                          }}
                        />
                      </span>
                    </motion.span>
                  ))}
                </motion.span>
              </div>
            ))}
          </motion.div>
          
          {/* Animated underline */}
          <motion.div
            className="w-full h-1 bg-gradient-to-r from-emsBlue via-emsPurple to-emsPink mt-4 rounded-full"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{
              duration: 1.2,
              delay: 2.5,
              ease: "easeInOut"
            }}
            style={{ transformOrigin: 'left' }}
          />
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
          className="relative z-10 max-w-lg w-full mx-auto px-8 py-6 bg-emsWhite/10 backdrop-blur-md rounded-2xl shadow-2xl border border-emsWhite/10 text-emsWhite text-lg md:text-xl animate-pulse"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
        >
          {subheadline}
        </motion.div>
        
        {/* Accent number and line */}
        <div className="absolute bottom-10 left-10 flex items-end gap-4 z-10">
          <span className="text-emsWhite text-3xl md:text-4xl font-light tracking-widest">01</span>
          <span className="block w-16 h-0.5 bg-emsWhite/60 mb-2" />
        </div>
      </div>
    </motion.section>
  );
};

export default BrandStory;