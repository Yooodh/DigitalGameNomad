// package
import { useState, useCallback } from 'react';

// slice
import { useBoardStore } from '@/shared/stores/useBoardStore';

export function useGameSelection(
  initialGame: string = '',
  initialRating: number = 1
) {
  const [selectedGame, setSelectedGame] = useState<string>(initialGame);
  const [rating, setRating] = useState<number>(initialRating);
  const [isReviewMode, setIsReviewMode] = useState<boolean>(!!initialGame);
  const { setCurrentPostTopic } = useBoardStore();

  const handleGameSelect = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const value: string = e.target.value;
      const newIsReviewMode: boolean = value !== '';
      setSelectedGame(value);
      setIsReviewMode(newIsReviewMode);
      setCurrentPostTopic(newIsReviewMode ? '후기' : '자유');
    },
    [setCurrentPostTopic]
  );

  return {
    selectedGame,
    setSelectedGame,
    rating,
    setRating,
    isReviewMode,
    setIsReviewMode,
    handleGameSelect,
  };
}
