// package
import { useCallback } from 'react';

// slice
import { sessionStorageUtils } from '../utils/sessionStorageUtils';
import { useBoardStore } from './../../stores/useBoardStore';

export const usePostInteractions = () => {
  const { incrementViewCount, incrementLikeCount, incrementDislikeCount } =
    useBoardStore();

  const handleViewCount = useCallback(
    (postId: string) => {
      if (!sessionStorageUtils.hasViewed(postId)) {
        sessionStorageUtils.addViewed(postId);
        incrementViewCount(postId);
      }
    },
    [incrementViewCount]
  );

  const handleLikeClick = useCallback(
    (postId: string) => {
      if (sessionStorageUtils.hasLiked(postId)) {
        alert('이미 추천한 게시글입니다.');
        return;
      }
      if (sessionStorageUtils.hasDisliked(postId)) {
        alert('비공감한 게시글은 추천할 수 없습니다.');
        return;
      }

      sessionStorageUtils.addLiked(postId);
      incrementLikeCount(postId);
      alert('게시글을 추천했습니다.');
    },
    [incrementLikeCount]
  );

  const handleDislikeClick = useCallback(
    (postId: string) => {
      if (sessionStorageUtils.hasDisliked(postId)) {
        alert('이미 비공감한 게시글입니다.');
        return;
      }
      if (sessionStorageUtils.hasLiked(postId)) {
        alert('추천한 게시글은 비공감할 수 없습니다.');
        return;
      }

      sessionStorageUtils.addDisliked(postId);
      incrementDislikeCount(postId);
      alert('게시글을 비공감했습니다.');
    },
    [incrementDislikeCount]
  );

  return {
    handleViewCount,
    handleLikeClick,
    handleDislikeClick,
  };
};
