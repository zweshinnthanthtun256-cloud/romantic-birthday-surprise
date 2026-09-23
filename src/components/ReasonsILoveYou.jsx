import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { reasons } from '../data/reasons';
import { Reveal, SectionHeading } from './Shared';
export default function ReasonsILoveYou({ celebrate }) {
  const [revealed, setRevealed] = useState([]);
  function reveal(i) {
    if (revealed.includes(i)) return;
    setRevealed((r) => [...r, i]);
    celebrate();
  }
  return (
    <section className="section reasons-section" id="reasons">
      <SectionHeading
        eyebrow="03 / A FEW OF THE INFINITE REASONS"
        description="Twenty-two little reminders. Each one, completely true."
      >
        22 Reasons Why <em>I Love You</em>
      </SectionHeading>
      <p className="reveal-count" aria-live="polite">
        {revealed.length} of 22 little loves opened
      </p>
      <div className="reasons-grid">
        {reasons.map((r, i) => {
          const open = revealed.includes(i);
          return (
            <Reveal key={r}>
              <motion.button
                whileTap={{ scale: 0.96 }}
                className={`reason ${open ? 'revealed' : ''}`}
                onClick={() => reveal(i)}
                aria-expanded={open}
                aria-label={open ? `Reason ${i + 1}: ${r}` : `Reveal reason ${i + 1}`}
              >
                <span className="reason-number">{String(i + 1).padStart(2, '0')}</span>
                {open ? (
                  <motion.span
                    initial={{ opacity: 0, rotateX: -25 }}
                    animate={{ opacity: 1, rotateX: 0 }}
                    className="reason-text"
                  >
                    {r}
                  </motion.span>
                ) : (
                  <>
                    <Heart size={27} strokeWidth={1} />
                    <span className="tap-label">Tap to reveal</span>
                  </>
                )}
              </motion.button>
            </Reveal>
          );
        })}
      </div>
      {revealed.length === 22 && <p className="all-revealed">And I could find a thousand more.</p>}
    </section>
  );
}
