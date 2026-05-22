import { useTranslation } from 'react-i18next';
import { Section } from '../layout/Section';
import { projects } from '../../data/projects';
import { technologies } from '../../data/technologies';
import styles from './MetricsBlock.module.css';

export function MetricsBlock() {
  const { t } = useTranslation();
  const startYear = 2023;
  const yearsInMarket = new Date().getFullYear() - startYear;

  const metrics = [
    { value: `${yearsInMarket}+`, label: t('metrics.years') },
    { value: `${projects.length}+`, label: t('metrics.projects') },
    { value: `${technologies.length}+`, label: t('metrics.stack') },
  ];

  return (
    <Section
      eyebrow={t('home.metrics.eyebrow')}
      number="05"
      heading={t('home.metrics.heading')}
    >
      <ul className={styles.grid}>
        {metrics.map((m) => (
          <li key={m.label} className={styles.cell}>
            <span className={`${styles.value} display-xl`}>{m.value}</span>
            <span className="label-caps">{m.label}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
