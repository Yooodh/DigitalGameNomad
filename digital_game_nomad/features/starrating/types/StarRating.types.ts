import { STAR_SIZES } from '../constants/StarRating.constants';

export type StarSize = (typeof STAR_SIZES)[keyof typeof STAR_SIZES];

export type StarRatingDisplayProps = {
  rating: number;
  maxRating?: number;
  showRatingText?: boolean;
  size?: StarSize;
};

export type StarRatingPresenterProps = {
  processedStars: { percentage: number; key: number }[];
  rating: number;
  showRatingText: boolean;
  size?: StarSize;
  onStarClick?: (starIndex: number) => void;
  onStarMouseEnter?: (starIndex: number) => void;
  onStarMouseLeave?: () => void;
  hoverRating?: number;
  isInteractive?: boolean;
};

export type ProcessedStar = {
  key: number;
  percentage: number;
};

export interface UseInteractiveStarRatingProps {
  initialRating: number;
  maxRating?: number;
  onRatingChange: (rating: number) => void;
}

export interface UseInteractiveStarRatingReturn {
  currentRating: number;
  hoverRating: number;
  processedStars: ProcessedStar[];
  handleStarClick: (starIndex: number) => void;
  handleStarMouseEnter: (starIndex: number) => void;
  handleStarMouseLeave: () => void;
}
