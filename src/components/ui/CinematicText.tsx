import { motion } from 'framer-motion';
import React from 'react';

interface CinematicTextProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export function CinematicText({ children, delay = 0, className = "" }: CinematicTextProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ 
        duration: 1.2, 
        delay,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
