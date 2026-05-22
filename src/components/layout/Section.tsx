import type { ReactNode } from 'react';
import { Eyebrow } from '../shared/Eyebrow';
import { RichText } from '../shared/RichText';
import { ScrollReveal } from '../shared/ScrollReveal';
import styles from './Section.module.css';

type Props = {
  id?: string;
  eyebrow?: ReactNode;
  number?: string;
  heading?: ReactNode;
  lede?: ReactNode;
  children: ReactNode;
  variant?: 'default' | 'narrow' | 'flush' | 'dark';
  reveal?: boolean;
  className?: string;
};

export function Section({
  id,
  eyebrow,
  number,
  heading,
  lede,
  children,
  variant = 'default',
  reveal = true,
  className = '',
}: Props) {
  const head = (eyebrow || heading || lede) && (
    <header className={styles.head}>
      {eyebrow && <Eyebrow number={number}>{eyebrow}</Eyebrow>}
      {heading &&
        (typeof heading === 'string' ? (
          <h2 className={`${styles.heading} display-lg`}>
            <RichText html={heading} />
          </h2>
        ) : (
          <h2 className={`${styles.heading} display-lg`}>{heading}</h2>
        ))}
      {lede &&
        (typeof lede === 'string' ? (
          <p className={`${styles.lede} body-lg`}>
            <RichText html={lede} />
          </p>
        ) : (
          <p className={`${styles.lede} body-lg`}>{lede}</p>
        ))}
    </header>
  );

  return (
    <section id={id} className={`${styles.section} ${styles[variant]} ${className}`}>
      <div className={variant === 'narrow' ? 'wrap-narrow' : 'wrap'}>
        {head && (reveal ? <ScrollReveal>{head}</ScrollReveal> : head)}
        <div className={styles.body}>{children}</div>
      </div>
    </section>
  );
}
