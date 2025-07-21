export type StarRatingProps = {
  rating: number;
  maxRating?: number;
  showRatingText?: boolean;
};

export type StarRatingPresenterProps = {
  processedStars: { percentage: number; key: number }[];
  rating: number;
  showRatingText: boolean;
};
