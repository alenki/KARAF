import { useTranslation } from 'react-i18next';
import { Section } from '../layout/Section';
import { processSteps } from '../../data/services';
import styles from './ProcessList.module.css';

export function ProcessList() {
  const { t } = useTranslation();

  return (
    <Section
      eyebrow={t('home.process.eyebrow')}
      number="04"
      heading={t('home.process.heading')}
    >
      <ol className={styles.list}>
        {processSteps.map((s) => (
          <li key={s.id} className={styles.row}>
            <span className={styles.num}>{s.number}</span>
            <div className={styles.text}>
              <h3 className={`${styles.title} display-sm`}>{t(`process.${s.key}.title`)}</h3>
              <p className="body-sm">{t(`process.${s.key}.description`)}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
