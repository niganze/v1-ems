import { useState, useEffect } from 'react';
import { motion, AnimatePresence, easeOut } from 'framer-motion';

const HomeEvent1 = 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=1200&h=800&fit=crop';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: easeOut }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const slideInLeft = {
  hidden: { opacity: 0, x: -100 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.8, ease: easeOut }
  }
};

const slideInRight = {
  hidden: { opacity: 0, x: 100 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.8, ease: easeOut }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.6, ease: easeOut }
  }
};

const events = [
  { title: 'Summer Music Festival', date: '2025-08-10', location: 'Kigali Arena', desc: 'Join us for a day of music, food, and fun with top artists and DJs.', video: 'ScMzIvxBSi4' },
  { title: 'Business Expo 2025', date: '2025-09-05', location: 'Kigali Convention Center', desc: 'Network with industry leaders and discover new business opportunities.', video: 'I1EkMUWNz-4' },
  { title: 'Charity Gala Night', date: '2025-10-12', location: 'Serena Hotel', desc: 'An elegant evening supporting local charities with live entertainment and auctions.', video: 'ysz5S6PUM-U' },
  { title: 'Tech Innovators Summit', date: '2025-11-20', location: 'Kigali Tech Park', desc: 'Explore the latest in technology and innovation with industry leaders.', video: 'ktvTqknDobU' },
  { title: 'Food & Wine Expo', date: '2025-12-05', location: 'Downtown Kigali', desc: 'Taste the best food and wine from local and international vendors.', video: 'aqz-KE-bpKQ' },
  { title: 'Art & Culture Fair', date: '2026-01-15', location: 'Kigali Arts Center', desc: 'Celebrate art, music, and culture with exhibitions and live performances.', video: 'VYOjWnS4cMY' },
];

export default function Event() {
  const [current, setCurrent] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const total = events.length;
  
  const next = () => setCurrent((prev) => (prev + 1) % total);
  const prev = () => setCurrent((prev) => (prev - 1 + total) % total);

  // Autoplay: advance every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, 5000);
    return () => clearInterval(interval);
  }, [total]);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    const heroSection = document.getElementById('hero-section');
    if (heroSection) {
      observer.observe(heroSection);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen px-0 py-0 bg-black pt-20 md:pt-24 lg:pt-28">
      {/* Hero Section with Enhanced Animations */}
      <motion.section 
        id="hero-section"
        className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.img
          src={HomeEvent1}
          alt="Event Hero"
          className="absolute inset-0 z-0 object-cover w-full h-full"
          style={{ filter: 'brightness(0.5)' }}
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        <div className="absolute inset-0 z-10 bg-gradient-to-br from-black/80 via-black/70 to-black/80" />
        
        <motion.div 
          className="relative z-20 flex flex-col justify-center w-full h-full px-6 mx-auto max-w-7xl"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.span 
            className="text-lg md:text-xl font-bold text-[#FFB347] mb-3 tracking-widest"
            variants={slideInLeft}
          >
            OUR EVENTS
          </motion.span>
          
          <motion.h1 
            className="max-w-4xl mb-6 font-serif text-2xl font-extrabold leading-tight text-white md:text-4xl lg:text-5xl"
            variants={fadeInUp}
          >
            Experience the Magic of Every Event, <br />
            Creating Unforgettable Moments, <br />
            Inspiring Connections, <br />
            Celebrating Life's Best Occasions.
          </motion.h1>
          
          <motion.p 
            className="max-w-2xl text-sm font-light md:text-base lg:text-lg text-white/90"
            variants={slideInRight}
          >
            Discover unforgettable moments, connect with inspiring people, and celebrate life's best occasions with EMS Rwanda. Your next amazing experience starts here.
          </motion.p>
        </motion.div>
      </motion.section>

      {/* Animated Event Card Slider */}
      <motion.div 
        className="flex flex-col items-center w-full gap-12 py-16 mt-8 mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="relative w-full flex items-center justify-center min-h-[600px] px-4 md:px-8">
          {/* Navigation Buttons */}
          <motion.button
            onClick={prev}
            className="absolute left-8 md:left-12 z-30 p-3 text-white bg-black/60 rounded-full hover:bg-black/80 transition-all duration-300 backdrop-blur-sm"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            variants={scaleIn}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>

          <motion.button
            onClick={next}
            className="absolute right-8 md:right-12 z-30 p-3 text-white bg-black/60 rounded-full hover:bg-black/80 transition-all duration-300 backdrop-blur-sm"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            variants={scaleIn}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>

          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, rotateY: 90, scale: 0.8, x: 300 }}
              animate={{ opacity: 1, rotateY: 0, scale: 1, x: 0 }}
              exit={{ opacity: 0, rotateY: -90, scale: 0.8, x: -300 }}
              transition={{ 
                type: 'spring', 
                stiffness: 100, 
                damping: 25, 
                duration: 0.8 
              }}
              className="w-full"
              style={{ perspective: 1200 }}
            >
              <motion.div 
                className="overflow-hidden shadow-2xl bg-gradient-to-br from-indigo-900/90 via-purple-900/90 to-violet-900/90 rounded-2xl w-full max-w-5xl mx-auto"
                whileHover={{ 
                  scale: 1.01,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
                }}
                transition={{ duration: 0.3 }}
              >
                <motion.div 
                  className="w-full bg-black relative"
                  style={{ paddingBottom: '56.25%' }} // 16:9 aspect ratio
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <iframe
                    src={`https://www.youtube.com/embed/${events[current].video}`}
                    title={events[current].title}
                    className="absolute top-0 left-0 w-full h-full rounded-t-2xl"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </motion.div>
                
                <motion.div 
                  className="flex flex-col items-center w-full px-8 py-8"
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.h2 
                    className="mb-4 font-serif text-2xl font-extrabold text-center text-white md:text-3xl lg:text-4xl"
                    variants={fadeInUp}
                  >
                    {events[current].title}
                  </motion.h2>
                  
                  <motion.div 
                    className="flex flex-col items-center justify-center gap-3 mb-4 md:flex-row md:gap-6"
                    variants={fadeInUp}
                  >
                    <motion.span 
                      className="text-base font-semibold md:text-lg text-yellow-400"
                      whileHover={{ scale: 1.05 }}
                    >
                      {events[current].date}
                    </motion.span>
                    <span className="hidden md:block text-white/50 text-xl">•</span>
                    <motion.span 
                      className="text-base text-white/80 md:text-lg"
                      whileHover={{ scale: 1.05 }}
                    >
                      <span className="font-semibold text-white">{events[current].location}</span>
                    </motion.span>
                  </motion.div>
                  
                  <motion.p 
                    className="max-w-3xl text-base font-light text-center text-white/90 md:text-lg leading-relaxed"
                    variants={fadeInUp}
                  >
                    {events[current].desc}
                  </motion.p>
                </motion.div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots Indicator */}
        <motion.div 
          className="flex gap-3"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {events.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                index === current ? 'bg-yellow-400 scale-125' : 'bg-white/40 hover:bg-white/60'
              }`}
              variants={scaleIn}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </motion.div>
      </motion.div>

      <style>{`
        html { scroll-behavior: smooth; }
        .scrollbar-none::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}