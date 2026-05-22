import type { Project } from '../../data/projects';
import { ProjectCard } from './ProjectCard';
import styles from './WorksGrid.module.css';

type Props = { projects: Project[] };

export function WorksGrid({ projects }: Props) {
  if (projects.length === 0) {
    return <p className="body-sm" style={{ padding: '40px 0' }}>—</p>;
  }
  return (
    <ul className={styles.grid}>
      {projects.map((p, i) => (
        <li key={p.slug} className={styles.cell}>
          <ProjectCard project={p} number={String(i + 1).padStart(2, '0')} />
        </li>
      ))}
    </ul>
  );
}
