// package
import { useState, useCallback } from 'react';

// slice
import { UsePostActionsProps } from '../types';
import { PostData } from '../../../types';

// layer
import { useBoardStore } from '@/shared/stores/useBoardStore';
import { getCurrentUserInfo } from '@/shared/utils/getCurrentUserInfo';

export const usePostActions = ({
  currentPost,
  handleBackClick,
}: UsePostActionsProps) => {
  const { updatePost, deletePost, setCurrentPost } = useBoardStore();
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const currentUser = getCurrentUserInfo();

  const handleEditClick = useCallback(() => {
    if (!currentUser || !currentPost) {
      alert('로그인 후 이용해 주세요.');
      return;
    }
    if (currentPost.userKey !== currentUser.userKey) {
      alert('본인 게시글만 수정할 수 있습니다.');
      return;
    }
    setIsEditMode(true);
  }, [currentUser, currentPost]);

  const handleEditSave = useCallback(
    (updatedDataFromEdit: PostData) => {
      if (!currentUser || !currentPost) {
        alert('로그인 후 이용해 주세요.');
        return;
      }
      if (currentPost.userKey !== currentUser.userKey) {
        alert('본인 게시글만 수정할 수 있습니다.');
        return;
      }

      const updatedPost = {
        ...updatedDataFromEdit,
        postKey: currentPost.postKey,
        postDate: currentPost.postDate,
        userName: currentPost.userName,
        userKey: currentPost.userKey,
        viewCount: currentPost.viewCount,
        likeCount: currentPost.likeCount,
        dislikeCount: currentPost.dislikeCount,
        comments: currentPost.comments,
      };

      updatePost(updatedPost);
      setCurrentPost(updatedPost);
      setIsEditMode(false);
      alert('게시글이 수정되었습니다.');
    },
    [currentUser, currentPost, setCurrentPost, updatePost]
  );

  const handleDeleteClick = useCallback(() => {
    if (!currentUser || !currentPost) {
      alert('로그인 후 이용해 주세요.');
      return;
    }
    if (currentPost.userKey !== currentUser.userKey) {
      alert('본인 게시글만 삭제할 수 있습니다.');
      return;
    }

    if (window.confirm('정말로 게시글을 삭제하시겠습니까?')) {
      deletePost(currentPost.postKey);
      setCurrentPost(null);
      alert('게시글이 삭제되었습니다.');
      handleBackClick();
    }
  }, [currentUser, currentPost, deletePost, setCurrentPost, handleBackClick]);

  const handleEditCancel = useCallback(() => {
    setIsEditMode(false);
  }, []);

  return {
    isEditMode,
    setIsEditMode,
    handleEditClick,
    handleEditSave,
    handleDeleteClick,
    handleEditCancel,
  };
};
