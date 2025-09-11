// package
import { useState, useEffect, useCallback } from 'react';

// slice
import { UseEditFormProps } from '../types';
import { useFormValidation } from '../../hooks/useFormValidation';
import { useGameSelection } from '../../hooks/useGameSelection';
import { useImageHandler } from '../../hooks/useImageHandler';
import { postUtils } from '../../utils/postUtils';
import { useBoardStore } from '@/shared/stores/useBoardStore';
import { PostData } from '../../../types';

export const useEditForm = ({ postId, onSave, onCancel }: UseEditFormProps) => {
  const {
    allPosts,
    currentPost: globalCurrentPost,
    gameList,
  } = useBoardStore();

  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [originalData, setOriginalData] = useState<PostData | null>(null);

  const { validate } = useFormValidation();
  const {
    selectedGame,
    setSelectedGame,
    rating,
    setRating: setGameSelectionRating,
    isReviewMode,
    setIsReviewMode,
  } = useGameSelection();
  const {
    imageFile,
    currentImageUrl,
    isImageRemoved,
    handleImageChange,
    handleRemoveImage,
    setCurrentImageUrl,
  } = useImageHandler();

  useEffect(() => {
    setLoading(true);
    const foundData =
      globalCurrentPost && globalCurrentPost.postKey === postId
        ? globalCurrentPost
        : allPosts.find((post) => post.postKey === postId);

    if (foundData) {
      setOriginalData(foundData);
      setTitle(foundData.postTitle);
      setContent(foundData.postText);

      setSelectedGame(foundData.game_name || '');
      setIsReviewMode(foundData.postTopic === '후기');
      setGameSelectionRating(
        foundData.post_score && foundData.post_score > 0
          ? foundData.post_score
          : 1
      );
      setCurrentImageUrl(foundData.image_url || '');
    } else {
      console.error(`ID ${postId}의 게시글을 스토어에서 찾을 수 없습니다.`);
      setOriginalData(null);
    }
    setLoading(false);
  }, [
    postId,
    allPosts,
    globalCurrentPost,
    setSelectedGame,
    setIsReviewMode,
    setGameSelectionRating,
    setCurrentImageUrl,
  ]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setSaving(true);

      const validationError = validate(
        {
          title: title,
          content: content,
          selectedGame: selectedGame,
          rating: rating,
          isReviewMode: isReviewMode,
        },
        {
          game: { required: isReviewMode },
          rating: { min: isReviewMode ? 1 : 0 },
        }
      );

      if (validationError) {
        alert(validationError);
        setSaving(false);
        return;
      }

      if (!originalData) {
        console.error(
          '원본 게시글 데이터를 찾을 수 없어 업데이트를 저장할 수 없습니다.'
        );
        setSaving(false);
        return;
      }

      const updatedData: Partial<PostData> = {
        postTitle: title,
        postText: content,
        postTopic: isReviewMode ? '후기' : '자유',
        image_url: isImageRemoved ? undefined : currentImageUrl,
        ...(isReviewMode && {
          game_name: selectedGame,
          post_score: rating,
        }),
      };

      const finalUpdatedPost = postUtils.updatePost(originalData, updatedData);

      if (onSave) {
        onSave(finalUpdatedPost);
      }
      setSaving(false);
    },
    [
      title,
      content,
      selectedGame,
      rating,
      isReviewMode,
      isImageRemoved,
      currentImageUrl,
      originalData,
      onSave,
      validate,
    ]
  );

  const handleCancel = useCallback(() => {
    if (onCancel) {
      onCancel();
    }
  }, [onCancel]);

  return {
    loading,
    saving,
    title,
    setTitle,
    content,
    setContent,
    originalData,
    selectedGame,
    setSelectedGame,
    rating,
    setGameSelectionRating,
    isReviewMode,
    setIsReviewMode,
    imageFile,
    currentImageUrl,
    isImageRemoved,
    handleImageChange,
    handleRemoveImage,
    setCurrentImageUrl,
    handleSubmit,
    handleCancel,
    gameList,
  };
};
