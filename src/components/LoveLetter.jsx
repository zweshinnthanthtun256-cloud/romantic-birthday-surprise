import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Mail, Heart } from 'lucide-react';
import { siteConfig as config } from '../data/siteConfig';
import { SectionHeading } from './Shared';
import FloatingHearts from './FloatingHearts';
export default function LoveLetter() {
  const [open, setOpen] = useState(false);
  return (
    <section className="section letter-section" id="letter">
      <FloatingHearts />
      <SectionHeading eyebrow="04 / FROM MY HEART TO YOURS">
        I wrote something <em>for you…</em>
      </SectionHeading>
      <div className={`envelope ${open ? 'opened' : ''}`}>
        <motion.div
          className="envelope-icon"
          animate={{ rotateX: open ? 180 : 0, opacity: open ? 0.35 : 1 }}
          transition={{ duration: 0.8 }}
        >
          <Mail size={96} strokeWidth={0.8} />
          <Heart size={20} fill="currentColor" />
        </motion.div>
        {!open && <p>A few words. All my love.</p>}
        <button
          className="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="love-letter"
        >
          {open ? 'Fold My Letter' : 'Open My Letter'} <Mail size={17} />
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.article
            id="love-letter"
            className="letter-paper"
            initial={{ opacity: 0, height: 0, y: -30 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.65 }}
          >
            <span className="letter-date">WITH LOVE, ON YOUR {config.age}ND BIRTHDAY</span>
            <h3>My Love,</h3>
            <p>Happy {config.age}nd Birthday.</p>
            {config.letter.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <p>Happy Birthday, my love. ❤️</p>
            <div className="signature">
              Always yours,
              <br />
              <strong>{config.boyfriendName}</strong>
            </div>
            <Heart size={24} strokeWidth={1} />
          </motion.article>
        )}
      </AnimatePresence>
    </section>
  );
}
