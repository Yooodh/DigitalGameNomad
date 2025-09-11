'use client';

// package
import { useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

// slice
import DetailPresenter from '../presenter/DetailPresenter';
import {
  BOARD_TYPES,
  BOARD_PATHS,
  MESSAGES,
  BUTTON_TEXT,
  MOCK_LOGGED_IN_USER_KEY,
} from '../constants';
import Empty from '../../components/Empty';
import { usePostDetail } from '../hooks/usePostDetail';
import { usePostActions } from '../hooks/usePostActions';
import { useCommentManager } from '../hooks/useCommentManager';
import { usePostInteractions } from '../../hooks/usePostInteractions';
import { useImageHandler } from '../../hooks/useImageHandler';
import EditContainer from '../../edit/container/EditContainer';

// layer
import LoadingSpinner from '@/shared/components/Spinner';

export default function DetailContainer() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const boardType = searchParams.get('boardType');
  const loggedInUserKey = String(MOCK_LOGGED_IN_USER_KEY ?? '');
  const { loading, postId, currentPost, previousTab } = usePostDetail();
  const {
    newComment,
    setNewComment,
    editingCommentId,
    editedCommentContent,
    setEditedCommentContent,
    currentPostComments,
    handleCommentSubmit,
    handleDeleteComment,
    handleEditCommentClick,
    handleSaveEditedComment,
    handleCancelEditComment,
  } = useCommentManager(postId);

  const { handleLikeClick, handleDislikeClick } = usePostInteractions();

  const { imageLoading, imageError, handleImageLoad, handleImageError } =
    useImageHandler();

  const handleBackClick = useCallback(() => {
    const targetBoardType = previousTab || boardType || BOARD_TYPES.FREE;

    switch (targetBoardType) {
      case BOARD_TYPES.FREE:
        router.push(BOARD_PATHS.FREE);
        break;
      case BOARD_TYPES.REVIEW:
        router.push(BOARD_PATHS.REVIEW);
        break;
      default:
        router.push(BOARD_PATHS.FREE);
        break;
    }
  }, [previousTab, boardType, router]);

  const {
    isEditMode,
    handleEditClick,
    handleEditSave,
    handleDeleteClick,
    handleEditCancel,
  } = usePostActions({ currentPost, handleBackClick });

  if (loading) {
    return <LoadingSpinner message={MESSAGES.LOADING_POST} />;
  }

  if (isEditMode) {
    if (!currentPost) {
      return (
        <Empty
          title={MESSAGES.EDIT_ERROR_NO_POST}
          message={MESSAGES.EDIT_ERROR_MESSAGE}
          buttonText={BUTTON_TEXT.GO_TO_LIST}
          onButtonClick={handleBackClick}
        />
      );
    }
    return (
      <EditContainer
        postId={currentPost.postKey}
        onSave={handleEditSave}
        onCancel={handleEditCancel}
      />
    );
  }

  if (!currentPost) {
    return (
      <Empty
        title={MESSAGES.NOT_FOUND_TITLE}
        message={MESSAGES.NOT_FOUND_MESSAGE}
        buttonText={BUTTON_TEXT.GO_TO_LIST_SHORT}
        onButtonClick={handleBackClick}
      />
    );
  }

  return (
    <DetailPresenter
      currentPost={currentPost}
      currentPostComments={currentPostComments}
      newComment={newComment}
      setNewComment={setNewComment}
      handleCommentSubmit={handleCommentSubmit}
      handleImageLoad={handleImageLoad}
      handleImageError={handleImageError}
      imageLoading={imageLoading}
      imageError={imageError}
      handleLikeClick={() => handleLikeClick(currentPost.postKey)}
      handleDislikeClick={() => handleDislikeClick(currentPost.postKey)}
      handleEditClick={handleEditClick}
      handleDeleteClick={handleDeleteClick}
      handleBackClick={handleBackClick}
      loggedInUserKey={loggedInUserKey}
      editingCommentId={editingCommentId}
      editedCommentContent={editedCommentContent}
      setEditedCommentContent={setEditedCommentContent}
      handleDeleteComment={handleDeleteComment}
      handleEditCommentClick={handleEditCommentClick}
      handleSaveEditedComment={handleSaveEditedComment}
      handleCancelEditComment={handleCancelEditComment}
    />
  );
}
