import { useRef } from 'react';
import { useGSAP, gsap } from '../../hooks/useGSAP';
import ScrollReveal from '../shared/ScrollReveal';
import styles from './Contact.module.css';

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);

  // Parallax drift on the wordmark
  useGSAP(() => {
    const wm = wordmarkRef.current;
    if (!wm) return;

    gsap.to(wm, {
      yPercent: -15,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    });
  }, []);

  return (
    <section ref={sectionRef} id="contact" className={styles.contact}>
      {/* ── Headline ── */}
      <div className={styles.headlineRow}>
        <ScrollReveal>
          <h2 className={styles.title}>
            Let&apos;s build something<br />extraordinary.
          </h2>
        </ScrollReveal>
      </div>

      {/* ── Divider with ember accent ── */}
      <div className={styles.divider}>
        <span className={styles.dividerAccent} />
      </div>

      {/* ── Contact grid ── */}
      <div className={styles.contactGrid}>
        <ScrollReveal delay={0.1}>
          <div className={styles.contactBlock}>
            <span className={styles.contactLabel}>Telegram</span>
            <a
              href="https://t.me/karaf"
              className={styles.contactValue}
              target="_blank"
              rel="noopener noreferrer"
            >
              @karaf
              <svg className={styles.arrow} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </a>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className={styles.contactBlock}>
            <span className={styles.contactLabel}>Email</span>
            <a href="mailto:hello@karaf.ru" className={styles.contactValue}>
              hello@karaf.ru
              <svg className={styles.arrow} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </a>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className={styles.contactBlock}>
            <span className={styles.contactLabel}>Location</span>
            <span className={styles.contactValueStatic}>
              Russia
            </span>
          </div>
        </ScrollReveal>
      </div>

      {/* ── Giant wordmark ── */}
      <div className={styles.wordmarkWrap}>
        <div ref={wordmarkRef} className={styles.wordmark} aria-hidden="true">
          KARAF
        </div>
      </div>

      {/* ── Nav row ── */}
      <nav className={styles.navRow}>
        <a href="#about" className={styles.navLink}>About</a>
        <a href="#services" className={styles.navLink}>Services</a>
        <a href="#projects" className={styles.navLink}>Projects</a>
        <a href="#process" className={styles.navLink}>Process</a>
      </nav>

      {/* ── Bottom bar ── */}
      <div className={styles.bottomBar}>
        <span className={styles.copyright}>
          &copy; {new Date().getFullYear()} KARAF
        </span>
        <span className={styles.bottomTag}>Digital Craftsmanship</span>
        <div className={styles.socials}>
          <a
            href="https://t.me/karaf"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
          >
            Telegram&ensp;&rsaquo;
          </a>
        </div>
      </div>
    </section>
  );
}
