import { Heart } from 'lucide-react';
import { Reveal } from './Shared';
import { siteConfig } from '../data/siteConfig';
export default function BirthdayDate() {
  return (
    <section id="birthday-date" className="section birthday-date-section editorial-date">
      <Reveal className="date-editorial-layout">
        <div className="date-display">
          <span className="eyebrow">THE BEGINNING OF YOU</span>
          <time dateTime={siteConfig.birthday}>
            <strong>05</strong>
            <span>NOVEMBER, 2004</span>
          </time>
          <span className="date-small">05 • 11 • 2004</span>
        </div>
        <div className="date-editorial-copy">
          <Heart size={25} strokeWidth={1} />
          <h2>
            The day the world got
            <br />
            <em>a little prettier.</em>
          </h2>
          <p>Probably way prettier, actually. 🤍</p>
          <p className="birthday-date-signoff">
            Happy 22nd Birthday,
            <br />
            {siteConfig.nickname}.
          </p>
        </div>
      </Reveal>
    </section>
  );
}
