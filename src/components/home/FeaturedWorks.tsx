import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Section } from '../layout/Section';
import { MockupFrame } from '../works/MockupFrame';
import { featuredProjects } from '../../data/projects';
import styles from './FeaturedWorks.module.css';

export function FeaturedWorks() {
  const { t } = useTranslation();

  return (
    <Section
      eyebrow={t('home.featured.eyebrow')}
      number="01"
      heading={t('home.featured.heading')}
    >
      <ul className={styles.list}>
        {featuredProjects.map((p, i) => (
          <li key={p.slug} className={styles.item}>
            <Link to={`/works/${p.slug}`} className={styles.card}>
              <span className={styles.num}>{String(i + 1).padStart(2, '0')}</span>
              <div className={styles.body}>
                <MockupFrame kind={p.mockup} src={p.hero} alt={p.name} />
                <div className={styles.meta}>
                  <span className="label-caps">{p.location ?? t(`categories.${p.category}`)}</span>
                  <span className={`${styles.name} display-md`}>{p.name}</span>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <div className={styles.foot}>
        <Link to="/works" className={styles.viewAll}>
          <span>{t('home.featured.viewAll')}</span>
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </Section>
  );
}
