import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Mail, Heart, PenLine } from 'lucide-react';
import { siteConfig as config } from '../data/siteConfig';
import { SectionHeading } from './Shared';
import FloatingHearts from './FloatingHearts';
export default function LoveLetter() {
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();
  return (
    <section className="section letter-section" id="letter">
      <FloatingHearts />
      <SectionHeading eyebrow="05 / A LETTER, JUST FOR YOU">
        I wrote something <em>for you…</em>
      </SectionHeading>
      <div className={`envelope stationery ${open ? 'opened' : ''}`}>
        <div className="stationery-top">
          <span>TO MY THEL THEL LAY</span>
          <PenLine size={18} strokeWidth={1} />
        </div>
        <motion.div
          className="envelope-icon"
          animate={{
            rotateX: open && !reduced ? 160 : 0,
            y: open ? -8 : 0,
            opacity: open ? 0.45 : 1,
          }}
          transition={{ duration: 0.8 }}
        >
          <Mail size={110} strokeWidth={0.65} />
          <Heart size={20} fill="currentColor" />
        </motion.div>
        <p>
          A few words.
          <br />
          <em>All my love.</em>
        </p>
        <button
          className="button letter-open-button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="love-letter"
        >
          {open ? 'Fold My Letter' : 'Open My Letter'} <Mail size={16} />
        </button>
        <span className="stationery-bottom">SEALED WITH A LITTLE TOO MUCH LOVE</span>
      </div>
      <AnimatePresence>
        {open && (
          <motion.article
            id="love-letter"
            className="letter-paper"
            initial={{ opacity: 0, height: 0, y: reduced ? 0 : 45, rotate: reduced ? 0 : -2 }}
            animate={{ opacity: 1, height: 'auto', y: 0, rotate: 0 }}
            exit={{ opacity: 0, height: 0, y: 20 }}
            transition={{ duration: reduced ? 0.15 : 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="letter-date">WITH LOVE, ON YOUR {config.age}ND BIRTHDAY</span>
            <h3>My {config.nickname},</h3>
            <p>Happy {config.age}nd Birthday.</p>
            {config.letter.map((p, i) => (
              <motion.p
                key={p}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: reduced ? 0 : i * 0.035, duration: 0.5 }}
              >
                {p}
              </motion.p>
            ))}
            <p>Happy Birthday, my love. 🤍</p>
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
