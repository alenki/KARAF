import { useEffect, useRef } from 'react';
import { useIsTouch } from '../../hooks/useMediaQuery';
import styles from './CustomCursor.module.css';

export default function CustomCursor() {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const isTouch = useIsTouch();

  useEffect(() => {
    if (isTouch) return;

    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    let mouseX = 0;
    let mouseY = 0;
    let outerX = 0;
    let outerY = 0;
    let innerX = 0;
    let innerY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const onMouseEnterLink = () => {
      outer.classList.add(styles.hovering);
    };

    const onMouseLeaveLink = () => {
      outer.classList.remove(styles.hovering);
      outer.classList.remove(styles.projectHover);
      inner.classList.remove(styles.hidden);
    };

    const onMouseEnterProject = () => {
      outer.classList.add(styles.projectHover);
      inner.classList.add(styles.hidden);
    };

    const onMouseLeaveProject = () => {
      outer.classList.remove(styles.projectHover);
      inner.classList.remove(styles.hidden);
    };

    const loop = () => {
      outerX += (mouseX - outerX) * 0.12;
      outerY += (mouseY - outerY) * 0.12;
      innerX += (mouseX - innerX) * 0.25;
      innerY += (mouseY - innerY) * 0.25;

      outer.style.transform = `translate(${outerX - 12}px, ${outerY - 12}px)`;
      inner.style.transform = `translate(${innerX - 3}px, ${innerY - 3}px)`;
      requestAnimationFrame(loop);
    };

    document.addEventListener('mousemove', onMouseMove);

    // Attach hover handlers to links and project cards
    const attachHandlers = () => {
      document.querySelectorAll('a, button').forEach((el) => {
        el.addEventListener('mouseenter', onMouseEnterLink);
        el.addEventListener('mouseleave', onMouseLeaveLink);
      });
      document.querySelectorAll('[data-cursor="project"]').forEach((el) => {
        el.addEventListener('mouseenter', onMouseEnterProject);
        el.addEventListener('mouseleave', onMouseLeaveProject);
      });
    };

    // Use MutationObserver to handle dynamically added elements
    const observer = new MutationObserver(attachHandlers);
    observer.observe(document.body, { childList: true, subtree: true });
    attachHandlers();

    const rafId = requestAnimationFrame(loop);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      observer.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, [isTouch]);

  if (isTouch) return null;

  return (
    <>
      <div ref={outerRef} className={styles.outer}>
        <span className={styles.viewText}>View</span>
      </div>
      <div ref={innerRef} className={styles.inner} />
    </>
  );
}
