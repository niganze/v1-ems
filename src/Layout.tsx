import { useState, useRef, useEffect } from 'react';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';
import Chatbot from './components/Chatbot';
import Navbar from './components/Navbar';
import AnimatedCursor from './components/ui/AnimatedCursor';
import musicFile from './assets/video/music.mp3';

export default function Layout() {
  const [hasEntered, setHasEntered] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleEnterSite = async () => {
    setHasEntered(true);

    if (audioRef.current) {
      try {
        audioRef.current.volume = 1; // ensure audio is not muted
        const playPromise = audioRef.current.play();

        if (playPromise !== undefined) {
          await playPromise;
          console.log('Music started playing');
        }
      } catch (error) {
        console.error('Error playing audio:', error);
      }
    }
  };

  // Force-play fallback in case browser blocks autoplay
  useEffect(() => {
    const enableAudio = () => {
      if (audioRef.current) {
        audioRef.current.volume = 1;
        audioRef.current.play().catch((err) => {
          console.warn('Fallback play failed:', err);
        });
      }
      window.removeEventListener('click', enableAudio);
    };

    if (hasEntered) {
      window.addEventListener('click', enableAudio);
    }

    return () => {
      window.removeEventListener('click', enableAudio);
    };
  }, [hasEntered]);

  // Welcome Screen Component
  if (!hasEntered) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
        <AnimatedCursor />
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 text-center px-8">
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 animate-pulse">
              Welcome
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              Experience our site with immersive audio
            </p>
          </div>
          <button
            onClick={handleEnterSite}
            className="group relative px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-blue-500/25"
          >
            <span className="relative z-10">Enter Site</span>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          </button>
          <p className="text-sm text-gray-400 mt-6 flex items-center justify-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.793L4.29 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.29l4.093-3.793a1 1 0 011.617.793zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Audio enabled experience
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="z-50 flex flex-col min-h-screen">
      <AnimatedCursor />
      <Navbar />
      <main className="flex flex-col flex-1">
        <Outlet />
      </main>
      <Footer />
      <Chatbot />

      {/* Hidden audio player for background music */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        style={{ display: 'none' }}
      >
        <source src={musicFile} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}
