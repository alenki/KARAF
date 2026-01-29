import { useRef } from 'react';
import { useGSAP, gsap, ScrollTrigger } from '../../hooks/useGSAP';
import styles from './TextReveal.module.css';

interface TextRevealProps {
  children: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  className?: string;
  delay?: number;
  scrollTrigger?: boolean;
}

export default function TextReveal({
  children,
  as: Tag = 'h2',
  className = '',
  delay = 0,
  scrollTrigger = true,
}: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const lines = containerRef.current.querySelectorAll(`.${styles.line}`);

    const tl = gsap.timeline({
      scrollTrigger: scrollTrigger
        ? {
            trigger: containerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          }
        : undefined,
      delay,
    });

    tl.from(lines, {
      yPercent: 110,
      duration: 1,
      ease: 'power4.out',
      stagger: 0.08,
    });
  }, [], containerRef);

  // Split text into words, wrap in line containers
  const words = children.split(' ');
  const lines: string[][] = [];
  // Simple split: ~6 words per line for visual variety
  for (let i = 0; i < words.length; i += 6) {
    lines.push(words.slice(i, i + 6));
  }

  return (
    <div ref={containerRef} className={className}>
      <Tag>
        {lines.map((lineWords, i) => (
          <span key={i} className={styles.lineWrapper}>
            <span className={styles.line}>
              {lineWords.join(' ')}
              {i < lines.length - 1 ? ' ' : ''}
            </span>
          </span>
        ))}
      </Tag>
    </div>
  );
}

// For registering ScrollTrigger
ScrollTrigger.defaults({ toggleActions: 'play none none none' });
