import { useTranslation } from 'react-i18next';
import { Section } from '../layout/Section';
import { Button } from '../shared/Button';

export function StudioStrip() {
  const { t } = useTranslation();

  return (
    <Section
      eyebrow={t('home.studio.eyebrow')}
      number="02"
      heading={t('home.studio.heading')}
      lede={t('home.studio.lede')}
    >
      <Button as="a" href="/about" variant="outline">
        {t('home.studio.cta')}
      </Button>
    </Section>
  );
}
