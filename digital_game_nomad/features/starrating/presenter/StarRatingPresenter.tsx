// slice
import styles from '../styles/StarRating.module.scss';
import { StarRatingPresenterProps } from '../types/StarRating.types';

export default function StarRatingPresenter({
  processedStars,
  rating,
  showRatingText = false,
  size = 'medium',
  onStarClick,
  onStarMouseEnter,
  onStarMouseLeave,
  hoverRating,
  isInteractive = false,
}: StarRatingPresenterProps) {
  const sizeClass = {
    small: styles.starSmall,
    medium: styles.starMedium,
    large: styles.starLarge,
  }[size];

  const starRatingClasses = `${styles.starRating} ${sizeClass} ${
    isInteractive ? styles.isInteractive : ''
  }`;

  const displayTextRating = showRatingText
    ? hoverRating && hoverRating > 0
      ? hoverRating
      : rating
    : rating;

  return (
    <div className={starRatingClasses}>
      {processedStars.map((star) => (
        <span
          key={star.key}
          className={styles.starContainer__star}
          style={
            { '--percentage': `${star.percentage}%` } as React.CSSProperties
          }
          onClick={() => isInteractive && onStarClick && onStarClick(star.key)}
          onMouseEnter={() =>
            isInteractive && onStarMouseEnter && onStarMouseEnter(star.key)
          }
          onMouseLeave={() =>
            isInteractive && onStarMouseLeave && onStarMouseLeave()
          }
        >
          ★
        </span>
      ))}
      {showRatingText && (
        <span className={styles.starContainer__text}>
          ({displayTextRating.toFixed(0)}/5)
        </span>
      )}
    </div>
  );
}
