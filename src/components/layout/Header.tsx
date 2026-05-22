import { NavLink, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LanguageToggle } from './LanguageToggle';
import styles from './Header.module.css';

export function Header() {
  const { t } = useTranslation();

  const links = [
    { to: '/', label: t('nav.home'), end: true },
    { to: '/works', label: t('nav.works') },
    { to: '/about', label: t('nav.about') },
    { to: '/contact', label: t('nav.contact') },
  ];

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
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
          <Link to="/contact" className={styles.cta}>
            {t('nav.cta')}
          </Link>
        </div>
      </div>
    </header>
  );
}
