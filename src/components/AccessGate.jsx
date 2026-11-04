import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { CalendarDays, Clock3, Eye, Heart, LockKeyhole } from 'lucide-react';
import FloatingHearts from './FloatingHearts';
import { siteConfig } from '../data/siteConfig';

const pad = (value) => String(value).padStart(2, '0');

function getTimeLeft(targetTime, now) {
  const distance = Math.max(0, targetTime - now);
  return {
    total: distance,
    days: Math.floor(distance / 86_400_000),
    hours: Math.floor((distance / 3_600_000) % 24),
    minutes: Math.floor((distance / 60_000) % 60),
    seconds: Math.floor((distance / 1_000) % 60),
  };
}

export default function AccessGate({ onUnlock, onPreview }) {
  const reduced = useReducedMotion();
  const targetTime = useMemo(() => new Date(siteConfig.revealDateTime).getTime(), []);
  const previewCutoffTime = useMemo(
    () => new Date(siteConfig.previewCutoffDateTime).getTime(),
    [],
  );
  const [now, setNow] = useState(() => Date.now());
  const [anniversary, setAnniversary] = useState('');
  const [error, setError] = useState('');
  const [attempt, setAttempt] = useState(0);
  const [testingVerification, setTestingVerification] = useState(false);
  const timeLeft = getTimeLeft(targetTime, now);
  const isRevealTime = timeLeft.total === 0 || testingVerification;
  const showPreviewButton = now < previewCutoffTime;

  useEffect(() => {
    if (isRevealTime) return undefined;
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, [isRevealTime]);

  const submit = (event) => {
    event.preventDefault();
    if (anniversary === siteConfig.anniversaryUnlockDate) {
      if (testingVerification) {
        onPreview(event);
        return;
      }
      window.sessionStorage.setItem('birthday-surprise-unlocked', 'yes');
      onUnlock();
      return;
    }
    setError('That date does not match our anniversary. Try the day we officially became us.');
    setAttempt((value) => value + 1);
  };

  return (
    <motion.section
      className="access-gate"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: reduced ? 'none' : 'blur(12px)' }}
      transition={{ duration: reduced ? 0.15 : 0.8 }}
      aria-labelledby="gate-title"
    >
      <FloatingHearts dark />
      <div className="gate-glow" aria-hidden="true" />
      <div className="gate-topline">
        <span>A LITTLE SURPRISE, WAITING FOR YOU</span>
        <span>05 · 11 · 2026</span>
      </div>

      <AnimatePresence mode="wait">
        {!isRevealTime ? (
          <motion.div
            key="countdown"
            className="gate-card countdown-card"
            initial={{ opacity: 0, y: reduced ? 0 : 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: reduced ? 1 : 0.97 }}
          >
            <div className="gate-seal" aria-hidden="true">
              <Clock3 size={27} strokeWidth={1.2} />
            </div>
            <span className="gate-eyebrow">UNTIL YOUR TWENTY-SECOND CHAPTER</span>
            <h1 id="gate-title">Something beautifulsfdf is almost here.</h1>
            <p>This little love letter opens at midnight on your birthday.</p>

            <div className="countdown-grid" role="timer" aria-live="off">
              {[
                ['Days', timeLeft.days],
                ['Hours', timeLeft.hours],
                ['Minutes', timeLeft.minutes],
                ['Seconds', timeLeft.seconds],
              ].map(([label, value]) => (
                <div className="countdown-unit" key={label}>
                  <strong>{label === 'Days' ? value : pad(value)}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>

            <p className="gate-timezone">
              <span className="pulse-dot" aria-hidden="true" />
              Live countdown · Yangon time
            </p>
            {showPreviewButton && (
              <button
                className="gate-preview-button"
                type="button"
                onClick={() => {
                  setAnniversary('');
                  setError('');
                  setTestingVerification(true);
                }}
              >
                <Eye size={17} aria-hidden="true" />
                <span>
                  Preview birthday page
                  <small>Testing only · disappears November 4</small>
                </span>
              </button>
            )}
          </motion.div>
        ) : (
          <motion.form
            key="credentials"
            className="gate-card credential-card"
            onSubmit={submit}
            initial={{ opacity: 0, y: reduced ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <div className="gate-seal unlocked" aria-hidden="true">
              <LockKeyhole size={26} strokeWidth={1.2} />
            </div>
            <span className="gate-eyebrow">ONLY YOU KNOW THE KEY</span>
            <h1 id="gate-title">One date unlocks our story.</h1>
            <p>Enter our anniversary date—the day we officially became us.</p>

            <motion.div
              className="anniversary-field"
              key={attempt}
              animate={error && !reduced ? { x: [0, -8, 8, -5, 5, 0] } : undefined}
              transition={{ duration: 0.45 }}
            >
              <label htmlFor="anniversary-date">
                <CalendarDays size={17} aria-hidden="true" /> Our anniversary date
              </label>
              <input
                id="anniversary-date"
                type="date"
                value={anniversary}
                onChange={(event) => {
                  setAnniversary(event.target.value);
                  setError('');
                }}
                aria-describedby={error ? 'anniversary-error' : 'anniversary-hint'}
                required
                autoFocus
              />
            </motion.div>
            <p className="field-hint" id="anniversary-hint">A date only the two of us would remember.</p>
            {error && <p className="gate-error" id="anniversary-error" role="alert">{error}</p>}
            <button className="button gate-unlock-button" type="submit">
              Unlock my surprise <Heart size={18} fill="currentColor" aria-hidden="true" />
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
