import { useRef } from 'react';
import { useGSAP, gsap } from '../../hooks/useGSAP';
import styles from './Hero.module.css';

interface HeroProps {
  ready: boolean;
}

export default function Hero({ ready }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ready || !titleRef.current) return;

    const chars = titleRef.current.querySelectorAll('span');
    const tl = gsap.timeline({ delay: 0.3 });

    tl.to(chars, {
      clipPath: 'inset(0 0% 0 0)',
      duration: 0.9,
      ease: 'power4.out',
      stagger: 0.06,
    })
      .to(
        subtitleRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
        },
        '-=0.3'
      )
      .to(
        scrollRef.current,
        {
          opacity: 1,
          duration: 0.6,
        },
        '-=0.2'
      );
  }, [ready]);

  const letters = 'KARAF'.split('');

  return (
    <section ref={sectionRef} className={styles.hero}>
      <div className={styles.bgGrid} />
      <div className={styles.bgGlow} />

      <div className={styles.content}>
        <h1 ref={titleRef} className={styles.title}>
          {letters.map((letter, i) => (
            <span key={i}>{letter}</span>
          ))}
        </h1>
        <p ref={subtitleRef} className={styles.subtitle}>
          <span>Digital Agency</span>
          <span className={styles.dash}> — </span>
          <br className={styles.mobileBreak} />
          <span>Web / Mobile / AI / Bots</span>
        </p>
      </div>

      <div ref={scrollRef} className={styles.scrollIndicator}>
        <div className={styles.scrollLine} />
        <span className={styles.scrollText}>Scroll</span>
      </div>
    </section>
  );
}
