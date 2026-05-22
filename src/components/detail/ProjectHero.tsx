import { useTranslation } from 'react-i18next';
import type { Project } from '../../data/projects';
import { MockupFrame } from '../works/MockupFrame';
import styles from './ProjectHero.module.css';

type Props = { project: Project };

export function ProjectHero({ project }: Props) {
  const { t } = useTranslation();

  return (
    <header className={`wrap ${styles.hero}`}>
      <div className={styles.meta}>
        <span className="label-caps">
          {t(`categories.${project.category}`)} · {project.year}
        </span>
        <h1 className={`${styles.title} display-xl`}>{project.name}</h1>
        {project.location && <span className="body-sm">{project.location}</span>}
      </div>
      <MockupFrame
        kind={project.mockup}
        src={project.hero}
        alt={project.name}
        className={styles.frame}
      />
    </header>
  );
}
