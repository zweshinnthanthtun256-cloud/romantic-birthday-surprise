import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
export default function TiltSurface({ children, className = '', style = {} }) {
  const reduced = useReducedMotion();
  const x = useMotionValue(0),
    y = useMotionValue(0);
  const rotateX = useSpring(x, { stiffness: 110, damping: 24 }),
    rotateY = useSpring(y, { stiffness: 110, damping: 24 });
  function move(event) {
    if (reduced || event.pointerType !== 'mouse') return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((-(event.clientY - rect.top - rect.height / 2) / rect.height) * 7);
    y.set(((event.clientX - rect.left - rect.width / 2) / rect.width) * 7);
  }
  return (
    <motion.div
      className={`tilt-surface ${className}`}
      style={{ ...style, rotateX, rotateY, transformPerspective: 1000 }}
      onPointerMove={move}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}
