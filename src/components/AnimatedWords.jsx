import { motion, useReducedMotion } from 'framer-motion';
export default function AnimatedWords({ text, className = '' }) {
  const reduced = useReducedMotion();
  return (
    <span className={`animated-words ${className}`} aria-label={text}>
      {text.split(' ').map((word, i) => (
        <span className="word-mask" key={`${word}-${i}`} aria-hidden="true">
          <motion.span
            initial={reduced ? false : { y: '105%', opacity: 0, rotate: 3 }}
            whileInView={{ y: 0, opacity: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, delay: reduced ? 0 : i * 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            {word}
          </motion.span>{' '}
        </span>
      ))}
    </span>
  );
}
