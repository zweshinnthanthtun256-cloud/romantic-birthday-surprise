import { Heart } from 'lucide-react';
import { Reveal, SectionHeading } from './Shared';
export default function StoryTimeline() {
  return (
    <section className="section our-beginning" id="story">
      <SectionHeading eyebrow="01 / THE DAY THERE WAS A YOU AND ME">
        Our Story <em>Started Here</em>
      </SectionHeading>
      <Reveal className="beginning-note">
        <div className="beginning-marker">
          <Heart size={20} fill="currentColor" />
        </div>
        <time dateTime="2025-10-02">October 2, 2025</time>
        <p>Maybe it looked like an ordinary day to everyone else.</p>
        <p>
          But for me, it became the beginning of a story
          <br className="desktop-break" /> that I would never want to forget.
        </p>
        <h3>
          The day I met you. <Heart size={22} />
        </h3>
        <div className="connecting-line" />
        <div className="date-connection">
          <span>02 OCT 2025</span>
          <Heart size={15} />
          <span>05 NOV 2026</span>
        </div>
      </Reveal>
    </section>
  );
}
