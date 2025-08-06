'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import sakura from '../assets/sakura.mp3';
import HomeInfo from './HomeInfo';
import Loader from './Loader';
import soundoff from '../assets/icons/soundoff.png';
import soundon from '../assets/icons/soundon.png';
import { Bird, Island, Plane, Sky } from '../models';

const Horizontal: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [currentStage, setCurrentStage] = useState<number>(1);
  const [isRotating, setIsRotating] = useState<boolean>(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState<boolean>(false);

  useEffect(() => {
    audioRef.current = new Audio(sakura);
    if (audioRef.current) {
      audioRef.current.volume = 0.4;
      audioRef.current.loop = true;
    }
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlayingMusic) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [isPlayingMusic]);

  const adjustBiplaneForScreenSize = (): [[number, number, number], [number, number, number]] => {
    let screenScale: [number, number, number];
    let screenPosition: [number, number, number];

    if (window.innerWidth < 768) {
      screenScale = [1.5, 1.5, 1.5];
      screenPosition = [0, -1.5, 0];
    } else {
      screenScale = [3, 3, 3];
      screenPosition = [0, -4, -4];
    }

    return [screenScale, screenPosition];
  };

  const adjustIslandForScreenSize = (): [[number, number, number], [number, number, number]] => {
    let screenScale: [number, number, number];
    let screenPosition: [number, number, number];

    if (window.innerWidth < 768) {
      screenScale = [0.9, 0.9, 0.9];
      screenPosition = [0, -6.5, -43.4];
    } else {
      screenScale = [1, 1, 1];
      screenPosition = [0, -6.5, -43.4];
    }

    return [screenScale, screenPosition];
  };

  const [biplaneScale, biplanePosition] = adjustBiplaneForScreenSize();
  const [islandScale, islandPosition] = adjustIslandForScreenSize();

  return (
    <section className='w-full h-screen relative overflow-hidden'>
      {/* Enhanced Black Background with Image Texture */}
      <div className="absolute inset-0 bg-black">
        {/* Dark textured background pattern */}
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, rgba(120, 119, 198, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, rgba(168, 85, 247, 0.08) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.05) 0%, transparent 50%),
              linear-gradient(45deg, transparent 40%, rgba(255, 255, 255, 0.02) 50%, transparent 60%),
              url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M30 30c0-6.627 5.373-12 12-12s12 5.373 12 12-5.373 12-12 12-12-5.373-12-12zm12-10c-5.523 0-10 4.477-10 10s4.477 10 10 10 10-4.477 10-10-4.477-10-10-10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")
            `,
            backgroundSize: '400px 400px, 300px 300px, 500px 500px, 200px 200px, 60px 60px'
          }}
        />
        
        {/* Animated dark gradient overlays */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-black via-gray-900/80 to-black"
          animate={{
            background: [
              'linear-gradient(45deg, rgba(0,0,0,0.9) 0%, rgba(31,41,55,0.8) 50%, rgba(0,0,0,0.9) 100%)',
              'linear-gradient(45deg, rgba(0,0,0,0.8) 0%, rgba(55,65,81,0.7) 50%, rgba(0,0,0,0.8) 100%)',
              'linear-gradient(45deg, rgba(0,0,0,0.9) 0%, rgba(31,41,55,0.8) 50%, rgba(0,0,0,0.9) 100%)'
            ]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        />

        {/* Dark geometric shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 border border-purple-500/10 rotate-45 animate-spin-slow" />
        <div className="absolute bottom-32 right-16 w-24 h-24 border border-blue-500/10 rotate-12 animate-float" />
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-pink-500/10 -rotate-12 animate-pulse" />
      </div>

      {/* Enhanced Floating Particles with Black Theme */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(80)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full ${
              i % 4 === 0 ? 'w-2 h-2 bg-purple-400/20' :
              i % 4 === 1 ? 'w-1 h-1 bg-blue-400/25' :
              i % 4 === 2 ? 'w-3 h-3 bg-pink-400/15' :
              'w-1 h-1 bg-white/20'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.1, 0.6, 0.1],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: 'easeInOut'
            }}
          />
        ))}
      </div>

      {/* Animated Dark Noise Overlay */}
      <motion.div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.15'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px'
        }}
        animate={{
          backgroundPosition: ['0px 0px', '200px 200px', '0px 0px']
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />

      <div className='absolute top-28 left-0 right-0 z-10 flex items-center justify-center'>
        <AnimatePresence mode="wait">
          {currentStage && (
            <motion.div
              key={currentStage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <HomeInfo currentStage={currentStage} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Canvas
        className={`w-full h-screen bg-transparent ${
          isRotating ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        camera={{ near: 0.1, far: 1000 }}
      >
        <Suspense fallback={<Loader />}>
          <directionalLight position={[1, 1, 1]} intensity={2} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 5, 10]} intensity={2} />
          <spotLight position={[0, 50, 10]} angle={0.15} penumbra={1} intensity={2} />
          <hemisphereLight color='#b1e1ff' groundColor='#000000' intensity={1} />

          <Bird />
          <Sky isRotating={isRotating} />
          <Island
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            setCurrentStage={setCurrentStage}
            position={islandPosition}
            rotation={[0.1, 4.7077, 0]}
            scale={islandScale}
          />
          <Plane
            isRotating={isRotating}
            position={biplanePosition}
            rotation={[0, 20.1, 0]}
            scale={biplaneScale}
          />
        </Suspense>
      </Canvas>

      {/* Enhanced EMS Event Planner Content Overlay with Black Theme */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
        <motion.div
          className="text-center text-white max-w-4xl mx-auto px-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent"
            animate={{ 
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{ backgroundSize: '200% 200%' }}
          >
            EMS Event Planner
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-gray-200 mb-8 drop-shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            Creating Unforgettable Events in Rwanda
          </motion.p>
          <motion.div
            className="flex flex-wrap justify-center gap-4 text-sm md:text-base"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            <motion.span 
              className="px-6 py-3 bg-purple-500/20 backdrop-blur-sm rounded-full border border-purple-500/40 text-purple-200 shadow-lg"
              whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(168, 85, 247, 0.3)' }}
            >
              Corporate Events
            </motion.span>
            <motion.span 
              className="px-6 py-3 bg-pink-500/20 backdrop-blur-sm rounded-full border border-pink-500/40 text-pink-200 shadow-lg"
              whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(236, 72, 153, 0.3)' }}
            >
              Weddings
            </motion.span>
            <motion.span 
              className="px-6 py-3 bg-blue-500/20 backdrop-blur-sm rounded-full border border-blue-500/40 text-blue-200 shadow-lg"
              whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)' }}
            >
              Conferences
            </motion.span>
            <motion.span 
              className="px-6 py-3 bg-green-500/20 backdrop-blur-sm rounded-full border border-green-500/40 text-green-200 shadow-lg"
              whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(34, 197, 94, 0.3)' }}
            >
              Exhibitions
            </motion.span>
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced Sound Control with Dark Theme */}
      <div className='absolute bottom-4 left-4 z-30'>
        <motion.div
          className="p-3 bg-black/40 backdrop-blur-lg rounded-full border border-white/10 shadow-lg"
          whileHover={{ scale: 1.1, boxShadow: '0 0 25px rgba(168, 85, 247, 0.4)' }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.div
            onClick={() => setIsPlayingMusic(!isPlayingMusic)}
            className='w-8 h-8 cursor-pointer flex items-center justify-center text-white/80 hover:text-purple-400 transition-colors'
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            {/* Sound icon replacement since we can't use external images */}
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="currentColor"
              className={isPlayingMusic ? 'text-purple-400' : 'text-white/60'}
            >
              {isPlayingMusic ? (
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
              ) : (
                <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
              )}
            </svg>
          </motion.div>
        </motion.div>
      </div>

      {/* Dark Corner Accents */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-transparent pointer-events-none" />
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-500/10 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-pink-500/10 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-green-500/10 to-transparent pointer-events-none" />

      <style jsx>{`
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(12deg); }
          50% { transform: translateY(-20px) rotate(12deg); }
        }

        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Horizontal;