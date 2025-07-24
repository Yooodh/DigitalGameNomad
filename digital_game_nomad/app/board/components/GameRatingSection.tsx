// slice
import styles from '../styles/Board.module.scss';
import { GameRatingSectionProps } from '../types';

// layer
import { StarRating } from '@/features/starrating';

export default function GameRatingSection({
  gameRatings,
  mockGameList,
}: GameRatingSectionProps) {
  return (
    <section className={styles.sectionContainer}>
      <div className={styles.sectionContainer__header}>
        <h2 className={styles.sectionContainer__title}>종합평점</h2>
      </div>
      <div className={styles.sectionContainer__ratingGrid}>
        {mockGameList.slice(0, 6).map((gameName) => {
          const rating = gameRatings[gameName];
          return (
            <div key={gameName} className={styles.sectionContainer__ratingCard}>
              <h3 className={styles.gameName}>{gameName}</h3>
              <div className={styles.sectionContainer__ratingDisplay}>
                <StarRating
                  rating={rating?.score || 0}
                  showRatingText={false}
                />{' '}
                <span className={styles.sectionContainer__ratingScore}>
                  {rating?.score?.toFixed(1) || '0.0'}
                </span>
              </div>
              <span className={styles.sectionContainer__ratingCount}>
                참여 {rating?.count || 0}건
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
