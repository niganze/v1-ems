import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { CinematicText } from './ui/CinematicText';
import { SplitText } from './ui/SplitText';
import { ScrambleText } from './ui/ScrambleText';

const heroImages: string[] = [
  'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1920&q=80'
];

export function HeroScene(): React.ReactElement {
  const [currentImage, setCurrentImage] = useState<number>(0);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.section
      ref={ref}
      data-section="hero"
      className="relative flex items-center justify-center h-screen overflow-hidden"
      style={{ opacity }}
    >
      {/* Background Images with Enhanced Parallax */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y, scale }}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImage}
            src={heroImages[currentImage]}
            alt="Hero Background"
            className="w-full h-[120%] object-cover"
            initial={{ scale: 1.2, opacity: 0, rotate: 2 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.95, opacity: 0, rotate: -2 }}
            transition={{ duration: 2, ease: [0.25, 0.1, 0.25, 1] }}
          />
        </AnimatePresence>
      </motion.div>
      {/* Enhanced Gradient Overlay */}
      <motion.div 
        className="absolute inset-0 z-10 bg-gradient-to-b from-black/70 via-black/50 to-black/70"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      />
      {/* Floating Particles */}
      <div className="absolute inset-0 z-15">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-white/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-10, 10, -10],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
      {/* Content */}
      <div className="relative z-20 max-w-6xl px-4 mx-auto text-center text-white">
        <CinematicText delay={0.2}>
          <h1 className="mb-6 text-6xl font-black leading-tight md:text-8xl">
            <SplitText 
              text="FRESH" 
              type="chars" 
              delay={0.5} 
              stagger={0.1} 
              className="block"
            />
            <br />
            <span className="block text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text">
              <SplitText 
                text="IDEAS" 
                type="chars" 
                delay={1.2} 
                stagger={0.1}
              />
            </span>
          </h1>
        </CinematicText>
        <CinematicText delay={0.6} className="mb-8">
          <ScrambleText 
            text="GIVING WINGS TO YOUR EVENTS"
            className="text-xl font-light tracking-wider text-gray-200 md:text-2xl"
            delay={2.5}
            duration={3}
          />
        </CinematicText>
        <CinematicText delay={1.0}>
          <motion.button
            className="px-12 py-4 text-lg font-semibold text-white transition-all duration-500 border rounded-full bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 hover:border-white/40"
            whileHover={{ 
              scale: 1.05, 
              y: -5,
              boxShadow: "0 20px 40px rgba(255,255,255,0.1)"
            }}
            whileTap={{ scale: 0.95 }}
            type="button"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 4, duration: 0.8, type: "spring" }}
          >
            <ScrambleText 
              text="DISCOVER OUR STORY"
              delay={4.2}
              duration={1.5}
              scrambleChars="ABCDEFGHIJKLMNOPQRSTUVWXYZ"
            />
          </motion.button>
        </CinematicText>
      </div>
      {/* Enhanced Scroll Indicator */}
      <motion.div
        className="absolute z-20 transform -translate-x-1/2 bottom-8 left-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        whileHover={{ scale: 1.2 }}
      >
        <div className="flex justify-center w-6 h-10 transition-colors border-2 rounded-full border-white/50 hover:border-white/80">
          <motion.div 
            className="w-1 h-3 mt-2 bg-white rounded-full"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </motion.section>
  );
}
