import { Link, useParams, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { projects } from '../data/projects';
import { ProjectHero } from '../components/detail/ProjectHero';
import { ProjectFacts } from '../components/detail/ProjectFacts';
import { ProjectGallery } from '../components/detail/ProjectGallery';
import styles from './WorkDetail.module.css';

export default function WorkDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation();
  const lng = (i18n.resolvedLanguage || 'ru').slice(0, 2) as 'ru' | 'en';

  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) return <Navigate to="/works" replace />;
  const project = projects[index];

  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];

  return (
    <article className={styles.article}>
      <ProjectHero project={project} />
      <div className="wrap">
        <section className={styles.summary}>
          <p className="body-lg">{project.summary[lng]}</p>
        </section>
        <ProjectFacts project={project} lng={lng} />
        {project.gallery && project.gallery.length > 0 && (
          <ProjectGallery images={project.gallery} alt={project.name} />
        )}
        <nav className={styles.pager} aria-label="Project navigation">
          <Link to={`/works/${prev.slug}`} className={styles.pagerLink}>
            <span className="label-caps">{t('workDetail.prev')}</span>
            <span className="display-sm">{prev.name}</span>
          </Link>
          <Link to={`/works/${next.slug}`} className={`${styles.pagerLink} ${styles.pagerRight}`}>
            <span className="label-caps">{t('workDetail.next')}</span>
            <span className="display-sm">{next.name}</span>
          </Link>
        </nav>
      </div>
    </article>
  );
}
