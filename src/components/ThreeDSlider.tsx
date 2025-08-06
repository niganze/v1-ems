import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Mock images for the slider
const images = [
  'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400',
  'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400',
  'https://images.unsplash.com/photo-1511578314322-379afb476865?w=400',
  'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=400',
  'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400',
  'https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=400',
  'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=400',
  'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400',
  'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=400',
  'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400',
  'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=400',
  'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=400',
];

const SLIDE_COUNT = images.length;
const SLIDER_WIDTH = 280;
const SLIDER_HEIGHT = 360;
const SLIDER_RADIUS = 650;
const ROTATE_X = -12;
const ANIMATION_DURATION = 25000;

export default function ThreeDSlider() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    function animate(now: number) {
      if (!startTimeRef.current) startTimeRef.current = now;
      const elapsed = now - startTimeRef.current;
      const rotateY = (elapsed / ANIMATION_DURATION) * 360 % 360;
      if (sliderRef.current) {
        sliderRef.current.style.transform = `perspective(1200px) rotateX(${ROTATE_X}deg) rotateY(${rotateY}deg)`;
      }
      animationRef.current = requestAnimationFrame(animate);
    }
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gray-600 to-slate-900"
      style={{
        backgroundImage: `url('/src/assets/work.avif')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Animated Background Elements */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)`,
          transition: 'background 0.3s ease',
        }}
      />
      
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* 3D Slider */}
      <div className="relative w-full h-full flex flex-col items-center justify-center z-10">
        <div
          ref={sliderRef}
          className="absolute"
          style={{
            width: `${SLIDER_WIDTH}px`,
            height: `${SLIDER_HEIGHT}px`,
            top: '15%',
            left: '50%',
            marginLeft: `-${SLIDER_WIDTH / 2}px`,
            transformStyle: 'preserve-3d',
            zIndex: 2,
          }}
        >
          {images.map((src, i) => (
            <div
              key={i}
              className="absolute w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-white/20 backdrop-blur-sm bg-white/10 transition-all duration-500 hover:scale-105 hover:shadow-purple-500/50 cursor-pointer"
              style={{
                transform: `rotateY(${(i) * (360 / SLIDE_COUNT)}deg) translateZ(${SLIDER_RADIUS}px)`,
                background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
              }}
              onClick={() => navigate('/Event')}
            >
              <img 
                src={src} 
                alt={`Event ${i + 1}`} 
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>

        {/* Enhanced Content Overlay */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-7xl px-8 pb-20 flex flex-col md:flex-row items-end justify-between z-20">
          {/* Stats Section */}
          <div className="flex flex-col space-y-6 mb-8 md:mb-0">
            <div className="flex items-center space-x-8">
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  50+
                </div>
                <div className="text-sm text-gray-300 uppercase tracking-wider">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  25+
                </div>
                <div className="text-sm text-gray-300 uppercase tracking-wider">Clients</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  5+
                </div>
                <div className="text-sm text-gray-300 uppercase tracking-wider">Years</div>
              </div>
            </div>
          </div>

          {/* Company Info */}
          <div className="text-right max-w-md">
            <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-6 border border-white/20">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2">
                EMS Team
              </h2>
              <p className="text-lg text-purple-300 mb-3">Web Design & Events</p>
              <p className="text-sm text-gray-300 leading-relaxed">
                Crafting modern, creative, and immersive digital experiences that push the boundaries of design and technology.
              </p>
              
              {/* CTA Button */}
              <button className="mt-6 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 font-medium">
                View All Projects
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white/60 animate-bounce">
          <div className="text-xs uppercase tracking-widest mb-2">Scroll</div>
          <div className="w-px h-8 bg-gradient-to-b from-white/60 to-transparent"></div>
        </div>
      </div>
    </div>
  );
}