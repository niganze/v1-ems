import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CinematicText } from './CinematicText';
import { SplitText } from './ui/SplitText';
import { ScrambleText } from './ui/ScrambleText';
import { Calendar, Users, Star } from 'lucide-react';

export function CTAScene() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1.2]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  return (
    <motion.section
      ref={ref}
      data-section="contact"
      className="relative flex items-center justify-center h-screen overflow-hidden bg-black"
    >
      <motion.div
        className="absolute inset-0"
        style={{ scale, rotate }}
      >
        <div className="w-full h-full bg-gradient-to-br from-purple-600/20 via-blue-600/20 to-cyan-600/20 blur-3xl" />
      </motion.div>
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(34,211,238,0.1)_0%,transparent_50%)]"
        style={{ y: backgroundY }}
      />
      <div className="absolute inset-0">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-cyan-400/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-30, 30, -30],
              x: [-20, 20, -20],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
      <div className="relative z-10 max-w-4xl px-4 mx-auto text-center">
        <CinematicText>
          <motion.h2 
            className="mb-8 text-6xl font-black text-white md:text-8xl"
            whileInView={{ rotateY: [0, 5, 0] }}
            transition={{ duration: 2, ease: "easeInOut" }}
          >
            <SplitText 
              text="READY TO" 
              type="words" 
              delay={0.3} 
              stagger={0.2} 
              className="block"
            />
            <br />
            <span className="block text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text">
              <ScrambleText 
                text="CREATE?"
                delay={1.2}
                duration={2}
                scrambleChars="ABCDEFGHIJKLMNOPQRSTUVWXYZ?!@#$%"
              />
            </span>
          </motion.h2>
        </CinematicText>
        <CinematicText delay={0.3} className="mb-12">
          <p className="text-xl font-light text-gray-300 md:text-2xl">
            <SplitText 
              text="Let's bring your vision to life with unforgettable experiences"
              type="words"
              delay={0.8}
              stagger={0.1}
            />
          </p>
        </CinematicText>
        <CinematicText delay={0.6}>
          <Link to="/contact">
            <motion.button
              className="relative px-16 py-6 overflow-hidden text-xl font-bold text-white rounded-full shadow-2xl bg-gradient-to-r from-cyan-500 to-purple-600 group"
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400 }}
              type="button"
            >
              <motion.div
                className="absolute inset-0 opacity-0 bg-gradient-to-r from-purple-600 to-cyan-500 group-hover:opacity-100"
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10">
                <ScrambleText 
                  text="START YOUR JOURNEY"
                  delay={2.5}
                  duration={2}
                  scrambleChars="ABCDEFGHIJKLMNOPQRSTUVWXYZ"
                />
              </span>
              <motion.div
                className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: [-100, 400] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
            </motion.button>
          </Link>
        </CinematicText>
        <CinematicText delay={1.0} className="mt-16">
          <div className="flex flex-col items-center justify-center gap-8 text-gray-400 md:flex-row">
            <motion.div 
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05, color: "#ffffff" }}
            >
              <Calendar size={20} />
              <span>Book a consultation</span>
            </motion.div>
            <motion.div 
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05, color: "#ffffff" }}
            >
              <Users size={20} />
              <span>Join our community</span>
            </motion.div>
            <motion.div 
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05, color: "#ffffff" }}
            >
              <Star size={20} />
              <span>Premium experiences</span>
            </motion.div>
          </div>
        </CinematicText>
      </div>
    </motion.section>
  );
}
