import { useCallback, useRef, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import IntroScreen from './components/IntroScreen';
import CinematicIntro from './components/CinematicIntro';
import BirthdayDate from './components/BirthdayDate';
import RelationshipCounter from './components/RelationshipCounter';
import BeachMemory from './components/BeachMemory';
import ReadingProgress from './components/ReadingProgress';
import Hero from './components/Hero';
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
import AccessGate from './components/AccessGate';
export default function App() {
  const [accessGranted, setAccessGranted] = useState(
      () => window.sessionStorage.getItem('birthday-surprise-unlocked') === 'yes',
    ),
    [opened, setOpened] = useState(false),
    [burst, setBurst] = useState(null);
  const music = useRef(null);
  const [cinematicDone, setCinematicDone] = useState(false);
  const finishCinematic = useCallback(() => setCinematicDone(true), []);
  const celebrate = useCallback((event) => {
      const rect = event?.currentTarget?.getBoundingClientRect();
      setBurst({
        id: performance.now(),
        x: event?.clientX || (rect ? rect.left + rect.width / 2 : window.innerWidth / 2),
        y: event?.clientY || (rect ? rect.top + rect.height / 2 : window.innerHeight * 0.65),
      });
    }, []),
    finish = useCallback(() => setBurst(null), []);
  const open = (event) => {
    music.current?.start();
    setOpened(true);
    celebrate(event);
  };
  return (
    <MotionConfig reducedMotion="user">
      <MusicPlayer ref={music} visible={opened} />
      <AnimatePresence mode="wait">
        {!accessGranted ? (
          <AccessGate key="access-gate" onUnlock={() => setAccessGranted(true)} />
        ) : !opened ? (
          <IntroScreen key="intro" onOpen={open} />
        ) : !cinematicDone ? (
          <CinematicIntro key="cinematic" onComplete={finishCinematic} />
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
            <ReadingProgress />
            <Hero />
            <BirthdayDate />
            <StoryTimeline />
            <RelationshipCounter />
            <BeachMemory celebrate={celebrate} />
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
      {burst && <ConfettiEffect key={burst.id} burst={burst} onDone={finish} />}
    </MotionConfig>
  );
}
