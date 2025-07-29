import { motion } from 'framer-motion';
import  { useState, useEffect } from 'react';

interface ScrambleTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  scrambleChars?: string;
}

export function ScrambleText({ text, className = "", delay = 0, duration = 2, scrambleChars = "!@#$%^&*()_+-=[]{}|;:,.<>?" }: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState<string>('');
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    if (!isVisible) return;
    const totalDuration = duration * 1000;
    const charRevealTime = totalDuration / text.length;
    let currentIndex = 0;
    const scrambleInterval = setInterval(() => {
      if (currentIndex <= text.length) {
        const revealed = text.slice(0, currentIndex);
        const scrambled = Array.from({ length: Math.max(0, text.length - currentIndex) }, () =>
          scrambleChars[Math.floor(Math.random() * scrambleChars.length)]
        ).join('');
        setDisplayText(revealed + scrambled);
        currentIndex++;
      } else {
        setDisplayText(text);
        clearInterval(scrambleInterval);
      }
    }, charRevealTime);
    return () => clearInterval(scrambleInterval);
  }, [isVisible, text, duration, scrambleChars]);

  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ delay, duration: 0.5 }}
      onViewportEnter={() => setIsVisible(true)}
    >
      {displayText}
      <motion.span
        className="inline-block w-0.5 h-[1em] bg-current ml-1"
        animate={{ opacity: [1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
      />
    </motion.span>
  );
}
