import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { CinematicText } from './CinematicText';
import { SplitText } from './ui/SplitText';
import { ScrambleText } from './ui/ScrambleText';

const stats = [
  { number: '500+', label: 'Events Completed' },
  { number: '50K+', label: 'Happy Guests' },
  { number: '4.9/5', label: 'Client Rating' },
  { number: '120+', label: 'Corporate Clients' }
];

export function StatsScene() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 5]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  return (
    <motion.section
      ref={ref}
      data-section="stats"
      className="relative flex items-center justify-center h-screen overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900"
    >
      <motion.div
        className="absolute inset-0 opacity-10"
        style={{ y, rotate, scale }}
      >
        <div className="w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:50px_50px]" />
      </motion.div>
      <div className="absolute inset-0">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-20 h-20 border rounded-full border-white/10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              rotate: 360,
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 10 + Math.random() * 5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>
      <div className="relative z-10 px-4 mx-auto max-w-7xl">
        <CinematicText className="mb-16 text-center">
          <h2 className="mb-4 text-5xl font-black text-white md:text-7xl">
            <SplitText 
              text="BY THE" 
              type="words" 
              delay={0.3} 
              stagger={0.2} 
              className="block"
            />
            <br />
            <span className="block text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text">
              <SplitText 
                text="NUMBERS" 
                type="chars" 
                delay={0.8} 
                stagger={0.08}
              />
            </span>
          </h2>
        </CinematicText>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, index) => (
            <CinematicText key={stat.label} delay={index * 0.2}>
              <motion.div
                className="text-center cursor-pointer group"
                whileHover={{ 
                  scale: 1.1, 
                  y: -10,
                  rotateY: 10
                }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <motion.div
                  className="relative mb-2 overflow-hidden text-4xl font-black text-white md:text-6xl"
                  initial={{ scale: 0, rotateY: -180 }}
                  whileInView={{ scale: 1, rotateY: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    delay: index * 0.1, 
                    type: "spring", 
                    stiffness: 200,
                    duration: 1.5
                  }}
                >
                  <ScrambleText 
                    text={stat.number}
                    delay={1.5 + index * 0.2}
                    duration={1.5}
                    scrambleChars="0123456789+/.%"
                  />
                  <motion.div
                    className="absolute inset-0 rounded-lg opacity-0 bg-gradient-to-r from-cyan-400/20 to-purple-500/20 group-hover:opacity-100 blur-xl"
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
                <p className="text-sm font-light tracking-wider text-gray-300 md:text-base">
                  <SplitText 
                    text={stat.label}
                    type="chars"
                    delay={2.5 + index * 0.1}
                    stagger={0.03}
                  />
                </p>
              </motion.div>
            </CinematicText>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
