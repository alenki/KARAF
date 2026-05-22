import { useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Section } from '../components/layout/Section';
import { Button } from '../components/shared/Button';
import styles from './Contact.module.css';

export default function Contact() {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <Section
      eyebrow={t('contact.eyebrow')}
      number="01"
      heading={t('contact.heading')}
      lede={t('contact.lede')}
    >
      <div className={styles.grid}>
        <form className={styles.form} onSubmit={onSubmit}>
          <label className={styles.field}>
            <span className="label-caps">{t('contact.form.name')}</span>
            <input type="text" name="name" required />
          </label>
          <label className={styles.field}>
            <span className="label-caps">{t('contact.form.email')}</span>
            <input type="email" name="email" required />
          </label>
          <label className={styles.field}>
            <span className="label-caps">{t('contact.form.message')}</span>
            <textarea name="message" rows={5} required />
          </label>
          <Button type="submit" variant="primary">{t('contact.form.send')}</Button>
          {submitted && <p className={styles.thanks}>✓</p>}
        </form>

        <aside className={styles.lines}>
          <div className={styles.line}>
            <span className="label-caps">Email</span>
            <a href="mailto:hello@karaf.studio" className="display-sm">{t('contact.lines.email')}</a>
          </div>
          <div className={styles.line}>
            <span className="label-caps">Telegram</span>
            <a href="https://t.me/" target="_blank" rel="noreferrer noopener" className="display-sm">{t('contact.lines.telegram')}</a>
          </div>
        </aside>
      </div>
    </Section>
  );
}
