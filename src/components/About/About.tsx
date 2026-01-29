import { useRef } from 'react';
import { useGSAP, gsap } from '../../hooks/useGSAP';
import ScrollReveal from '../shared/ScrollReveal';
import styles from './About.module.css';

const STATS = [
  { value: 10, suffix: '+', label: 'Projects' },
  { value: 3, suffix: '+', label: 'Years' },
  { value: 4, suffix: '', label: 'Directions' },
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
        <div className={styles.grid}>
          <div className={styles.left}>
            <ScrollReveal>
              <h2 className={styles.statement}>
                We build digital products that matter.
              </h2>
            </ScrollReveal>
          </div>
          <div className={styles.right}>
            <ScrollReveal delay={0.2}>
              <p className={styles.philosophy}>
                KARAF is a digital agency based in Russia, specializing in crafting
                exceptional web and mobile experiences. We combine cutting-edge
                technology with bold design thinking to deliver products that stand
                apart. From AI-powered solutions to pixel-perfect interfaces, every
                project is built with precision, purpose, and an obsessive attention
                to detail.
              </p>
            </ScrollReveal>
          </div>
        </div>

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
