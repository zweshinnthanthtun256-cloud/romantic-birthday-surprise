import { useEffect, useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Heart, Sparkle } from 'lucide-react';
export default function ConfettiEffect({ burst, onDone }) {
  const reduced = useReducedMotion();
  const pieces = useMemo(
    () =>
      Array.from({ length: 28 }, (_, i) => {
        const angle = (i / 28) * Math.PI * 2;
        const distance = 65 + Math.random() * 160;
        return {
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance - 80,
          rotate: (Math.random() - 0.5) * 100,
          color: ['#ab5777', '#cbb180', '#ddb1c2', '#f1dbd4'][i % 4],
          delay: Math.random() * 0.1,
          size: 7 + Math.random() * 10,
        };
      }),
    [],
  );
  useEffect(() => {
    const timer = setTimeout(onDone, 1900);
    return () => clearTimeout(timer);
  }, [burst.id, onDone]);
  if (reduced) return null;
  return (
    <div className="confetti" aria-hidden="true">
      {pieces.map((p, i) => (
        <motion.span
          key={i}
          style={{ left: burst.x, top: burst.y, color: p.color }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 0.3 }}
          animate={{
            x: p.x,
            y: [0, p.y, p.y + 35],
            rotate: p.rotate,
            opacity: [1, 1, 0],
            scale: [0.3, 1, 0.7],
          }}
          transition={{ duration: 1.6, delay: p.delay, ease: 'easeOut' }}
        >
          {i % 4 === 0 ? <Sparkle size={p.size} /> : <Heart size={p.size} fill="currentColor" />}
        </motion.span>
      ))}
    </div>
  );
}
