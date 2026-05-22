import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { Project } from '../../data/projects';
import { MockupFrame } from './MockupFrame';
import styles from './ProjectCard.module.css';

type Props = {
  project: Project;
  number: string;
};

export function ProjectCard({ project, number }: Props) {
  const { t } = useTranslation();

  return (
    <Link to={`/works/${project.slug}`} className={styles.card}>
      <span className={styles.num}>{number}</span>
      <MockupFrame kind={project.mockup} src={project.hero} alt={project.name} />
      <div className={styles.meta}>
        <span className="label-caps">{project.location ?? t(`categories.${project.category}`)}</span>
        <span className={`${styles.name} display-md`}>{project.name}</span>
      </div>
    </Link>
  );
}
