import { motion, useReducedMotion } from 'framer-motion';
import { Heart, Mail } from 'lucide-react';
import FloatingHearts from './FloatingHearts';
import AnimatedWords from './AnimatedWords';
import { siteConfig as config } from '../data/siteConfig';
export default function IntroScreen({ onOpen }) {
  const reduced = useReducedMotion();
  const reveal = (delay) => ({
    initial: { opacity: 0, y: reduced ? 0 : 12 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduced ? 0.15 : 1, delay: reduced ? 0 : delay },
  });
  return (
    <motion.div
      className="intro pearl-intro"
      exit={{ opacity: 0, filter: reduced ? 'none' : 'blur(12px)' }}
      transition={{ duration: 0.65 }}
    >
      <FloatingHearts />
      <div className="intro-corner">
        <span>A PRIVATE LITTLE LOVE LETTER</span>
        <span>05 / 11 / 2026</span>
      </div>
      <div className="intro-orbit" aria-hidden="true" />
      <motion.span className="eyebrow" {...reveal(0)}>
        FOR SOMEONE VERY SPECIAL…
      </motion.span>
      <div className="intro-rose-medallion" aria-hidden="true">
        <img src={config.heroImage} alt="" />
        <span>22</span>
      </div>
      <motion.p className="intro-sentence" {...reveal(0.8)}>
        I made a little something for you.
      </motion.p>
      <motion.h1 {...reveal(1.7)}>
        <em>
          <AnimatedWords text={config.nickname} />
        </em>
        <span className="intro-white-heart">🤍</span>
      </motion.h1>
      <motion.button
        {...reveal(2.5)}
        whileTap={{ scale: 0.97 }}
        className="button"
        onClick={onOpen}
      >
        Open Your Birthday Surprise <Mail size={18} />
      </motion.button>
      <motion.span className="intro-note" {...reveal(2.8)}>
        NOVEMBER 5 · YOUR TWENTY-SECOND CHAPTER
      </motion.span>
    </motion.div>
  );
}
