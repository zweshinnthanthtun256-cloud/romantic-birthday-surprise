import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Heart, Waves } from 'lucide-react';
import { Reveal, SectionHeading, Photo } from './Shared';
import { beachPhotos } from '../data/memories';
export default function BeachMemory({ celebrate }) {
  const [revealed, setRevealed] = useState(false);
  return (
    <section className="section beach-section" id="ngwe-saung">
      <div className="ocean-light" aria-hidden="true" />
      <SectionHeading eyebrow="02 / SALT AIR & A LITTLE PIECE OF FOREVER">
        One Memory <em>I'll Always Keep</em>
      </SectionHeading>
      <Reveal>
        <h3 className="beach-name">
          Ngwe Saung <Waves size={30} strokeWidth={1} />
          🤍
        </h3>
        <p className="beach-intro">
          There are some moments you enjoy…
          <br />
          and then there are some moments you wish you could keep forever.
        </p>
        <p>Our Ngwe Saung trip is one of those memories for me.</p>
      </Reveal>
      <div className="beach-polaroids">
        {beachPhotos.map((p, i) => (
          <Reveal key={p.image} className={`beach-polaroid polaroid-${i}`}>
            <Photo src={p.image} alt={p.caption} />
            <p>{p.caption}</p>
          </Reveal>
        ))}
      </div>
      <Reveal className="beach-reveal">
        <p>
          The beach was beautiful.
          <br />
          The view was beautiful.
        </p>
        <AnimatePresence mode="wait">
          {!revealed ? (
            <motion.button
              key="button"
              className="beach-reveal-button"
              whileTap={{ scale: 0.97 }}
              onClick={(event) => {
                setRevealed(true);
                celebrate(event);
              }}
            >
              But… <Heart size={18} />
            </motion.button>
          ) : (
            <motion.div
              key="truth"
              initial={{ opacity: 0, y: 20, filter: 'blur(7px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1.1 }}
              aria-live="polite"
            >
              <h3>
                My favorite view
                <br />
                was still <em>you.</em> ❤️
              </h3>
              <p className="cheesy-note">
                Yes, very cheesy.
                <br />
                But also very true hehe.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </Reveal>
    </section>
  );
}
