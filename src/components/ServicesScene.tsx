import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { CinematicText } from './CinematicText';
import { SplitText } from './ui/SplitText';
import { ScrambleText } from './ui/ScrambleText';
import { ChevronRight } from 'lucide-react';

const services = [
  {
    title: 'Wedding Events',
    description: 'Creating magical moments that last a lifetime with personalized touches and flawless execution.',
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=600&q=80'
  },
  {
    title: 'Corporate Events',
    description: 'Professional gatherings that inspire, connect, and drive business success forward.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80'
  },
  {
    title: 'Social Celebrations',
    description: 'Vibrant parties and celebrations that bring people together in unforgettable ways.',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=600&q=80'
  }
];

export function ServicesScene() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section ref={ref} data-section="services" className="relative h-screen overflow-hidden bg-black">
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-cyan-900/20"
        style={{ y: backgroundY }}
      />
      <div className="absolute inset-0 flex items-center">
        <motion.div
          className="flex gap-8 pl-8"
          style={{ x }}
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className="relative flex-shrink-0 cursor-pointer w-96 h-96 group"
              whileHover={{ 
                scale: 1.05,
                rotateY: 5,
                z: 50
              }}
              transition={{ type: "spring", stiffness: 300 }}
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <motion.img
                src={service.image}
                alt={service.title}
                className="object-cover w-full h-full rounded-2xl"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.6 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent rounded-2xl" />
              <motion.div 
                className="absolute text-white bottom-8 left-8 right-8"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <h3 className="mb-2 text-2xl font-bold">
                  <ScrambleText 
                    text={service.title}
                    delay={0}
                    duration={1.2}
                    scrambleChars="ABCDEFGHIJKLMNOPQRSTUVWXYZ"
                  />
                </h3>
                <p className="text-sm leading-relaxed text-gray-300">
                  <SplitText 
                    text={service.description}
                    type="words"
                    delay={0.5}
                    stagger={0.05}
                  />
                </p>
              </motion.div>
              <motion.div
                className="absolute flex items-center justify-center w-12 h-12 rounded-full opacity-0 top-4 right-4 bg-white/20 backdrop-blur-sm group-hover:opacity-100"
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.2, rotate: 90 }}
              >
                <ChevronRight size={20} className="text-white" />
              </motion.div>
              <motion.div
                className="absolute inset-0 transition-all duration-500 border-2 border-transparent rounded-2xl group-hover:border-cyan-400/50"
                whileHover={{
                  boxShadow: "0 0 30px rgba(34, 211, 238, 0.3)"
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
      <div className="absolute z-20 transform -translate-y-1/2 left-8 top-1/2">
        <CinematicText>
          <h2 className="mb-4 text-5xl font-black text-white md:text-7xl writing-mode-vertical">
            <SplitText 
              text="OUR" 
              type="chars" 
              delay={0.5} 
              stagger={0.1} 
              className="block mb-4"
            />
            <br />
            <span className="block text-transparent bg-gradient-to-b from-cyan-400 to-purple-500 bg-clip-text">
              <SplitText 
                text="SERVICES" 
                type="chars" 
                delay={1.2} 
                stagger={0.08}
              />
            </span>
          </h2>
        </CinematicText>
      </div>
    </section>
  );
}
