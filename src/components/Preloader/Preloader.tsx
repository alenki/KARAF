import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import styles from './Preloader.module.css';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
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

    // Letter reveal
    if (textRef.current) {
      const chars = textRef.current.querySelectorAll('span');
      tl.from(
        chars,
        {
          clipPath: 'inset(0 100% 0 0)',
          duration: 0.8,
          ease: 'power4.out',
          stagger: 0.05,
        },
        0
      );
    }

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  const letters = 'KARAF'.split('');

  return (
    <div ref={overlayRef} className={styles.overlay}>
      <div className={styles.content}>
        <div ref={textRef} className={styles.title}>
          {letters.map((letter, i) => (
            <span key={i} className={styles.letter}>
              {letter}
            </span>
          ))}
        </div>
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
