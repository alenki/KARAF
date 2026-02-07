import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import styles from './Preloader.module.css';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    // Remove the static HTML preloader now that React has mounted
    const staticPreloader = document.getElementById('static-preloader');
    if (staticPreloader) {
      staticPreloader.remove();
    }

    const tl = gsap.timeline({
      onComplete: () => {
        // Exit animation
        const exitTl = gsap.timeline({
          onComplete,
        });
        exitTl.to(overlayRef.current, {
          yPercent: -100,
          duration: 1,
          ease: 'power4.inOut',
        });
      },
    });

    // Animate counter from 0 to 100
    const counterObj = { val: 0 };
    tl.to(counterObj, {
      val: 100,
      duration: 2,
      ease: 'power2.inOut',
      onUpdate: () => {
        const v = Math.round(counterObj.val);
        setCounter(v);
        if (barRef.current) {
          barRef.current.style.transform = `scaleX(${v / 100})`;
        }
      },
    });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div ref={overlayRef} className={styles.overlay}>
      <div className={styles.content}>
        <div className={styles.progress}>
          <div className={styles.barTrack}>
            <div ref={barRef} className={styles.barFill} />
          </div>
          <span ref={counterRef} className={styles.counter}>
            {String(counter).padStart(3, '0')}
          </span>
        </div>
      </div>
    </div>
  );
}
