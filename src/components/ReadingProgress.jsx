import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion';
export default function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 30 });
  const reduced = useReducedMotion();
  return (
    <motion.div
      className="reading-progress"
      style={{ scaleX: reduced ? scrollYProgress : smooth }}
      aria-hidden="true"
    />
  );
}
