import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { CinematicText } from './CinematicText';
import { SplitText } from './ui/SplitText';
import { ScrambleText } from './ui/ScrambleText';

const testimonials = [
  {
    text: "EMS Rwanda transformed our wedding into a fairy tale. Every detail was perfect, and the execution was flawless.",
    author: "Sarah & John",
    role: "Wedding Clients"
  },
  {
    text: "Their attention to detail and creative vision made our corporate launch unforgettable. Highly recommended!",
    author: "Tech Innovation Ltd",
    role: "Corporate Client"
  },
  {
    text: "Professional, creative, and reliable. EMS Rwanda knows how to bring your vision to life.",
    author: "Marie Claire",
    role: "Event Organizer"
  }
];

export function TestimonialsScene() {
  const [currentTestimonial, setCurrentTestimonial] = useState<number>(0);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["30%", "-30%"]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 10]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleTestimonialChange = (index: number): void => {
    setCurrentTestimonial(index);
  };

  return (
    <motion.section
      ref={ref}
      data-section="testimonials"
      className="relative flex items-center justify-center h-screen overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900"
    >
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:100px_100px]"
        style={{ y, rotate, scale }}
      />
      <div className="absolute inset-0">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-20 rounded-lg bg-white/5 backdrop-blur-sm"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              rotate: [-5, 5, -5],
              opacity: [0.3, 0.6, 0.3],
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
        <CinematicText className="mb-16">
          <h2 className="mb-4 text-5xl font-black text-white md:text-7xl">
            <SplitText 
              text="CLIENT" 
              type="chars" 
              delay={0.3} 
              stagger={0.1} 
              className="block"
            />
            <br />
            <span className="block text-transparent bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text">
              <SplitText 
                text="VOICES" 
                type="chars" 
                delay={0.8} 
                stagger={0.08}
              />
            </span>
          </h2>
        </CinematicText>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTestimonial}
            className="text-center"
            initial={{ opacity: 0, y: 50, rotateX: -15 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, y: -50, rotateX: 15 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <motion.blockquote 
              className="mb-8 text-2xl font-light leading-relaxed text-white md:text-3xl"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              "<ScrambleText 
                text={testimonials[currentTestimonial].text}
                delay={0}
                duration={2.5}
                scrambleChars="abcdefghijklmnopqrstuvwxyz .,!?'"
              />"
            </motion.blockquote>
            <motion.div 
              className="text-gray-300"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2, duration: 0.6 }}
            >
              <div className="mb-1 text-xl font-semibold">
                <SplitText 
                  text={testimonials[currentTestimonial].author}
                  type="chars"
                  delay={2}
                  stagger={0.05}
                />
              </div>
              <div className="text-sm opacity-75">
                <SplitText 
                  text={testimonials[currentTestimonial].role}
                  type="chars"
                  delay={2.5}
                  stagger={0.03}
                />
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
        <div className="flex justify-center gap-3 mt-12">
          {testimonials.map((_, index) => (
            <motion.button
              key={index}
              className={`relative w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentTestimonial ? 'bg-white' : 'bg-white/30'
              }`}
              onClick={() => handleTestimonialChange(index)}
              type="button"
              aria-label={`Go to testimonial ${index + 1}`}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
            >
              {index === currentTestimonial && (
                <motion.div
                  className="absolute inset-0 rounded-full bg-cyan-400"
                  layoutId="activeTestimonial"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
