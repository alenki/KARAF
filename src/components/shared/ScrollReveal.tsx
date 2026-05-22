import { useEffect, useRef, type ReactNode } from 'react';
import styles from './ScrollReveal.module.css';

type Props = {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: 'div' | 'section' | 'article' | 'header';
};

export function ScrollReveal({ children, delay = 0, className = '', as: Tag = 'div' }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Default state: visible (so screenshots & no-JS environments render correctly).
    // Only hide + animate when IntersectionObserver is available.
    if (!('IntersectionObserver' in window)) return;

    el.classList.add(styles.pending);
    el.style.transitionDelay = `${delay}s`;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add(styles.revealed);
            io.unobserve(el);
          }
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  return (
    <Tag ref={ref as React.RefObject<HTMLDivElement>} className={`${styles.reveal} ${className}`}>
      {children}
    </Tag>
  );
}
