// slice
import StarRatingPresenter from '../presenter/StarRatingPresenter';
import { StarRatingProps } from '../types/StarRating.types';

export default function StarRatingContainer({
  rating,
  maxRating = 5,
  showRatingText = false,
}: StarRatingProps) {
  const processedStars = [];

  const clampedRating = Math.max(0, Math.min(maxRating, rating));

  for (let i = 0; i < maxRating; i++) {
    let percentage = 0;

    if (i < Math.floor(clampedRating)) {
      percentage = 100;
    } else if (i === Math.floor(clampedRating)) {
      percentage = (clampedRating % 1) * 100;
    }

    processedStars.push({
      key: i,
      percentage: percentage,
    });
  }

  return (
    <StarRatingPresenter
      processedStars={processedStars}
      rating={rating}
      showRatingText={showRatingText}
    />
  );
}
