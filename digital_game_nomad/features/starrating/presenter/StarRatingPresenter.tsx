// slice
import styles from '../styles/StarRating.module.scss';
import { StarRatingPresenterProps } from '../types/StarRating.types';

export default function StarRatingPresenter({
  processedStars,
  rating,
  showRatingText,
}: StarRatingPresenterProps) {
  return (
    <div className={styles.starRating}>
      {processedStars.map((star) => (
        <span
          key={star.key}
          className={styles.starContainer__star}
          style={
            { '--percentage': `${star.percentage}%` } as React.CSSProperties
          }
        >
          ★
        </span>
      ))}
      {showRatingText && (
        <span className={styles.starContainer__text}>
          ({rating.toFixed(1)}/5)
        </span>
      )}
    </div>
  );
}
