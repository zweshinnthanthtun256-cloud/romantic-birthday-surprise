import { useMemo } from 'react';
import { Heart, Sparkle } from 'lucide-react';
import { useReducedMotion } from 'framer-motion';
export default function FloatingHearts({ dark = false }) {
  const reduced = useReducedMotion();
  const particles = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        left: Math.random() * 100,
        size: 7 + Math.random() * 13,
        duration: 15 + Math.random() * 15,
        delay: -Math.random() * 30,
        opacity: 0.08 + Math.random() * 0.16,
        spark: i % 3 === 0,
      })),
    [],
  );
  if (reduced) return null;
  return (
    <div className={`floating-hearts ${dark ? 'on-dark' : ''}`} aria-hidden="true">
      {particles.map((p, i) => {
        const Icon = p.spark ? Sparkle : Heart;
        return (
          <Icon
            key={i}
            size={p.size}
            style={{
              left: `${p.left}%`,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
              opacity: p.opacity,
            }}
          />
        );
      })}
    </div>
  );
}
