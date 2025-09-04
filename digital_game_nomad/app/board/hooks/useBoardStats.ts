// package
import { useState, useEffect, useMemo } from 'react';

// slice
import { PostData, GameRating, ScreenshotItem, BoardStats } from '../types';

// layer
import { truncateText } from '@/shared/utils/truncateText';
import { useBoardStore } from '@/shared/stores/useBoardStore';

export const useBoardStats = (): BoardStats => {
  const { allPosts, gameList: initialGameList } = useBoardStore();

  const [freePostsTop10, setFreePostsTop10] = useState<PostData[]>([]);
  const [reviewPostsTop10, setReviewPostsTop10] = useState<PostData[]>([]);
  const [gameRatings, setGameRatings] = useState<Record<string, GameRating>>(
    {}
  );
  const [latestScreenshots, setLatestScreenshots] = useState<ScreenshotItem[]>(
    []
  );

  const freePosts = useMemo(
    () => allPosts.filter((post) => post.postTopic === '자유'),
    [allPosts]
  );

  const reviewPosts = useMemo(
    () => allPosts.filter((post) => post.postTopic === '후기'),
    [allPosts]
  );

  useEffect(() => {
    const sortedFreePosts = [...freePosts]
      .sort((a, b) => b.likeCount - a.likeCount)
      .slice(0, 10)
      .map((post) => ({
        ...post,
        postTitle: truncateText(post.postTitle, 40),
      }));
    setFreePostsTop10(sortedFreePosts);

    const sortedReviewPosts = [...reviewPosts]
      .sort((a, b) => b.likeCount - a.likeCount)
      .slice(0, 10)
      .map((post) => ({
        ...post,
        postTitle: truncateText(post.postTitle, 40),
      }));
    setReviewPostsTop10(sortedReviewPosts);

    const calculatedRatings: Record<string, GameRating> = {};
    initialGameList.forEach((gameName) => {
      const gameReviews = reviewPosts.filter(
        (post) => post.game_name === gameName
      );
      if (gameReviews.length > 0) {
        const totalScore = gameReviews.reduce(
          (sum, post) => sum + (post.post_score || 0),
          0
        );
        calculatedRatings[gameName] = {
          score: totalScore / gameReviews.length,
          count: gameReviews.length,
        };
      } else {
        calculatedRatings[gameName] = { score: 0, count: 0 };
      }
    });

    const sortedGameRatings = Object.entries(calculatedRatings)
      .sort(([, a], [, b]) => b.score - a.score)
      .slice(0, 6)
      .reduce((acc: Record<string, GameRating>, [gameName, rating]) => {
        acc[gameName] = rating;
        return acc;
      }, {} as Record<string, GameRating>);

    setGameRatings(sortedGameRatings);

    const screenshotsWithDetails = allPosts
      .filter((post) => post.image_url)
      .sort(
        (a, b) =>
          new Date(b.postDate).getTime() - new Date(a.postDate).getTime()
      )
      .slice(0, 3)
      .map((post) => ({
        imageUrl: post.image_url!,
        postKey: post.postKey,
        boardType: (post.postTopic === '자유' ? 'free' : 'review') as
          | 'free'
          | 'review',
      }));
    setLatestScreenshots(screenshotsWithDetails);
  }, [allPosts, freePosts, reviewPosts, initialGameList]);

  return { freePostsTop10, reviewPostsTop10, gameRatings, latestScreenshots };
};
