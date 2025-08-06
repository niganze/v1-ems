'use client';

import { useEffect, useState } from 'react';
import ThreeDSlider from '../components/ThreeDSlider';

const OurWorks: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <>
      <section className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden bg-gray-600" style={{
        backgroundImage: `url('/src/assets/work.avif')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}>
        <div className="relative z-10 px-8 md:px-24 py-16 md:py-24 flex flex-col justify-between min-h-screen">
          {/* Header */}
          <div className={`flex flex-row items-start justify-start w-full transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="relative mr-8">
              <span className="text-6xl md:text-8xl font-serif italic bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent select-none animate-pulse">
                18
              </span>
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-pink-500 rounded-full animate-ping"></div>
            </div>
            <div className="flex flex-col">
              <span className="pl-1 mb-4 text-xs font-bold tracking-[0.3em] md:text-sm text-purple-300 uppercase">
                Featured
              </span>
              <h1 className="text-7xl md:text-9xl font-black leading-none tracking-tight">
                <span className="bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
                  WORKS
                </span>
              </h1>
              <div className="mt-4 w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
            </div>
          </div>

          {/* Description */}
          <div className={`flex flex-row justify-end w-full mt-12 md:mt-0 transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="max-w-lg text-right">
              <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-8 border border-white/10">
                <p className="mb-6 text-xl md:text-2xl font-light leading-relaxed text-gray-100">
                  Experience the pinnacle of 
                  <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-semibold"> web design</span>, 
                  <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent font-semibold"> creative development</span>, 
                  <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent font-semibold"> graphic design</span>, and 
                  <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent font-semibold"> branding</span>.
                </p>
                <div className="flex items-center justify-end space-x-2">
                  <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></div>
                  <span className="text-base md:text-lg text-gray-300 font-medium">
                    With love from Obys.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="absolute right-8 top-1/2 transform -translate-y-1/2 flex flex-col space-y-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  i === 0 ? 'bg-purple-500 scale-125' : 'bg-white/30 hover:bg-white/60'
                }`}
              />
            ))}
          </div>

          {/* Floating Effects */}
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="flex flex-col items-center text-white/60">
            <span className="text-xs uppercase tracking-widest mb-2">Explore</span>
            <div className="w-px h-8 bg-gradient-to-b from-white/60 to-transparent"></div>
            <div className="w-2 h-2 bg-white/60 rounded-full mt-2"></div>
          </div>
        </div>
      </section>
      <ThreeDSlider />
    </>
  );
};

export default OurWorks;
