// package
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

// slice
import { MAX_POST_DETAIL_RETRY, POST_DETAIL_RETRY_DELAY } from '../constants';
import { useImageHandler } from '../../hooks/useImageHandler';
import { localStorageUtils } from '../../utils/localStorageUtils';

// layer
import { getCurrentUserInfo } from '@/shared/utils/getCurrentUserInfo';
import { useBoardStore } from '@/shared/stores/useBoardStore';

export const usePostDetail = () => {
  const searchParams = useSearchParams();
  const postId = searchParams.get('postId');
  const boardType = searchParams.get('boardType');

  const { setCurrentPost, setPreviousTab, currentPost, allPosts } =
    useBoardStore();

  const { setCurrentImageUrl } = useImageHandler();

  const [loading, setLoading] = useState<boolean>(true);
  const [retryCount, setRetryCount] = useState(0);
  const [previousTab, setPreviousTabState] = useState<string | null>(null);

  const currentUser = getCurrentUserInfo();
  const userKey = currentUser?.userKey;

  useEffect(() => {
    if (!postId || !userKey) return;
    if (!localStorageUtils.hasViewed(postId, userKey)) {
      localStorageUtils.addViewed(postId, userKey);
      useBoardStore.getState().incrementViewCount(postId);
    }
  }, [postId, userKey]);

  useEffect(() => {
    if (!postId) {
      setLoading(false);
      return;
    }

    const foundPost = allPosts.find(
      (p) =>
        p.postKey === postId &&
        (boardType === null ||
          (boardType === 'review' && p.postTopic === '후기') ||
          (boardType !== 'review' && p.postTopic === '자유'))
    );

    if (foundPost) {
      setCurrentPost(foundPost);
      setPreviousTab(foundPost.postTopic);
      setPreviousTabState(foundPost.postTopic);
      setCurrentImageUrl(foundPost.image_url || '');
      setLoading(false);
      return;
    }

    if (!foundPost && retryCount < MAX_POST_DETAIL_RETRY) {
      setLoading(true);
      const timer = setTimeout(
        () => setRetryCount((r) => r + 1),
        POST_DETAIL_RETRY_DELAY
      );
      return () => clearTimeout(timer);
    }

    setLoading(false);
    if (retryCount >= MAX_POST_DETAIL_RETRY) {
      console.error(
        `ID ${postId} 및 타입 ${boardType}의 게시글을 allPosts에서 찾을 수 없습니다.`
      );
    }
  }, [
    allPosts,
    postId,
    boardType,
    retryCount,
    setCurrentPost,
    setPreviousTab,
    setCurrentImageUrl,
  ]);

  return {
    loading,
    postId,
    boardType,
    currentPost,
    previousTab,
  };
};
