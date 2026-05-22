import { technologies } from '../../data/technologies';
import styles from './TechMarquee.module.css';

export function TechMarquee() {
  // double the list so the CSS animation can loop seamlessly
  const items = [...technologies, ...technologies];

  return (
    <div className={styles.marquee} aria-hidden="true">
      <div className={styles.track}>
        {items.map((t, i) => (
          <span key={`${t}-${i}`} className={styles.item}>
            <span className={styles.dot} />
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
