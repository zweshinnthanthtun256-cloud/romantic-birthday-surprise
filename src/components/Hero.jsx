import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Heart, ArrowDown, ArrowUpRight, CakeSlice } from 'lucide-react';
import { siteConfig as config } from '../data/siteConfig';
import { Reveal, Counter } from './Shared';
export default function Hero() {
  const ref = useRef(null),
    reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 40]);
  return (
    <>
      <header className="masthead">
        <span>
          for you, <em>always.</em>
        </span>
        <span className="eyebrow">A BIRTHDAY KEEPSAKE · {config.age}</span>
        <Heart size={18} />
      </header>
      <section ref={ref} className="hero" id="birthday" aria-label="Birthday">
        <Reveal className="hero-copy">
          <span className="eyebrow">
            <i /> THE WORLD IS LOVELIER WITH YOU IN IT
          </span>
          <h1 tabIndex={-1} id="birthday-heading">
            Happy {config.age}nd
            <br />
            Birthday,
            <br />
            <em>{config.girlfriendName}.</em>
            <Heart size={30} />
          </h1>
          <p>{config.heroMessage}</p>
          <a className="button" href="#story">
            A little journey through us <ArrowUpRight size={17} />
          </a>
          <a className="scroll-note" href="#story">
            <ArrowDown size={14} /> SCROLL TO UNWRAP THE LOVE
          </a>
        </Reveal>
        <motion.div className="hero-art" style={{ y: reduced ? 0 : y }}>
          <img
            src={config.heroImage}
            alt="Blush roses, ivory silk, and a burgundy ribbon"
            fetchPriority="high"
          />
          <div className="chapter">
            <span>CHAPTER</span>
            <motion.strong
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5 }}
            >
              {config.age}
            </motion.strong>
            <em>and just getting started</em>
          </div>
          <div className="image-note">{config.age} years of making this world more beautiful.</div>
        </motion.div>
      </section>
      <section className="moments-strip" aria-label="A life full of beautiful moments">
        <div className="stats">
          <Reveal>
            <strong>
              <Counter value={config.age} />
            </strong>
            <span>Beautiful years</span>
          </Reveal>
          <Reveal>
            <strong>
              <Counter value={config.age * 12} />
            </strong>
            <span>Months of magic</span>
          </Reveal>
          <Reveal>
            <strong>
              <Heart size={37} strokeWidth={1} />
            </strong>
            <span>Amazing memories</span>
          </Reveal>
          <Reveal>
            <strong>∞</strong>
            <span>More memories to create</span>
          </Reveal>
        </div>
        <p>And somehow, I was lucky enough to become part of your story.</p>
        <CakeSlice size={22} strokeWidth={1} className="mx-auto mt-5" />
      </section>
    </>
  );
}
