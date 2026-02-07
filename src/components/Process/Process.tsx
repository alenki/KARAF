import { useRef } from 'react';
import { useGSAP, gsap } from '../../hooks/useGSAP';
import styles from './Process.module.css';

const STEPS = [
  {
    number: '01',
    title: 'Исследование',
    description:
      'Анализируем цели бизнеса, аудиторию и рынок, чтобы определить объём и стратегию проекта.',
  },
  {
    number: '02',
    title: 'Дизайн',
    description:
      'Вайрфреймы, прототипы и визуальный дизайн — каждое взаимодействие продумано до мелочей.',
  },
  {
    number: '03',
    title: 'Разработка',
    description:
      'Чистый и производительный код на современных технологиях. Тщательное тестирование на каждом этапе.',
  },
  {
    number: '04',
    title: 'Запуск',
    description:
      'Деплой, оптимизация и постоянная поддержка — чтобы ваш продукт уверенно работал.',
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<SVGLineElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    // Draw the vertical line on scroll
    if (lineRef.current) {
      const length = lineRef.current.getTotalLength();
      gsap.set(lineRef.current, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });
      gsap.to(lineRef.current, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          end: 'bottom 80%',
          scrub: 1,
        },
      });
    }

    // Fade in steps
    const steps = sectionRef.current.querySelectorAll(`.${styles.step}`);
    steps.forEach((step) => {
      gsap.from(step, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: step,
          start: 'top 85%',
        },
      });
    });
  }, [], sectionRef);

  return (
    <section ref={sectionRef} className={styles.process}>
      <div className={styles.container}>
        <h2 className={styles.title}>Как мы работаем</h2>

        <div className={styles.timeline}>
          <svg className={styles.line} viewBox="0 0 2 400" preserveAspectRatio="none">
            <line
              ref={lineRef}
              x1="1"
              y1="0"
              x2="1"
              y2="400"
              stroke="var(--color-ember)"
              strokeWidth="2"
            />
          </svg>

          {STEPS.map((step, i) => (
            <div
              key={step.number}
              className={`${styles.step} ${i % 2 === 0 ? styles.stepLeft : styles.stepRight}`}
            >
              <span className={styles.bgNumber}>{step.number}</span>
              <span className={styles.stepNumber}>{step.number}</span>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDesc}>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
