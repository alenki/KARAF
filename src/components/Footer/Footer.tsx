import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <span className={styles.copyright}>
          &copy; {new Date().getFullYear()} KARAF
        </span>
        <span className={styles.location}>Based in Russia</span>
        <div className={styles.socials}>
          <a href="https://t.me/karaf" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
            Telegram
          </a>
        </div>
      </div>
    </footer>
  );
}
