'use client';

// package
import { useMemo } from 'react';

// slice
import BoardPresenter from '../presenters/Board.presenter';
import { useBoardStats } from '../hooks/useBoardStats';
import { formatDate } from '../utils/formatDate';

export default function BoardContainer() {
  const { freePostsTop10, reviewPostsTop10, gameRatings, latestScreenshots } =
    useBoardStats();

  const mockGameList = useMemo(() => Object.keys(gameRatings), [gameRatings]);

  return (
    <BoardPresenter
      freePosts={freePostsTop10}
      reviewPosts={reviewPostsTop10}
      gameRatings={gameRatings}
      mockGameList={mockGameList}
      formatDate={formatDate}
      latestScreenshots={latestScreenshots}
    />
  );
}
