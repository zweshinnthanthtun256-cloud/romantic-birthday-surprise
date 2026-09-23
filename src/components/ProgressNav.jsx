import { useEffect, useState } from 'react';
import { Heart, Camera, Mail, Cake, Gift } from 'lucide-react';
const links = [
  ['birthday', 'Birthday', Heart],
  ['memories', 'Memories', Camera],
  ['letter', 'Letter', Mail],
  ['wish', 'Wish', Cake],
  ['surprise', 'Surprise', Gift],
];
export default function ProgressNav() {
  const [active, setActive] = useState('birthday');
  useEffect(() => {
    let pending = false;
    const update = () => {
      pending = false;
      let current = links[0][0];
      for (const [id] of links) {
        if (document.getElementById(id)?.getBoundingClientRect().top <= window.innerHeight * 0.48)
          current = id;
      }
      setActive(current);
    };
    const scroll = () => {
      if (!pending) {
        pending = true;
        requestAnimationFrame(update);
      }
    };
    window.addEventListener('scroll', scroll, { passive: true });
    update();
    return () => window.removeEventListener('scroll', scroll);
  }, []);
  return (
    <nav className="progress-nav" aria-label="Birthday chapters">
      {links.map(([id, label, Icon]) => (
        <a
          key={id}
          href={`#${id}`}
          aria-label={label}
          aria-current={active === id ? 'location' : undefined}
          className={active === id ? 'active' : ''}
        >
          <Icon size={16} />
          <span>{label}</span>
        </a>
      ))}
    </nav>
  );
}
