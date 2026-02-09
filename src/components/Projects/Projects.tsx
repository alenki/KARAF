import { useRef } from 'react';
import { useGSAP, gsap, ScrollTrigger } from '../../hooks/useGSAP';
import { useIsMobile } from '../../hooks/useMediaQuery';
import { projects } from '../../data/projects';
import styles from './Projects.module.css';

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useGSAP(() => {
    if (isMobile || !sectionRef.current || !trackRef.current) return;

    const track = trackRef.current;
    const getScrollDistance = () => track.scrollWidth - window.innerWidth;

    gsap.to(track, {
      x: () => -getScrollDistance(),
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: () => `+=${getScrollDistance()}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (progressRef.current) {
            progressRef.current.style.transform = `scaleX(${self.progress})`;
          }
        },
      },
    });

    // Refresh after images load to ensure correct scroll distance
    const images = track.querySelectorAll('img');
    let loaded = 0;
    const total = images.length;
    if (total > 0) {
      images.forEach((img) => {
        if (img.complete) {
          loaded++;
        } else {
          img.addEventListener('load', () => {
            loaded++;
            if (loaded === total) ScrollTrigger.refresh();
          }, { once: true });
        }
      });
      if (loaded === total) {
        requestAnimationFrame(() => ScrollTrigger.refresh());
      }
    }
  }, [isMobile]);

  return (
    <section ref={sectionRef} id="projects" className={styles.projects}>
      <div className={styles.header}>
        <h2 className={styles.title}>Our Work</h2>
        <span className={styles.count}>
          {String(projects.length).padStart(2, '0')} Projects
        </span>
      </div>

      {isMobile ? (
        <div className={styles.mobileGrid}>
          {projects.map((project) => (
            <a key={project.id} href={project.link} target="_blank" rel="noopener noreferrer" className={styles.mobileCard} data-cursor="project">
              <div className={styles.imageWrapper}>
                <img
                  src={project.image}
                  alt={project.name}
                  loading="lazy"
                  decoding="async"
                  className={styles.image}
                />
              </div>
              <div className={styles.cardInfo}>
                <span className={styles.cardNumber}>
                  {String(project.id).padStart(2, '0')}
                </span>
                <h3 className={styles.cardName}>{project.name}</h3>
                <span className={styles.cardCategory}>{project.category}</span>
              </div>
            </a>
          ))}
        </div>
      ) : (
        <>
          <div ref={trackRef} className={styles.track}>
            {projects.map((project) => (
              <a key={project.id} href={project.link} target="_blank" rel="noopener noreferrer" className={styles.card} data-cursor="project">
                <div className={styles.imageWrapper}>
                  <img
                    src={project.image}
                    alt={project.name}
                    loading="lazy"
                    decoding="async"
                    className={styles.image}
                  />
                </div>
                <div className={styles.cardInfo}>
                  <span className={styles.cardNumber}>
                    {String(project.id).padStart(2, '0')}/{String(projects.length).padStart(2, '0')}
                  </span>
                  <h3 className={styles.cardName}>{project.name}</h3>
                  <span className={styles.cardCategory}>{project.category}</span>
                </div>
              </a>
            ))}
          </div>
          <div className={styles.progressTrack}>
            <div ref={progressRef} className={styles.progressFill} />
          </div>
        </>
      )}
    </section>
  );
}
