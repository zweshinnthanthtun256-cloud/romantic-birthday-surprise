import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, LockKeyhole, Heart, Sparkles } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import { SectionHeading } from './Shared';
import FloatingHearts from './FloatingHearts';
import AnimatedWords from './AnimatedWords';
export default function SecretSurprise({ celebrate }) {
  const [open, setOpen] = useState(false);
  return (
    <section className={`section surprise-section ${open ? 'surprise-open' : ''}`} id="surprise">
      <FloatingHearts dark />
      <AnimatePresence mode="wait">
        {!open ? (
          <motion.div key="gift" exit={{ opacity: 0, scale: 1.08, rotate: 3 }}>
            <SectionHeading eyebrow="07 / SAVED THE BEST FOR LAST">
              One last <em>surprise…</em>
            </SectionHeading>
            <div className="gift-card">
              <LockKeyhole size={17} />
              <motion.div
                className="gift-icon-float"
                animate={{ y: [0, -8, 0], rotate: [-3, 3, -3] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Gift size={100} strokeWidth={0.7} />
              </motion.div>
              <p>Something just for you.</p>
              <button
                className="button light"
                onClick={(event) => {
                  setOpen(true);
                  celebrate(event);
                }}
              >
                Open <Gift size={17} />
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="message"
            className="surprise-message"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <Sparkles size={25} />
            <span className="eyebrow">HAPPY {siteConfig.age}ND BIRTHDAY, MY LOVE</span>
            <h2>{siteConfig.finalMessage}</h2>
            <p>And if I had to choose again…</p>
            <h3>
              <AnimatedWords text="I'd still choose" /> <em>you.</em>
            </h3>
            <p>Every single time.</p>
            <div className="love-signature">
              I love you <Heart size={22} />
            </div>
            <a href="#ending" className="ending-link">
              One more little thought ↓
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
