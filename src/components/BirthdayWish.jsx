import { useState } from 'react';
import { motion } from 'framer-motion';
import { Cake, Flame, Wind, Heart } from 'lucide-react';
import { SectionHeading } from './Shared';
import { siteConfig } from '../data/siteConfig';
export default function BirthdayWish({ celebrate }) {
  const [out, setOut] = useState(false);
  return (
    <section className="section wish-section" id="wish">
      <SectionHeading eyebrow="06 / A LITTLE BIRTHDAY MAGIC">
        Make a <em>Birthday Wish</em>
      </SectionHeading>
      <p>
        Close your eyes. Make your wish.
        <br />
        Then blow out the candles.
      </p>
      <div
        className={`cake-scene ${out ? 'candles-out' : ''}`}
        aria-label={`Birthday cake with ${siteConfig.age} ${out ? 'extinguished' : 'lit'} candles`}
        role="img"
      >
        <div className="candles">
          {Array.from({ length: siteConfig.age }, (_, i) => (
            <span className="candle" key={i}>
              <Flame
                className="flame"
                size={13}
                fill="currentColor"
                style={{ animationDelay: `${i * 0.09}s` }}
              />
              {out && (
                <motion.span
                  className="smoke"
                  initial={{ y: 0, opacity: 0.6 }}
                  animate={{ y: -50, opacity: 0 }}
                  transition={{ duration: 2, delay: i * 0.025 }}
                >
                  〰
                </motion.span>
              )}
              <i />
            </span>
          ))}
        </div>
        <Cake size={140} strokeWidth={0.7} />
        <span className="cake-age">{siteConfig.age}</span>
      </div>
      <button
        className="button"
        onClick={(event) => {
          setOut(true);
          celebrate(event);
        }}
        disabled={out}
      >
        {out ? 'A wish sent to the stars' : 'Blow Out The Candles'}{' '}
        {out ? <Heart size={17} /> : <Wind size={17} />}
      </button>
      <div className="wish-message" aria-live="polite">
        {out && (
          <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
            May every wish you just made come true. ❤️
          </motion.p>
        )}
      </div>
    </section>
  );
}
