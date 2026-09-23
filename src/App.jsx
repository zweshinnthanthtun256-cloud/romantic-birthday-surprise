import { useCallback, useRef, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import IntroScreen from './components/IntroScreen';
import Hero from './components/Hero';
import FloatingHearts from './components/FloatingHearts';
import StoryTimeline from './components/StoryTimeline';
import MemoryGallery from './components/MemoryGallery';
import ReasonsILoveYou from './components/ReasonsILoveYou';
import LoveLetter from './components/LoveLetter';
import LoveHeart from './components/LoveHeart';
import BirthdayWish from './components/BirthdayWish';
import SecretSurprise from './components/SecretSurprise';
import FinalMessage from './components/FinalMessage';
import MusicPlayer from './components/MusicPlayer';
import ProgressNav from './components/ProgressNav';
import ConfettiEffect from './components/ConfettiEffect';
export default function App() {
  const [opened, setOpened] = useState(false),
    [burst, setBurst] = useState(0);
  const music = useRef(null);
  const celebrate = useCallback(() => setBurst(Date.now()), []),
    finish = useCallback(() => setBurst(0), []);
  const open = () => {
    music.current?.start();
    setOpened(true);
    celebrate();
  };
  return (
    <MotionConfig reducedMotion="user">
      <MusicPlayer ref={music} visible={opened} />
      <AnimatePresence mode="wait">
        {!opened ? (
          <IntroScreen key="intro" onOpen={open} />
        ) : (
          <motion.main
            key="experience"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            onAnimationComplete={() =>
              document.getElementById('birthday-heading')?.focus({ preventScroll: true })
            }
          >
            <FloatingHearts />
            <Hero />
            <StoryTimeline />
            <MemoryGallery />
            <ReasonsILoveYou celebrate={celebrate} />
            <LoveLetter />
            <LoveHeart celebrate={celebrate} />
            <BirthdayWish celebrate={celebrate} />
            <SecretSurprise celebrate={celebrate} />
            <FinalMessage />
            <ProgressNav />
          </motion.main>
        )}
      </AnimatePresence>
      {burst > 0 && <ConfettiEffect key={burst} id={burst} onDone={finish} />}
    </MotionConfig>
  );
}
