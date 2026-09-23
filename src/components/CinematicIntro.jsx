import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { siteConfig as config } from '../data/siteConfig';
import FloatingHearts from './FloatingHearts';
export default function CinematicIntro({ onComplete }) {
  const [index, setIndex] = useState(0),
    reduced = useReducedMotion();
  const last = index === config.openingLines.length;
  useEffect(() => {
    if (reduced) return;
    const timer = setTimeout(
      () => (last ? onComplete() : setIndex((i) => i + 1)),
      last ? 2800 : 2600,
    );
    return () => clearTimeout(timer);
  }, [index, last, onComplete, reduced]);
  return (
    <motion.section
      className="cinematic-intro"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      aria-label="A little story about you"
    >
      <FloatingHearts dark />
      <span className="eyebrow">BEFORE THERE WAS US</span>
      <div className="cinematic-opening-copy" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: reduced ? 0 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0.15 : 0.7 }}
          >
            {last ? (
              <>
                <Heart size={28} strokeWidth={1} />
                <h1>{config.girlfriendName}</h1>
                <p>My {config.nickname} 🤍</p>
              </>
            ) : (
              <h2>{config.openingLines[index]}</h2>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      {reduced ? (
        <button
          className="button light"
          onClick={() => (last ? onComplete() : setIndex((i) => i + 1))}
        >
          {last ? 'Open my birthday page' : 'Continue our little story'}
        </button>
      ) : (
        <button className="skip-intro" onClick={onComplete}>
          Skip to your birthday
        </button>
      )}
      <div className="cinema-progress" aria-hidden="true">
        {Array.from({ length: config.openingLines.length + 1 }, (_, i) => (
          <span key={i} className={i <= index ? 'complete' : ''} />
        ))}
      </div>
    </motion.section>
  );
}
