import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import { reasons } from '../data/reasons';
import { Reveal, SectionHeading } from './Shared';
export default function ReasonsILoveYou({ celebrate }) {
  const [revealed, setRevealed] = useState([]);
  const reduced = useReducedMotion();
  function reveal(i, event) {
    if (revealed.includes(i)) return;
    setRevealed((r) => [...r, i]);
    celebrate(event);
  }
  return (
    <section className="section reasons-section" id="reasons">
      <SectionHeading
        eyebrow="04 / TWENTY-TWO LITTLE LOVE NOTES"
        description="One for each year of you. Open them slowly."
      >
        22 Reasons Why <em>I Love You</em>
      </SectionHeading>
      <div className="reason-progress">
        <div className="reason-progress-track" aria-hidden="true">
          <motion.span
            animate={{ width: `${(revealed.length / 22) * 100}%` }}
            transition={{ duration: 0.6 }}
          />
        </div>
        <p className="reveal-count" aria-live="polite">
          {revealed.length} of 22 little loves opened
        </p>
      </div>
      <div className="reasons-grid">
        {reasons.map((reason, i) => {
          const open = revealed.includes(i);
          return (
            <Reveal key={reason} transition={{ duration: 0.55, delay: (i % 6) * 0.035 }}>
              <button
                className={`reason flip-card ${open ? 'revealed' : ''}`}
                onClick={(e) => reveal(i, e)}
                aria-expanded={open}
                aria-label={open ? `Reason ${i + 1}: ${reason}` : `Reveal reason ${i + 1}`}
              >
                <motion.span
                  className="flip-card-inner"
                  animate={{ rotateY: open && !reduced ? 180 : 0 }}
                  transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span
                    className="reason-front"
                    aria-hidden="true"
                    style={reduced && open ? { visibility: 'hidden' } : undefined}
                  >
                    <span className="reason-number">{String(i + 1).padStart(2, '0')}</span>
                    <Heart size={30} strokeWidth={0.85} />
                    <span className="tap-label">A little reason</span>
                    <span className="reason-open-hint">tap to open</span>
                  </span>
                  <span
                    className="reason-back"
                    aria-hidden="true"
                    style={
                      reduced
                        ? { transform: 'none', visibility: open ? 'visible' : 'hidden' }
                        : undefined
                    }
                  >
                    <span className="reason-number">{String(i + 1).padStart(2, '0')}</span>
                    <span className="reason-text">{reason}</span>
                    <Heart size={12} />
                  </span>
                </motion.span>
              </button>
            </Reveal>
          );
        })}
      </div>
      {revealed.length === 22 && (
        <motion.p
          className="all-revealed"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Sparkles size={18} /> And I could find a thousand more.
        </motion.p>
      )}
    </section>
  );
}
