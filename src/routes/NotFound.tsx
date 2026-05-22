import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Section } from '../components/layout/Section';
import { Button } from '../components/shared/Button';

export default function NotFound() {
  const { t } = useTranslation();
  return (
    <Section eyebrow="404" number="—" heading="Page not found." lede="The page you are looking for doesn't exist.">
      <Link to="/">
        <Button as="a" href="/" variant="outline">
          {t('nav.home')}
        </Button>
      </Link>
    </Section>
  );
}
