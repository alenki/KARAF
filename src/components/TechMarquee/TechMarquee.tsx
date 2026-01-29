import { technologies } from '../../data/technologies';
import styles from './TechMarquee.module.css';

export default function TechMarquee() {
  const half = Math.ceil(technologies.length / 2);
  const row1 = technologies.slice(0, half);
  const row2 = technologies.slice(half);

  const renderRow = (items: string[]) => {
    const content = items.map((tech, i) => (
      <span key={i} className={styles.item}>
        {tech}
        <span className={styles.diamond} />
      </span>
    ));

    return (
      <>
        {content}
        {content}
      </>
    );
  };

  return (
    <section className={styles.marquee}>
      <div className={styles.row}>
        <div className={styles.track}>{renderRow(row1)}</div>
      </div>
      <div className={`${styles.row} ${styles.rowReverse}`}>
        <div className={`${styles.track} ${styles.trackReverse}`}>{renderRow(row2)}</div>
      </div>
    </section>
  );
}
