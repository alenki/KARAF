import { Hero } from '../components/home/Hero';
import { FeaturedWorks } from '../components/home/FeaturedWorks';
import { StudioStrip } from '../components/home/StudioStrip';
import { ServicesList } from '../components/home/ServicesList';
import { ProcessList } from '../components/home/ProcessList';
import { MetricsBlock } from '../components/home/MetricsBlock';
import { TechMarquee } from '../components/shared/TechMarquee';
import { useTranslation } from 'react-i18next';
import { Eyebrow } from '../components/shared/Eyebrow';

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="slab">
      <Hero />
      <FeaturedWorks />
      <StudioStrip />
      <ServicesList />
      <ProcessList />
      <MetricsBlock />
      <section style={{ paddingTop: '40px', paddingBottom: '40px' }}>
        <div className="wrap" style={{ marginBottom: '24px' }}>
          <Eyebrow number="07">{t('home.tech.eyebrow')}</Eyebrow>
        </div>
        <TechMarquee />
      </section>
    </div>
  );
}
