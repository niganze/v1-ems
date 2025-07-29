import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const INTERACTIVE_SELECTORS = 'button, a, input, textarea, select, [role="button"], [tabindex]:not([tabindex="-1"])';

export default function AnimatedCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const springConfig = { stiffness: 400, damping: 28, mass: 1.2 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX - 16); // Center the circle
      mouseY.set(e.clientY - 16);
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const handlePointerOver = (e: Event) => {
      if ((e.target as Element)?.matches?.(INTERACTIVE_SELECTORS)) {
        setIsActive(true);
      }
    };
    const handlePointerOut = (e: Event) => {
      if ((e.target as Element)?.matches?.(INTERACTIVE_SELECTORS)) {
        setIsActive(false);
      }
    };
    document.addEventListener('pointerover', handlePointerOver);
    document.addEventListener('pointerout', handlePointerOut);
    return () => {
      document.removeEventListener('pointerover', handlePointerOver);
      document.removeEventListener('pointerout', handlePointerOut);
    };
  }, []);

  return (
    <motion.div
      ref={cursorRef}
      style={{
        x,
        y,
        position: 'fixed',
        top: 0,
        left: 0,
        width: 32,
        height: 32,
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 9999,
        background: isActive ? '#374151' : '#e5e7eb', // gray-700 or gray-200
        boxShadow: isActive ? '0 0 0 6px rgba(55,65,81,0.15)' : '0 0 0 2px rgba(229,231,235,0.15)',
        mixBlendMode: 'multiply',
        transition: 'background 0.2s, box-shadow 0.2s',
      }}
      aria-hidden="true"
    />
  );
} 