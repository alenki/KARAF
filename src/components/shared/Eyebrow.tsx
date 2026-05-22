import type { ReactNode } from 'react';
import styles from './Eyebrow.module.css';

type Props = {
  number?: string;
  children: ReactNode;
  align?: 'left' | 'center';
  className?: string;
};

export function Eyebrow({ number, children, align = 'left', className = '' }: Props) {
  return (
    <div className={`${styles.eyebrow} ${align === 'center' ? styles.center : ''} ${className}`}>
      {number && <span className={styles.number}>{number}</span>}
      {number && <span className={styles.line} aria-hidden="true" />}
      <span className={styles.label}>{children}</span>
    </div>
  );
}
