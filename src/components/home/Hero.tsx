import { useTranslation } from 'react-i18next';
import { Eyebrow } from '../shared/Eyebrow';
import { RichText } from '../shared/RichText';
import styles from './Hero.module.css';

export function Hero() {
  const { t } = useTranslation();
  const headline = t('home.hero.headline');

  return (
    <section className={styles.hero}>
      <div className={`wrap ${styles.inner}`}>
        <Eyebrow number="00">{t('home.hero.eyebrow')}</Eyebrow>
        <h1 className={`${styles.headline} display-xl`}>
          <RichText html={headline} />
        </h1>
        <p className={`${styles.lede} body-lg`}>{t('home.hero.lede')}</p>
        <div className={styles.scroll}>
          <span className="label-caps">{t('home.hero.scroll')}</span>
          <span aria-hidden="true" className={styles.cue} />
        </div>
      </div>
    </section>
  );
}
