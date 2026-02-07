import { useRef } from 'react';
import { useGSAP, gsap } from '../../hooks/useGSAP';
import ScrollReveal from '../shared/ScrollReveal';
import styles from './About.module.css';

const STATS = [
  { value: 15, suffix: '+', label: 'Projects' },
  { value: 2, suffix: '+', label: 'Years' },
  { value: 4, suffix: '', label: 'Disciplines' },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const statRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useGSAP(() => {
    if (!sectionRef.current) return;

    // Animated counters
    STATS.forEach((stat, i) => {
      const el = statRefs.current[i];
      if (!el) return;

      const obj = { val: 0 };
      gsap.to(obj, {
        val: stat.value,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
        },
        onUpdate: () => {
          el.textContent = Math.round(obj.val) + stat.suffix;
        },
      });
    });
  }, [], sectionRef);

  return (
    <section ref={sectionRef} id="about" className={styles.about}>
      <div className={styles.container}>
        <ScrollReveal>
          <p className={styles.manifesto}>
            We design and build products where strategy, engineering, and artificial intelligence work as one.
          </p>
        </ScrollReveal>

        <div className={styles.stats}>
          {STATS.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.1} className={styles.stat}>
              <span
                ref={(el) => { statRefs.current[i] = el; }}
                className={styles.statValue}
              >
                0
              </span>
              <span className={styles.statLabel}>{stat.label}</span>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
