// package
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

// slice
import { useBoardStore } from '../../../stores/useBoardStore';
import { useImageHandler } from '../../hooks/useImageHandler';
import { usePostInteractions } from '../../hooks/usePostInteractions';
import { PostData } from '../../../types';

export const usePostDetail = () => {
  const searchParams = useSearchParams();
  const postId = searchParams.get('postId');
  const boardType = searchParams.get('boardType');

  const { setCurrentPost, setPreviousTab, previousTab } = useBoardStore();
  const allPosts = useBoardStore((state) => state.allPosts);

  const { setCurrentImageUrl } = useImageHandler();
  const { handleViewCount } = usePostInteractions();

  const [loading, setLoading] = useState<boolean>(true);
  const [localCurrentPost, setLocalCurrentPost] = useState<PostData | null>(
    null
  );

  useEffect(() => {
    if (!postId) {
      setLoading(false);
      setCurrentPost(null);
      setLocalCurrentPost(null);
      console.error('게시글 ID가 제공되지 않았습니다.');
      return;
    }

    setLoading(true);

    const foundPost = allPosts.find(
      (p) =>
        p.postKey === postId &&
        (boardType === null ||
          (boardType === 'review' && p.postTopic === '후기') ||
          (boardType !== 'review' && p.postTopic === '자유'))
    );

    if (foundPost) {
      setLocalCurrentPost(foundPost);
      setCurrentPost(foundPost);
      setPreviousTab(foundPost.postTopic);

      setCurrentImageUrl(foundPost.image_url || '');

      handleViewCount(postId);
    } else {
      setLocalCurrentPost(null);
      setCurrentPost(null);
      console.error(
        `ID ${postId} 및 타입 ${boardType} 의 게시글을 allPosts에서 찾을 수 없습니다.`
      );
    }
    setLoading(false);
  }, [
    postId,
    boardType,
    setCurrentPost,
    setPreviousTab,
    setCurrentImageUrl,
    handleViewCount,
    allPosts,
  ]);

  return {
    loading,
    postId,
    boardType,
    currentPost: localCurrentPost,
    previousTab,
  };
};
