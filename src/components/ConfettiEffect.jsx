import { useEffect, useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Heart, Sparkle } from 'lucide-react';
export default function ConfettiEffect({ id, onDone }) {
  const reduced = useReducedMotion();
  const pieces = useMemo(
    () =>
      Array.from({ length: 36 }, (_, i) => ({
        x: (Math.random() - 0.5) * 950,
        y: -100 - Math.random() * 600,
        rotate: (Math.random() - 0.5) * 360,
        color: ['#a64f69', '#d7ac65', '#e9c4cc', '#fff2d9'][i % 4],
        delay: Math.random() * 0.15,
      })),
    [],
  );
  useEffect(() => {
    const t = setTimeout(onDone, 2400);
    return () => clearTimeout(t);
  }, [id, onDone]);
  if (reduced) return null;
  return (
    <div className="confetti" aria-hidden="true">
      {pieces.map((p, i) => (
        <motion.span
          key={i}
          initial={{ x: 0, y: 0, opacity: 1, scale: 0.5 }}
          animate={{
            x: p.x,
            y: [0, p.y, p.y + 140],
            rotate: p.rotate,
            opacity: [1, 1, 0],
            scale: 1,
          }}
          transition={{ duration: 2, delay: p.delay, ease: 'easeOut' }}
          style={{ color: p.color }}
        >
          {i % 3 === 0 ? <Sparkle size={15} /> : <Heart size={12} fill="currentColor" />}
        </motion.span>
      ))}
    </div>
  );
}
