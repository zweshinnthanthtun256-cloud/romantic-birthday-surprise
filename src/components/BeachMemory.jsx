import FloatingHearts from './FloatingHearts';
import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Heart, Waves } from 'lucide-react';
import { Reveal, SectionHeading, Photo } from './Shared';
import { beachPhotos } from '../data/memories';
import PhotoLightbox from './PhotoLightbox';
export default function BeachMemory({ celebrate }) {
  const [revealed, setRevealed] = useState(false);
  const lightbox=useRef(null);
  return (
    <section className="section beach-section" id="ngwe-saung"><FloatingHearts />
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
      <p className="beach-album-note">12 little pieces of a trip I’ll always keep. Tap a photo to open it.</p>
      <div className="beach-polaroids">
        {beachPhotos.map((p, i) => (
          <Reveal key={p.image} className={`beach-polaroid polaroid-${i}`}>
            <button className="beach-photo-button" onClick={e=>lightbox.current.open(i,e.currentTarget)} aria-label={`Open Ngwe Saung photo ${i+1}: ${p.caption}`}><Photo src={p.image} alt={p.alt||p.caption}/><span className="polaroid-number">{String(i+1).padStart(2,"0")}</span><span className="polaroid-caption">{p.caption}</span></button>
          </Reveal>
        ))}
      </div>
      <PhotoLightbox ref={lightbox} photos={beachPhotos} label="Ngwe Saung photo memories"/>
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

