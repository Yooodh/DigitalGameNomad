// package
import { useMemo } from 'react';

// slice
import StarRatingPresenter from '../presenter/StarRatingPresenter';
import {
  StarRatingDisplayProps,
  ProcessedStar,
} from '../types/StarRating.types';
import {
  DEFAULT_MAX_RATING,
  PERCENTAGE_MULTIPLIER,
} from '../constants/StarRating.constants';

export default function StarRatingContainer({
  rating,
  maxRating = DEFAULT_MAX_RATING,
  showRatingText = false,
  size = 'medium',
}: StarRatingDisplayProps) {
  const processedStars = useMemo(() => {
    const stars: ProcessedStar[] = [];
    for (let i = 0; i < maxRating; i++) {
      let percentage = 0;
      if (i < Math.floor(rating)) {
        percentage = PERCENTAGE_MULTIPLIER;
      } else if (i === Math.floor(rating)) {
        percentage = (rating % 1) * PERCENTAGE_MULTIPLIER;
      }
      stars.push({
        key: i + 1,
        percentage: percentage,
      });
    }
    return stars;
  }, [rating, maxRating]);

  return (
    <StarRatingPresenter
      processedStars={processedStars}
      rating={rating}
      showRatingText={showRatingText}
      size={size}
      isInteractive={false}
    />
  );
}
