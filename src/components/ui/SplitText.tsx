import { motion } from 'framer-motion';

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  type?: 'chars' | 'words' | 'lines';
}

export function SplitText({ text, className = "", delay = 0, stagger = 0.05, type = 'chars' }: SplitTextProps) {
  const splitText = (): string[] => {
    switch (type) {
      case 'words':
        return text.split(' ');
      case 'lines':
        return text.split('\n');
      case 'chars':
      default:
        return text.split('');
    }
  };

  const parts = splitText();

  return (
    <span className={className}>
      {parts.map((part, index) => (
        <motion.span
          key={index}
          className="inline-block"
          initial={{ opacity: 0, y: 50, rotateX: -90 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{
            delay: delay + (index * stagger),
            duration: 0.8,
            ease: [0.25, 0.1, 0.25, 1],
            type: "spring",
            stiffness: 100
          }}
          style={{ transformOrigin: 'center bottom' }}
        >
          {part === ' ' ? '\u00A0' : part}
          {type === 'words' && index < parts.length - 1 && '\u00A0'}
        </motion.span>
      ))}
    </span>
  );
}
