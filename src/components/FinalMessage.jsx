import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion';
import { Heart, RotateCcw } from 'lucide-react';
import { siteConfig as config } from '../data/siteConfig';
import FloatingHearts from './FloatingHearts';
export default function FinalMessage() {
  const ref = useRef(null),
    inView = useInView(ref, { amount: 0.4 }),
    reduced = useReducedMotion();
  const [line, setLine] = useState(0);
  const done = line >= config.endingLines.length;
  useEffect(() => {
    if (!inView || done || reduced) return;
    const t = setTimeout(() => setLine((n) => n + 1), 2900);
    return () => clearTimeout(t);
  }, [inView, line, done, reduced]);
  return (
    <section ref={ref} className="section final-section" id="ending">
      <FloatingHearts dark />
      <span className="eyebrow">OUR STORY IS STILL BEING WRITTEN</span>
      <div className="cinematic">
        <AnimatePresence mode="wait">
          {done || reduced ? (
            <motion.div
              key="final"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <Heart className="ending-heart" size={65} strokeWidth={0.7} />
              <h2>
                Happy Birthday,
                <br />
                <em>{config.girlfriendName}.</em>
              </h2>
              <p>
                Here’s to your {config.age}nd chapter.
                <br />
                And hopefully many more chapters together.
              </p>
            </motion.div>
          ) : (
            <motion.h2
              key={line}
              initial={{ opacity: 0, filter: 'blur(4px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
            >
              {config.endingLines[line]}
            </motion.h2>
          )}
        </AnimatePresence>
      </div>
      <div className="ending-controls">
        {!done && !reduced ? (
          <button onClick={() => setLine(config.endingLines.length)}>
            Skip to birthday message
          </button>
        ) : (
          <button onClick={() => setLine(0)} disabled={reduced}>
            <RotateCcw size={13} /> Replay the ending
          </button>
        )}
      </div>
      <footer>
        Made with <Heart size={12} fill="currentColor" /> by {config.boyfriendName}
      </footer>
    </section>
  );
}
