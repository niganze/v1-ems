import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import promoVideo from '../assets/Promo_Script_for_EMS_Rwanda.mp4';
import { useInView } from 'framer-motion';
import { Volume2, VolumeX, Mail, Phone, MapPin } from 'lucide-react';

// Live typing hook
const useTypewriter = (text, speed = 50, startDelay = 0) => {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!text) return;
    
    setDisplayText('');
    setIsComplete(false);
    
    const startTimer = setTimeout(() => {
      let index = 0;
      const timer = setInterval(() => {
        if (index < text.length) {
          setDisplayText(text.slice(0, index + 1));
          index++;
        } else {
          setIsComplete(true);
          clearInterval(timer);
        }
      }, speed);
      
      return () => clearInterval(timer);
    }, startDelay);
    
    return () => clearTimeout(startTimer);
  }, [text, speed, startDelay]);

  return { displayText, isComplete };
};

const ourStoryCards = [
  {
    text: 'To create memorable experiences and deliver excellence in every event we manage.',
    position: 'top-8 left-8',
    animation: { x: [0, -40, 0] },
    delay: 500,
  },
  {
    text: 'To be the leading event and media service provider in Rwanda and beyond.',
    position: 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
    animation: { x: [0, 40, 0] },
    delay: 1500,
  },
  {
    text: 'Innovation, professionalism, and a passion for exceeding expectations.',
    position: 'bottom-8 right-8',
    animation: { scale: [1, 1.08, 1] },
    delay: 2500,
  },
];

const contactInfo = [
  {
    icon: Mail,
    text: 'info@emsrwanda.com',
    delay: 3000,
  },
  {
    icon: Phone,
    text: '+250 788 123 456',
    delay: 3500,
  },
  {
    icon: MapPin,
    text: 'Kigali, Rwanda',
    delay: 4000,
  },
];

const animationTransition = {
  repeat: Infinity,
  repeatType: 'reverse' as 'reverse',
  duration: 3,
};

const pulseTransition = {
  repeat: Infinity,
  repeatType: 'reverse' as 'reverse',
  duration: 1.5,
};

const PromoEvents = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.5, once: false });
  const [muted, setMuted] = useState(true);

  // Ensure video plays and mute/unmute works
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = muted;
      if (isInView && muted) setMuted(false);
      if (!isInView && !muted) setMuted(true);
      if (videoRef.current.paused) {
        videoRef.current.play().catch(() => {});
      }
    }
  }, [isInView, muted]);

  return (
    <section ref={sectionRef} className="relative w-screen flex flex-col items-center justify-center min-h-[400px] p-0 m-0 left-1/2 -translate-x-1/2">
      <div className="relative w-screen aspect-video rounded-none overflow-hidden shadow-xl m-0 p-0">
        <video
          ref={videoRef}
          src={promoVideo}
          controls={false}
          autoPlay
          loop
          muted={muted}
          className="w-full h-full object-cover"
        />
        
        {/* Mute/Unmute Button */}
        <button
          onClick={() => setMuted((m) => !m)}
          className="absolute top-4 right-4 z-10 bg-white/80 hover:bg-emsPurple text-emsPurple hover:text-white rounded-full p-2 shadow-lg transition"
        >
          {muted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
        </button>

        {/* Animated Story Cards with Live Typing */}
        {ourStoryCards.map((card, idx) => {
          const { displayText } = useTypewriter(card.text, 50, card.delay);
          
          return (
            <motion.div
              key={idx}
              className={`absolute ${card.position} z-10 max-w-xs w-fit bg-gradient-to-br from-emsPurple via-emsBlue to-emsPink bg-opacity-90 rounded-xl shadow-xl px-6 py-4 pointer-events-auto`}
              initial={{ opacity: 0, scale: 0.9, x: -100 }}
              animate={{
                opacity: 1,
                scale: 1,
                x: 0,
                ...card.animation
              }}
              transition={{
                ...animationTransition,
                opacity: { duration: 0.5, delay: card.delay / 1000 },
                scale: { duration: 0.5, delay: card.delay / 1000 },
                x: card.animation.scale ? 
                  { duration: 0.5, delay: card.delay / 1000 } : 
                  { ...animationTransition }
              }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <div className="text-white font-bold text-base text-center drop-shadow-lg">
                {displayText}
                <span className="animate-pulse">|</span>
              </div>
            </motion.div>
          );
        })}

        {/* Contact Information with Live Typing Animation */}
        <div className="absolute bottom-4 left-4 z-10 space-y-2">
          {contactInfo.map((contact, idx) => {
            const { displayText, isComplete } = useTypewriter(contact.text, 60, contact.delay);
            const Icon = contact.icon;
            
            return (
              <motion.div
                key={idx}
                className="flex items-center space-x-3 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: contact.delay / 1000,
                  ease: "easeOut"
                }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ 
                    duration: 0.3, 
                    delay: (contact.delay + 200) / 1000,
                    type: "spring",
                    stiffness: 200
                  }}
                >
                  <Icon className="h-5 w-5 text-emsPurple" />
                </motion.div>
                <div className="text-gray-800 font-medium">
                  {displayText}
                  {!isComplete && <span className="animate-pulse text-emsPurple">|</span>}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Additional Company Info with Typing Effect */}
        <motion.div
          className="absolute top-4 left-4 z-10 bg-gradient-to-r from-emsPurple to-emsBlue bg-opacity-95 rounded-lg px-6 py-3 shadow-lg max-w-md"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <TypewriterText 
            text="EMS Rwanda - Creating Unforgettable Moments"
            className="text-white font-bold text-lg drop-shadow-lg"
            speed={80}
            startDelay={1000}
          />
        </motion.div>

        {/* Live Status Indicator */}
        <motion.div
          className="absolute top-1/2 right-8 transform -translate-y-1/2 z-10 bg-red-500 text-white px-4 py-2 rounded-full shadow-lg"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 4.5 }}
        >
          <div className="flex items-center space-x-2">
            <motion.div
              className="w-2 h-2 bg-white rounded-full"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <span className="text-sm font-medium">LIVE</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Reusable Typewriter Component
const TypewriterText = ({ text, className, speed = 50, startDelay = 0 }) => {
  const { displayText, isComplete } = useTypewriter(text, speed, startDelay);
  
  return (
    <div className={className}>
      {displayText}
      {!isComplete && <span className="animate-pulse">|</span>}
    </div>
  );
};

export default PromoEvents;