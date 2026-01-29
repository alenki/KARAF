import { useRef } from 'react';
import { useGSAP, gsap } from '../../hooks/useGSAP';
import styles from './ScrollReveal.module.css';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
  stagger?: number;
}

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  y = 60,
  duration = 1,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;

    gsap.from(ref.current, {
      y,
      opacity: 0,
      duration,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });
  }, [], ref);

  return (
    <div ref={ref} className={`${styles.wrapper} ${className}`}>
      {children}
    </div>
  );
}
