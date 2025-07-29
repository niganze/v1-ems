import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import promoVideo from '../assets/Promo_Script_for_EMS_Rwanda.mp4';
import { useInView } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

const ourStoryCards = [
  {
    text: 'To create memorable experiences and deliver excellence in every event we manage.',
    position: 'top-8 left-8',
    animation: { x: [0, -40, 0] }, // right to left
  },
  {
    text: 'To be the leading event and media service provider in Rwanda and beyond.',
    position: 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
    animation: { x: [0, 40, 0] }, // left to right
  },
  {
    text: 'Innovation, professionalism, and a passion for exceeding expectations.',
    position: 'bottom-8 right-8',
    animation: { scale: [1, 1.08, 1] }, // pulse
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
        {/* Animated Cards Overlay */}
        {ourStoryCards.map((card, idx) => (
          <motion.div
            key={idx}
            className={`absolute ${card.position} z-10 max-w-xs w-fit bg-gradient-to-br from-emsPurple via-emsBlue to-emsPink bg-opacity-90 rounded-xl shadow-xl px-6 py-4 pointer-events-auto`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={card.animation}
            transition={card.animation.scale ? pulseTransition : animationTransition}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="text-white font-bold text-base text-center drop-shadow-lg">{card.text}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default PromoEvents; 