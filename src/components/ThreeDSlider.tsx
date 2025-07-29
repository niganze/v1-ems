import { useEffect, useRef } from 'react';

const images = [
  '/src/assets/event1.jpg',
  '/src/assets/event2.jpg',
  '/src/assets/event3.jpg',
  '/src/assets/excited_event.png',
  '/src/assets/excited_event1.jpg',
  '/src/assets/excited_event2.jpg',
  '/src/assets/excited_event3.jpg',
  '/src/assets/home_event.png',
  '/src/assets/Home_event1.jpg',
  '/src/assets/Home_event2.jpg',
];

const SLIDE_COUNT = images.length;
const SLIDER_WIDTH = 220;
const SLIDER_HEIGHT = 280;
const SLIDER_RADIUS = 550;
const ROTATE_X = -16;
const ANIMATION_DURATION = 20000; // ms for a full rotation

export default function ThreeDSlider() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    function animate(now: number) {
      if (!startTimeRef.current) startTimeRef.current = now;
      const elapsed = now - startTimeRef.current;
      const rotateY = (elapsed / ANIMATION_DURATION) * 360 % 360;
      if (sliderRef.current) {
        sliderRef.current.style.transform = `perspective(1000px) rotateX(${ROTATE_X}deg) rotateY(${rotateY}deg)`;
      }
      animationRef.current = requestAnimationFrame(animate);
    }
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"/>
      <div className="relative w-full h-full flex flex-col items-center justify-center z-10">
        {/* 3D Slider */}
        <div
          ref={sliderRef}
          className="absolute"
          style={{
            width: `${SLIDER_WIDTH}px`,
            height: `${SLIDER_HEIGHT}px`,
            top: '10%',
            left: '50%',
            marginLeft: `-${SLIDER_WIDTH / 2}px`,
            transformStyle: 'preserve-3d',
            zIndex: 2,
          }}
        >
          {images.map((src, i) => (
            <div
              key={i}
              className="absolute w-full h-full rounded-xl overflow-hidden shadow-xl border-4 border-white"
              style={{
                transform: `rotateY(${(i) * (360 / SLIDE_COUNT)}deg) translateZ(${SLIDER_RADIUS}px)`
              }}
            >
              <img src={src} alt={`slide-${i}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
        {/* Content Overlay */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-6xl px-4 pb-16 flex flex-col md:flex-row items-center justify-between z-20">
          
          <div className="mt-8 md:mt-0 md:ml-8 text-right max-w-xs text-gray-700 font-poppins">
            <h2 className="text-2xl font-bold">EMS Team</h2>
            <p className="text-base">Web Design & Events</p>
            <p className="text-sm mt-2">Modern, creative, and immersive event experiences.</p>
          </div>
        </div>
      </div>
    </div>
  );
} 