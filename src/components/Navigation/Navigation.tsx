import { useRef, useState, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { useIsMobile } from '../../hooks/useMediaQuery';
import { getLenis } from '../../hooks/useLenis';
import styles from './Navigation.module.css';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useIsMobile();
  const lastScrollY = useRef(0);
  const [hidden, setHidden] = useState(false);

  // Scroll behavior: blur on scroll, hide/show on direction
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 50);
      if (y > lastScrollY.current && y > 200) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Mobile menu animation
  useEffect(() => {
    if (!overlayRef.current) return;
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      gsap.to(overlayRef.current, { opacity: 1, pointerEvents: 'all', duration: 0.4 });
      const links = overlayRef.current.querySelectorAll('a');
      gsap.from(links, {
        y: 60,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power3.out',
        delay: 0.2,
      });
    } else {
      document.body.style.overflow = '';
      gsap.to(overlayRef.current, { opacity: 0, pointerEvents: 'none', duration: 0.3 });
    }
  }, [menuOpen]);

  const handleLinkClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');
    if (!href) return;
    setMenuOpen(false);
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(href, { duration: 1.2 });
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <>
      <nav
        ref={navRef}
        className={`${styles.nav} ${scrolled ? styles.scrolled : ''} ${hidden ? styles.hidden : ''}`}
      >
        <a href="#" className={styles.logo}>
          KARAF
        </a>

        {isMobile ? (
          <button
            className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
          </button>
        ) : (
          <div className={styles.links}>
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} className={styles.link} onClick={handleLinkClick}>
                {link.label}
              </a>
            ))}
          </div>
        )}
      </nav>

      {isMobile && (
        <div ref={overlayRef} className={styles.overlay}>
          <div className={styles.overlayLinks}>
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} className={styles.overlayLink} onClick={handleLinkClick}>
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
