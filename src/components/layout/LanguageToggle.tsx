import { useTranslation } from 'react-i18next';
import styles from './LanguageToggle.module.css';

export function LanguageToggle() {
  const { i18n, t } = useTranslation();
  const current = (i18n.resolvedLanguage || i18n.language || 'ru').slice(0, 2);

  const set = (lng: 'ru' | 'en') => {
    if (lng !== current) void i18n.changeLanguage(lng);
  };

  return (
    <div className={styles.toggle} role="group" aria-label="Language">
      <button
        type="button"
        className={`${styles.btn} ${current === 'ru' ? styles.active : ''}`}
        onClick={() => set('ru')}
        aria-pressed={current === 'ru'}
      >
        {t('lang.ru')}
      </button>
      <span className={styles.sep} aria-hidden="true">/</span>
      <button
        type="button"
        className={`${styles.btn} ${current === 'en' ? styles.active : ''}`}
        onClick={() => set('en')}
        aria-pressed={current === 'en'}
      >
        {t('lang.en')}
      </button>
    </div>
  );
}
