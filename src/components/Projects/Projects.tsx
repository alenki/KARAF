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
    const totalScroll = track.scrollWidth - window.innerWidth;

    gsap.to(track, {
      x: -totalScroll,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: () => `+=${totalScroll}`,
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
  }, [isMobile]);

  return (
    <section ref={sectionRef} id="projects" className={styles.projects}>
      <div className={styles.header}>
        <h2 className={styles.title}>Selected Work</h2>
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
