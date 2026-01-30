import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <span className={styles.copyright}>
          &copy; {new Date().getFullYear()} KARAF
        </span>
        <span className={styles.location}>Россия</span>
        <div className={styles.socials}>
          <a href="https://t.me/karaf" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
            Телеграм
          </a>
        </div>
      </div>
    </footer>
  );
}
