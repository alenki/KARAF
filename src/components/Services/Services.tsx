import { useRef, useEffect, useCallback } from 'react';
import { useGSAP, gsap } from '../../hooks/useGSAP';
import { services } from '../../data/services';
import styles from './Services.module.css';

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const lockListHeight = useCallback(() => {
    if (!listRef.current) return;
    listRef.current.style.height = 'auto';
    listRef.current.style.height = `${listRef.current.scrollHeight}px`;
  }, []);

  useEffect(() => {
    lockListHeight();
    window.addEventListener('resize', lockListHeight);
    return () => window.removeEventListener('resize', lockListHeight);
  }, [lockListHeight]);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const cards = sectionRef.current.querySelectorAll(`.${styles.card}`);
    cards.forEach((card) => {
      gsap.from(card, {
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
        },
      });
    });
  }, [], sectionRef);

  return (
    <section ref={sectionRef} id="services" className={styles.services}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Services</h2>
        </div>
        <div ref={listRef} className={styles.list}>
          {services.map((service) => (
            <div key={service.id} className={styles.card}>
              <span className={styles.number}>{service.number}</span>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{service.title}</h3>
                <p className={styles.cardDesc}>{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
