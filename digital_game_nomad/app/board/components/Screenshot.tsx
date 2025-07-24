// package
import Link from 'next/link';

// slice
import styles from '../styles/Board.module.scss';
import { ScreenshotProps } from '../types';

export default function Screenshot({ images }: ScreenshotProps) {
  return (
    <section className={styles.sectionContainer}>
      <div className={styles.sectionContainer__header}>
        <h2 className={styles.sectionContainer__title}>스크린샷</h2>
      </div>

      <div className={styles.screenshotContainer}>
        {images.map((item, index) => (
          <Link
            key={index}
            href={`/board/detail?postId=${item.postKey}&boardType=${item.boardType}`}
            className={styles.screenshotContainer__card}
            passHref
          >
            <img
              src={item.imageUrl}
              alt={`스크린샷 ${index + 1}`}
              className={styles.screenshotContainer__image}
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
