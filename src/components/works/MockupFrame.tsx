import styles from './MockupFrame.module.css';
import type { MockupKind } from '../../data/projects';

type Props = {
  kind: MockupKind;
  src: string;
  alt: string;
  className?: string;
};

export function MockupFrame({ kind, src, alt, className = '' }: Props) {
  return (
    <div className={`${styles.frame} ${styles[kind]} ${className}`}>
      <div className={styles.chrome}>
        <span className={styles.dot} />
        <span className={styles.dot} />
        <span className={styles.dot} />
      </div>
      <div className={styles.screen}>
        <img src={src} alt={alt} loading="lazy" />
      </div>
    </div>
  );
}
