import { Heart } from 'lucide-react';
import { memories } from '../data/memories';
import { siteConfig } from '../data/siteConfig';
import { Reveal, SectionHeading, Photo } from './Shared';
export default function StoryTimeline() {
  return (
    <section className="section story-section" id="story">
      <SectionHeading
        eyebrow="01 / THE BEAUTIFUL BEGINNING"
        description="Some moments pass. Some stay with us forever."
      >
        Our Little <em>Story</em> <Heart className="inline-icon" />
      </SectionHeading>
      <div className="timeline">
        {memories.map((m, i) => (
          <Reveal className="timeline-item" key={m.title}>
            <div className="timeline-photo">
              <Photo src={m.image} alt={m.title} />
            </div>
            <div className="timeline-marker">
              <Heart size={13} fill="currentColor" />
            </div>
            <div className="timeline-copy">
              <span className="eyebrow">
                {i === 0 && siteConfig.relationshipStartDate
                  ? siteConfig.relationshipStartDate
                  : i === memories.length - 1 && siteConfig.birthday
                    ? siteConfig.birthday
                    : m.date}
              </span>
              <h3>{m.title}</h3>
              <p>{m.description}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
