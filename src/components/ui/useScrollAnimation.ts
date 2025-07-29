import { useScroll, useSpring, MotionValue } from 'framer-motion';

export function useScrollAnimation(): MotionValue<number> {
  const { scrollY } = useScroll();
  const smoothScrollY = useSpring(scrollY, { stiffness: 100, damping: 30, restDelta: 0.001 });
  return smoothScrollY;
}
