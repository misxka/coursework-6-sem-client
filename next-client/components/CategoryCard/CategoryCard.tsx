import Link from 'next/link';
import styles from './CategoryCard.module.scss';

interface Props {
  id: number;
  name: string;
  playMode: boolean;
  image: string;
}

export function CategoryCard(props: Props) {
  const { id, name, playMode, image } = props;

  return (
    <Link href={`/categories/${id}`}>
      <a>
        <div className={styles.cardContainer}>
          <div className={`${styles.card} ${playMode ? styles.play : styles.train}`}>
            <div
              className={styles.cardImage}
              style={{
                backgroundImage: `url(https://res.cloudinary.com/misxka/image/upload/${image}.jpg)`
              }}
            ></div>
            <div className={`${styles.cardContent} title is-4`}>{name}</div>
          </div>
        </div>
      </a>
    </Link>
  );
}
