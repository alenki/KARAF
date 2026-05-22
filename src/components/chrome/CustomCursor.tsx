import { useEffect, useRef } from 'react';
import { useIsTouch } from '../../hooks/useMediaQuery';
import styles from './CustomCursor.module.css';

export function CustomCursor() {
  const isTouch = useIsTouch();
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isTouch) return;
    const dot = dotRef.current;
    if (!dot) return;

    let x = 0;
    let y = 0;
    let tx = 0;
    let ty = 0;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };

    const onOver = (e: Event) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest('a, button, [data-cursor="hover"], input, textarea, label');
      dot.classList.toggle(styles.hover, !!interactive);
    };

    const tick = () => {
      x += (tx - x) * 0.22;
      y += (ty - y) * 0.22;
      dot.style.transform = `translate3d(${x - 4}px, ${y - 4}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerover', onOver, true);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerover', onOver, true);
      cancelAnimationFrame(raf);
    };
  }, [isTouch]);

  if (isTouch) return null;

  return <div ref={dotRef} className={styles.dot} aria-hidden="true" />;
}
