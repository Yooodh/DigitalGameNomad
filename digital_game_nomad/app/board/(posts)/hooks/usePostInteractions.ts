// package
import { useCallback } from 'react';

// layer
import { useBoardStore } from '@/shared/stores/useBoardStore';
import { getCurrentUserInfo } from '@/shared/utils/getCurrentUserInfo';

function isClient() {
  return typeof window !== 'undefined';
}

function getCurrentUserKey(): string {
  const userKey = getCurrentUserInfo()?.userKey;
  return userKey ? String(userKey) : 'guest';
}

function getLikedPostsKey(): string {
  return `likedPosts:${getCurrentUserKey()}`;
}
function getDislikedPostsKey(): string {
  return `dislikedPosts:${getCurrentUserKey()}`;
}

function getLikedPosts(): string[] {
  if (!isClient()) return [];
  const arr = localStorage.getItem(getLikedPostsKey());
  try {
    return arr ? JSON.parse(arr) : [];
  } catch {
    return [];
  }
}
function getDislikedPosts(): string[] {
  if (!isClient()) return [];
  const arr = localStorage.getItem(getDislikedPostsKey());
  try {
    return arr ? JSON.parse(arr) : [];
  } catch {
    return [];
  }
}
function addLikedPost(postId: string) {
  if (!isClient()) return;
  const liked = getLikedPosts();
  if (!liked.includes(postId)) {
    localStorage.setItem(
      getLikedPostsKey(),
      JSON.stringify([...liked, postId])
    );
  }
}
function addDislikedPost(postId: string) {
  if (!isClient()) return;
  const disliked = getDislikedPosts();
  if (!disliked.includes(postId)) {
    localStorage.setItem(
      getDislikedPostsKey(),
      JSON.stringify([...disliked, postId])
    );
  }
}

export function usePostInteractions() {
  const incrementLikeCount = useBoardStore((state) => state.incrementLikeCount);
  const incrementDislikeCount = useBoardStore(
    (state) => state.incrementDislikeCount
  );
  const incrementViewCount = useBoardStore((state) => state.incrementViewCount);

  const hasLiked = useCallback(
    (postId: string) => getLikedPosts().includes(postId),
    []
  );
  const hasDisliked = useCallback(
    (postId: string) => getDislikedPosts().includes(postId),
    []
  );

  const hasReacted = useCallback(
    (postId: string) => hasLiked(postId) || hasDisliked(postId),
    [hasLiked, hasDisliked]
  );

  const handleLikeClick = useCallback(
    (postId: string) => {
      if (!postId) return;
      if (hasDisliked(postId)) {
        alert('이미 비공감한 게시글에는 추천할 수 없습니다.');
        return;
      }
      if (hasLiked(postId)) {
        alert('이미 추천한 게시글입니다.');
        return;
      }
      incrementLikeCount(postId);
      addLikedPost(postId);
    },
    [incrementLikeCount, hasLiked, hasDisliked]
  );

  const handleDislikeClick = useCallback(
    (postId: string) => {
      if (!postId) return;
      if (hasLiked(postId)) {
        alert('이미 추천한 게시글에는 비공감할 수 없습니다.');
        return;
      }
      if (hasDisliked(postId)) {
        alert('이미 비공감한 게시글입니다.');
        return;
      }
      incrementDislikeCount(postId);
      addDislikedPost(postId);
    },
    [incrementDislikeCount, hasLiked, hasDisliked]
  );

  const handleViewCount = useCallback(
    (postId: string) => {
      incrementViewCount(postId);
    },
    [incrementViewCount]
  );

  const allPosts = useBoardStore((state) => state.allPosts);

  return {
    handleLikeClick,
    handleDislikeClick,
    handleViewCount,
    hasLiked,
    hasDisliked,
    hasReacted,
    allPosts,
  };
}
