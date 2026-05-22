import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './Footer.module.css';

export function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`${styles.cta} wrap`}>
        <h2 className={`display-lg ${styles.heading}`}>
          {t('home.cta.heading')}
        </h2>
        <Link to="/contact" className={styles.ctaBtn}>
          <span>{t('home.cta.button')}</span>
          <span className={styles.arrow} aria-hidden="true">↗</span>
        </Link>
      </div>

      <div className={`${styles.grid} wrap`}>
        <div className={styles.col}>
          <span className={styles.label}>KARAF</span>
          <p className={styles.muted}>{t('brand.tagline')}</p>
        </div>

        <div className={styles.col}>
          <span className={styles.label}>Navigation</span>
          <ul className={styles.list}>
            <li><Link to="/">{t('nav.home')}</Link></li>
            <li><Link to="/works">{t('nav.works')}</Link></li>
            <li><Link to="/about">{t('nav.about')}</Link></li>
            <li><Link to="/contact">{t('nav.contact')}</Link></li>
          </ul>
        </div>

        <div className={styles.col}>
          <span className={styles.label}>Contact</span>
          <ul className={styles.list}>
            <li><a href="mailto:hello@karaf.studio">{t('contact.lines.email')}</a></li>
            <li><a href="https://t.me/" target="_blank" rel="noreferrer noopener">{t('contact.lines.telegram')}</a></li>
          </ul>
        </div>

        <div className={styles.col}>
          <span className={styles.label}>© {year}</span>
          <p className={styles.muted}>All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
