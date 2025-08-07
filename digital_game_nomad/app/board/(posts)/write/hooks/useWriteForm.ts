// package
import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';

// slice
import { useFormValidation } from '../../hooks/useFormValidation';
import { useGameSelection } from '../../hooks/useGameSelection';
import { useImageHandler } from '../../hooks/useImageHandler';
import { postUtils } from '../../utils/postUtils';
import { useBoardStore } from '../../../stores/useBoardStore';
import { PostData } from '../../../types';

export const useWriteForm = () => {
  const router = useRouter();
  const [titleValue, setTitleValue] = useState<string>('');
  const [contentValue, setContentValue] = useState<string>('');

  const { addPost, gameList } = useBoardStore();

  const { validate } = useFormValidation();
  const { selectedGame, rating, setRating, handleGameSelect } =
    useGameSelection();
  const { imageFile, currentImageUrl, handleImageChange, handleRemoveImage } =
    useImageHandler();

  const shouldShowReviewElements = !!selectedGame;
  const isGameSelectFieldRequired = false;
  const gameSelectRequirementText = '(선택사항)';

  const handleTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setTitleValue(e.target.value);
    },
    []
  );

  const handleContentChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setContentValue(e.target.value);
    },
    []
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      const validationError = validate(
        {
          title: titleValue,
          content: contentValue,
          selectedGame: selectedGame,
          rating: rating,
          isReviewMode: shouldShowReviewElements,
        },
        {
          game: { required: shouldShowReviewElements },
          rating: { min: shouldShowReviewElements ? 1 : 0 },
        }
      );

      if (validationError) {
        alert(validationError);
        return;
      }

      const newPost: PostData = postUtils.createNewPost({
        title: titleValue,
        content: contentValue,
        topic: shouldShowReviewElements ? '후기' : '자유',
        imageUrl: currentImageUrl,
        gameName: shouldShowReviewElements ? selectedGame : undefined,
        rating: shouldShowReviewElements ? rating : undefined,
        userKey: 999,
        userName: '테스트 유저',
      });

      addPost(newPost);

      alert(
        `${
          shouldShowReviewElements ? '후기' : '자유'
        } 게시판에 글이 작성되었습니다.`
      );

      const boardTypeParam = shouldShowReviewElements ? 'review' : 'free';
      router.push(
        `/board/detail?postId=${newPost.postKey}&boardType=${boardTypeParam}`
      );
    },
    [
      titleValue,
      contentValue,
      shouldShowReviewElements,
      selectedGame,
      rating,
      currentImageUrl,
      imageFile,
      addPost,
      router,
      validate,
    ]
  );

  return {
    titleValue,
    handleTitleChange,
    contentValue,
    handleContentChange,
    currentImageUrl,
    handleImageChange,
    handleRemoveImage,
    handleSubmit,
    selectedGame,
    handleGameSelect,
    rating,
    setRating,
    shouldShowReviewElements,
    isGameSelectFieldRequired,
    gameSelectRequirementText,
    gameList,
  };
};
