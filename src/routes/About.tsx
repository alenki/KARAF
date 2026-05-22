import { useTranslation } from 'react-i18next';
import { Section } from '../components/layout/Section';
import { MetricsBlock } from '../components/home/MetricsBlock';
import { TechMarquee } from '../components/shared/TechMarquee';
import { Eyebrow } from '../components/shared/Eyebrow';

export default function About() {
  const { t } = useTranslation();

  return (
    <>
      <Section
        eyebrow={t('about.eyebrow')}
        number="01"
        heading={t('about.heading')}
        lede={t('about.lede')}
      >
        {null}
      </Section>
      <MetricsBlock />
      <section style={{ paddingTop: '40px', paddingBottom: '80px' }}>
        <div className="wrap" style={{ marginBottom: '24px' }}>
          <Eyebrow number="03">{t('home.tech.eyebrow')}</Eyebrow>
        </div>
        <TechMarquee />
      </section>
    </>
  );
}
