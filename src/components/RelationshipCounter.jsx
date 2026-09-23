import { useEffect, useState } from 'react';
import { siteConfig } from '../data/siteConfig';
import { elapsedSince, calendarDaysBetween } from '../data/dates';
import { SectionHeading } from './Shared';
export default function RelationshipCounter() {
  const [elapsed, setElapsed] = useState(() => elapsedSince(siteConfig.relationshipStartDate));
  useEffect(() => {
    const tick = () => setElapsed(elapsedSince(siteConfig.relationshipStartDate));
    const timer = setInterval(tick, 1000);
    document.addEventListener('visibilitychange', tick);
    return () => {
      clearInterval(timer);
      document.removeEventListener('visibilitychange', tick);
    };
  }, []);
  const birthdayDays = calendarDaysBetween(
    siteConfig.relationshipStartDate,
    siteConfig.celebrationDate,
  );
  return (
    <section className="section relationship-counter" id="since-we-met">
      <SectionHeading eyebrow="AND HERE WE ARE">
        Since I <em>Met You</em>
      </SectionHeading>
      <div
        className="live-counter"
        role="timer"
        aria-label="Time since October 2, 2025"
        aria-live="off"
      >
        {Object.entries(elapsed).map(([label, value]) => (
          <div key={label}>
            <strong>{label === 'days' ? value : String(value).padStart(2, '0')}</strong>
            <span>{label}</span>
          </div>
        ))}
      </div>
      <p>
        And somehow, every day with you becomes
        <br className="desktop-break" /> another memory I want to keep.
      </p>
      <div className="birthday-days">
        <strong>{birthdayDays}</strong>
        <span>
          days from our first hello
          <br />
          to your 22nd birthday.
        </span>
      </div>
    </section>
  );
}
