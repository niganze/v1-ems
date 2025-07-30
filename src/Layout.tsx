import { useState, useRef, useEffect, useCallback } from 'react';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';
import Chatbot from './components/Chatbot';
import Navbar from './components/Navbar';
import AnimatedCursor from './components/ui/AnimatedCursor';
import musicFile from './assets/video/music.mp3';

export default function Layout() {
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const playAudio = useCallback(async () => {
    if (audioRef.current) {
      try {
        audioRef.current.volume = 1;
        const playPromise = audioRef.current.play();

        if (playPromise !== undefined) {
          await playPromise;
          console.log('Music started playing');
        }
      } catch (error) {
        console.warn('Error playing audio:', error);
      }
    }
  }, []);

  const handleUserInteraction = useCallback(() => {
    if (!hasInteracted) {
      setHasInteracted(true);
      playAudio();
    }
  }, [hasInteracted, playAudio]);

  // Fallback for additional clicks
  // useEffect(() => {
  //   if (hasInteracted) {
  //     const clickPlayFallback = () => playAudio();
  //     window.addEventListener('click', clickPlayFallback);
  //     return () => window.removeEventListener('click', clickPlayFallback);
  //   }
  // }, [hasInteracted, playAudio]);

  return (
    <div className="z-50 flex flex-col min-h-screen">
      <AnimatedCursor />
      <Navbar onUserInteraction={handleUserInteraction} />
      <main className="flex flex-col flex-1" onClick={handleUserInteraction}>
        <Outlet />
      </main>
      <Footer />
      <Chatbot />
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
