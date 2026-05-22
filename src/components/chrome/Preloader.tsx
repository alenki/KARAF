import { useEffect, useState } from 'react';
import styles from './Preloader.module.css';

type Props = { onComplete: () => void };

export function Preloader({ onComplete }: Props) {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const duration = 700;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setProgress(t);
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setExiting(true);
        window.setTimeout(onComplete, 360);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onComplete]);

  return (
    <div className={`${styles.preloader} ${exiting ? styles.exit : ''}`} aria-hidden="true">
      <span className={styles.mark}>KARAF</span>
      <span className={styles.bar}>
        <span className={styles.fill} style={{ transform: `scaleX(${progress})` }} />
      </span>
    </div>
  );
}
