// package
import { useState, useCallback } from 'react';

// slice
import { UsePostActionsProps } from '../types';
import { useBoardStore } from '../../../stores/useBoardStore';
import { PostData } from '../../../types';

export const usePostActions = ({
  currentPost,
  handleBackClick,
}: UsePostActionsProps) => {
  const { updatePost, deletePost, setCurrentPost } = useBoardStore();
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const handleEditClick = useCallback(() => {
    setIsEditMode(true);
  }, []);

  const handleEditSave = useCallback(
    (updatedDataFromEdit: PostData) => {
      if (!currentPost) {
        alert('게시글 정보를 찾을 수 없어 수정할 수 없습니다.');
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
    [currentPost, setCurrentPost, updatePost]
  );

  const handleDeleteClick = useCallback(() => {
    if (!currentPost) return;

    if (window.confirm('정말로 게시글을 삭제하시겠습니까?')) {
      deletePost(currentPost.postKey);
      setCurrentPost(null);
      alert('게시글이 삭제되었습니다.');
      handleBackClick();
    }
  }, [currentPost, deletePost, setCurrentPost, handleBackClick]);

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
