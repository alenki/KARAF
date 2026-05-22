import { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '../shared/Button';
import { LanguageToggle } from './LanguageToggle';
import styles from './Header.module.css';

export function Header() {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { to: '/', label: t('nav.home'), end: true },
    { to: '/works', label: t('nav.works') },
    { to: '/about', label: t('nav.about') },
    { to: '/contact', label: t('nav.contact') },
  ];

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`${styles.inner} wrap`}>
        <Link to="/" className={styles.brand} aria-label="KARAF home">
          <span className={styles.markDot} aria-hidden="true" />
          <span className={styles.mark}>KARAF</span>
        </Link>

        <nav className={styles.nav} aria-label="Primary">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className={styles.right}>
          <LanguageToggle />
          <Button as="a" href="/contact" variant="primary" size="sm">
            {t('nav.cta')}
          </Button>
        </div>
      </div>
      <hr className="hairline" />
    </header>
  );
}
