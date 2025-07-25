// package
import { useState, useMemo, useCallback } from 'react';

// slice
import {
  ProcessedStar,
  UseInteractiveStarRatingProps,
  UseInteractiveStarRatingReturn,
} from '../types/StarRating.types';
import {
  DEFAULT_MAX_RATING,
  PERCENTAGE_MULTIPLIER,
} from '../constants/StarRating.constants';

export function useInteractiveStarRating({
  initialRating,
  maxRating = DEFAULT_MAX_RATING,
  onRatingChange,
}: UseInteractiveStarRatingProps): UseInteractiveStarRatingReturn {
  const [hoverRating, setHoverRating] = useState(0);
  const [currentRating, setCurrentRating] = useState(initialRating);

  const handleRatingChange = useCallback(
    (newRating: number) => {
      setCurrentRating(newRating);
      onRatingChange(newRating);
    },
    [onRatingChange]
  );

  const handleStarClick = useCallback(
    (starIndex: number) => {
      handleRatingChange(starIndex);
    },
    [handleRatingChange]
  );

  const handleStarMouseEnter = useCallback((starIndex: number) => {
    setHoverRating(starIndex);
  }, []);

  const handleStarMouseLeave = useCallback(() => {
    setHoverRating(0);
  }, []);

  const processedStars = useMemo(() => {
    const displayRating = hoverRating || currentRating;
    const stars: ProcessedStar[] = [];

    for (let i = 0; i < maxRating; i++) {
      let percentage = 0;
      if (i < Math.floor(displayRating)) {
        percentage = PERCENTAGE_MULTIPLIER;
      } else if (i === Math.floor(displayRating)) {
        percentage = (displayRating % 1) * PERCENTAGE_MULTIPLIER;
      }
      stars.push({
        key: i + 1,
        percentage: percentage,
      });
    }
    return stars;
  }, [hoverRating, currentRating, maxRating]);

  return {
    currentRating,
    hoverRating,
    processedStars,
    handleStarClick,
    handleStarMouseEnter,
    handleStarMouseLeave,
  };
}
