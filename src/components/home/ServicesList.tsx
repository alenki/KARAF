import { useTranslation } from 'react-i18next';
import { Section } from '../layout/Section';
import { services } from '../../data/services';
import styles from './ServicesList.module.css';

export function ServicesList() {
  const { t } = useTranslation();

  return (
    <Section
      eyebrow={t('home.services.eyebrow')}
      number="03"
      heading={t('home.services.heading')}
    >
      <ul className={styles.list}>
        {services.map((s) => (
          <li key={s.id} className={styles.row}>
            <span className={styles.num}>{s.number}</span>
            <h3 className={`${styles.title} display-md`}>{t(`services.${s.key}.title`)}</h3>
            <p className={`${styles.desc} body`}>{t(`services.${s.key}.description`)}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
