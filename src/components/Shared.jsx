import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { Heart } from 'lucide-react';
export function Reveal({ children, className = '', ...props }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 22, filter: 'blur(3px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.7 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
export function SectionHeading({ eyebrow, children, description }) {
  return (
    <Reveal>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{children}</h2>
      {description && <p className="section-description">{description}</p>}
    </Reveal>
  );
}
export function Photo({ src, alt, className = '' }) {
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [src]);
  return (
    <div className={`photo-surface ${className}`}>
      {!failed && src ? (
        <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} />
      ) : (
        <div className="photo-fallback" role="img" aria-label={alt}>
          <Heart size={34} strokeWidth={1} />
          <span>A moment to keep</span>
        </div>
      )}
    </div>
  );
}
export function Counter({ value }) {
  const ref = useRef(null),
    inView = useInView(ref, { once: true }),
    reduced = useReducedMotion();
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setCount(value);
      return;
    }
    let frame, start;
    const tick = (t) => {
      start ??= t;
      const p = Math.min((t - start) / 1400, 1);
      setCount(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduced, value]);
  return <span ref={ref}>{count}</span>;
}
