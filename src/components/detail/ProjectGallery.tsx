import styles from './ProjectGallery.module.css';

type Props = {
  images: string[];
  alt: string;
};

export function ProjectGallery({ images, alt }: Props) {
  return (
    <ul className={styles.gallery}>
      {images.map((src, i) => (
        <li key={src} className={styles.item}>
          <img src={src} alt={`${alt} — ${i + 1}`} loading="lazy" />
        </li>
      ))}
    </ul>
  );
}
