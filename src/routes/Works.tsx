import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Section } from '../components/layout/Section';
import { WorksGrid } from '../components/works/WorksGrid';
import { projects, type Category } from '../data/projects';
import styles from './Works.module.css';

type Filter = 'all' | Category;

export default function Works() {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<Filter>('all');

  const visible = useMemo(
    () => (filter === 'all' ? projects : projects.filter((p) => p.category === filter)),
    [filter],
  );

  const filters: Filter[] = ['all', 'web', 'mobile', 'ai', 'bot'];

  return (
    <Section
      eyebrow={t('works.eyebrow')}
      number="01"
      heading={t('works.heading')}
      lede={t('works.lede')}
    >
      <div className={styles.filters}>
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            className={`${styles.filter} ${filter === f ? styles.active : ''}`}
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
          >
            {t(`works.filters.${f}`)}
          </button>
        ))}
      </div>
      <WorksGrid projects={visible} />
    </Section>
  );
}
