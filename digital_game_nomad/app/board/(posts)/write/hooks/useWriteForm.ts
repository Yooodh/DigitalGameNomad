// package
import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

// slice
import { useFormValidation } from '../../hooks/useFormValidation';
import { useGameSelection } from '../../hooks/useGameSelection';
import { useImageHandler } from '../../hooks/useImageHandler';
import { postUtils } from '../../utils/postUtils';
import { PostData } from '../../../types';

// layer
import { useBoardStore } from '@/shared/stores/useBoardStore';
import { getCurrentUserInfo } from '@/shared/utils/getCurrentUserInfo';

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

  const currentUser = getCurrentUserInfo();

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

      if (!currentUser) {
        toast.info('로그인 후 이용해 주세요.');
        return;
      }

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
        toast.error(validationError);
        return;
      }

      const newPost: PostData = postUtils.createNewPost({
        title: titleValue,
        content: contentValue,
        topic: shouldShowReviewElements ? '후기' : '자유',
        imageUrl: currentImageUrl,
        gameName: shouldShowReviewElements ? selectedGame : undefined,
        rating: shouldShowReviewElements ? rating : undefined,
        userKey: currentUser.userKey,
        userName: currentUser.userName,
      });

      addPost(newPost);

      toast.success(
        `${
          shouldShowReviewElements ? '후기' : '자유'
        } 게시판에 글이 작성되었습니다.`
      );

      const boardTypeParam = shouldShowReviewElements ? 'review' : 'free';
      setTimeout(() => {
        router.push(
          `/board/detail?postId=${newPost.postKey}&boardType=${boardTypeParam}`
        );
      }, 250);
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
      currentUser,
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
