import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import FloatingHearts from './FloatingHearts';
export default function IntroScreen({ onOpen }) {
  return (
    <motion.div
      className="intro"
      exit={{ opacity: 0, filter: 'blur(12px)' }}
      transition={{ duration: 0.65 }}
    >
      <FloatingHearts dark />
      <span className="eyebrow">A LITTLE SOMETHING, JUST FOR YOU</span>
      <Heart className="intro-heart" size={42} strokeWidth={1} />
      <motion.h1
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        A little surprise for
        <br />
        someone <em>very special…</em>
      </motion.h1>
      <p>Today is yours. This little corner of the world is, too.</p>
      <motion.button whileTap={{ scale: 0.97 }} className="button light" onClick={onOpen}>
        Open Your Surprise <Heart size={16} />
      </motion.button>
      <span className="intro-note">MADE WITH LOVE · CHAPTER 22</span>
    </motion.div>
  );
}
