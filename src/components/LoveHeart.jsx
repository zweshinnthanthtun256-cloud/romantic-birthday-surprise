import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import { SectionHeading } from './Shared';
export default function LoveHeart({ celebrate }) {
  const [count, setCount] = useState(0);
  const messages = siteConfig.heartMessages;
  return (
    <section className="section love-heart-section">
      <SectionHeading eyebrow="05 / SOMETHING IMPOSSIBLE TO MEASURE">
        Do you know how much <em>I love you?</em>
      </SectionHeading>
      <motion.button
        className="big-heart"
        onClick={(event) => {
          setCount((c) => Math.min(c + 1, messages.length));
          celebrate(event);
        }}
        animate={{ scale: 1 + Math.min(count, 6) * 0.055 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Press the heart"
      >
        <Heart size={100} strokeWidth={0.8} fill="currentColor" />
      </motion.button>
      <div className="heart-message" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.p
            key={count}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            {count ? messages[count - 1] : 'Press the heart. Go on.'}
          </motion.p>
        </AnimatePresence>
      </div>
    </section>
  );
}
