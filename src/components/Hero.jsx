import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Heart, ArrowDown, ArrowUpRight } from 'lucide-react';
import { siteConfig as config } from '../data/siteConfig';
import { Reveal } from './Shared';
import AnimatedWords from './AnimatedWords';
import FloatingHearts from './FloatingHearts';
import TiltSurface from './TiltSurface';
export default function Hero() {
  const ref = useRef(null),
    reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 35]);
  return (
    <>
      <header className="masthead">
        <span>
          for you, <em>Thel Thel Lay.</em>
        </span>
        <span className="eyebrow">NOVEMBER 5 · A LOVE LETTER IN LITTLE MOMENTS</span>
        <Heart size={18} />
      </header>
      <section ref={ref} className="hero personal-hero" id="birthday" aria-label="Birthday">
        <FloatingHearts />
        <Reveal className="hero-copy">
          <span className="eyebrow">
            <i /> CHAPTER 22 BEGINS HERE
          </span>
          <p className="birthday-greeting">Happy 22nd Birthday</p>
          <h1 tabIndex={-1} id="birthday-heading" aria-label={config.girlfriendName}>
            <em>
              <AnimatedWords text={config.girlfriendName} />
            </em>
          </h1>
          <p className="nickname">
            My {config.nickname} <Heart size={21} strokeWidth={1} />
          </p>
          <p className="hero-dedication">
            22 years of you making this world a little more beautiful.
          </p>
          <p className="hero-personal-note">{config.heroMessage}</p>
          <p className="hero-handwritten">A little love letter. A lot of love.</p>
          <a className="button" href="#birthday-date">
            A little something, just for you <ArrowUpRight size={17} />
          </a>
          <a className="scroll-note" href="#birthday-date">
            <ArrowDown size={14} /> UNFOLD OUR LITTLE STORY
          </a>
        </Reveal>
        <TiltSurface className="hero-art" style={{ y: reduced ? 0 : y }}>
          <img src={config.heroImage} alt="Soft roses resting on ivory silk" fetchPriority="high" />
          <div className="chapter">
            <span>YOUR CHAPTER</span>
            <motion.strong
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.6 }}
            >
              22
            </motion.strong>
            
            <em>a little more beautiful, with you</em>
          </div>
          <span className="hero-date-badge">
            <strong>05</strong>
            <span>NOVEMBER</span>
          </span>
          <div className="image-note">For my favorite person. Always. 🤍</div>
        </TiltSurface>
      </section>
    </>
  );
}
