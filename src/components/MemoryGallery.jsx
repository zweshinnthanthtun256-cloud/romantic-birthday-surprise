import { useEffect, useRef, useState } from 'react';
import { Heart, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { photos } from '../data/memories';
import { Photo, Reveal, SectionHeading } from './Shared';
export default function MemoryGallery() {
  const [index, setIndex] = useState(null);
  const dialog = useRef(null),
    trigger = useRef(null);
  const close = () => {
    dialog.current.close();
    setIndex(null);
    trigger.current?.focus();
  };
  const move = (delta) => setIndex((i) => (i + delta + photos.length) % photos.length);
  useEffect(() => {
    if (index === null) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [index]);
  const open = (i, e) => {
    trigger.current = e.currentTarget;
    setIndex(i);
    dialog.current.showModal();
  };
  return (
    <section className="section gallery-section" id="memories">
      <SectionHeading
        eyebrow="02 / LITTLE MOMENTS, BIG FEELINGS"
        description="If I could bottle a feeling, it would be these moments with you."
      >
        My Favorite Memories <em>With You</em>
      </SectionHeading>
      <div className="gallery">
        {photos.map((p, i) => (
          <Reveal key={p.image} className={`gallery-item gallery-item-${i}`}>
            <button
              className="gallery-button"
              onClick={(e) => open(i, e)}
              aria-label={`Open photo: ${p.caption}`}
            >
              <Photo src={p.image} alt={p.caption} />
              <span className="gallery-heart">
                <Heart size={20} />
              </span>
              <span className="gallery-caption">
                <span className="eyebrow">MEMORY {String(i + 1).padStart(2, '0')}</span>
                <strong>{p.caption}</strong>
                <span>{p.note}</span>
              </span>
            </button>
          </Reveal>
        ))}
      </div>
      <p className="small-note">Every picture, a little piece of us.</p>
      <dialog
        ref={dialog}
        className="lightbox"
        onCancel={(e) => {
          e.preventDefault();
          close();
        }}
        onClick={(e) => {
          if (e.target === dialog.current) close();
        }}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') {
            e.preventDefault();
            move(1);
          }
          if (e.key === 'ArrowLeft') {
            e.preventDefault();
            move(-1);
          }
        }}
        aria-label="Photo memories"
      >
        {index !== null && (
          <div className="lightbox-inner">
            <button className="icon-button lightbox-close" onClick={close} aria-label="Close photo">
              <X />
            </button>
            <Photo src={photos[index].image} alt={photos[index].caption} />
            <div className="lightbox-bottom">
              <button className="icon-button" onClick={() => move(-1)} aria-label="Previous photo">
                <ChevronLeft />
              </button>
              <div aria-live="polite">
                <h3>{photos[index].caption}</h3>
                <p>
                  {index + 1} / {photos.length} · {photos[index].note}
                </p>
              </div>
              <button className="icon-button" onClick={() => move(1)} aria-label="Next photo">
                <ChevronRight />
              </button>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
