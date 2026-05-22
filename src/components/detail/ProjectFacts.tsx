import { useTranslation } from 'react-i18next';
import type { Project } from '../../data/projects';
import styles from './ProjectFacts.module.css';

type Props = {
  project: Project;
  lng: 'ru' | 'en';
};

export function ProjectFacts({ project, lng }: Props) {
  const { t } = useTranslation();

  const rows: Array<{ label: string; value: React.ReactNode }> = [
    { label: t('workDetail.role'), value: project.role[lng] },
    { label: t('workDetail.year'), value: String(project.year) },
    { label: t('workDetail.category'), value: t(`categories.${project.category}`) },
    {
      label: t('workDetail.stack'),
      value: (
        <ul className={styles.chips}>
          {project.techStack.map((s) => (
            <li key={s} className={styles.chip}>{s}</li>
          ))}
        </ul>
      ),
    },
    {
      label: t('workDetail.live'),
      value: project.liveUrl ? (
        <a href={project.liveUrl} target="_blank" rel="noreferrer noopener" className={styles.live}>
          {project.liveUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')} ↗
        </a>
      ) : (
        '—'
      ),
    },
  ];

  return (
    <section className={styles.facts}>
      {rows.map((row) => (
        <div key={row.label} className={styles.row}>
          <span className="label-caps">{row.label}</span>
          <div className={styles.value}>{row.value}</div>
        </div>
      ))}
    </section>
  );
}
