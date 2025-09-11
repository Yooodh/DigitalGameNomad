'use client';

// slice
import EditPresenter from '../presenter/EditPresenter';
import Empty from '../../components/Empty';
import { useEditForm } from '../hooks/useEditForm';
import { PostEditProps } from '../types';

// layer
import LoadingSpinner from '@/shared/components/Spinner';
import { useInteractiveStarRating } from '@/features/starrating';
import { BUTTON_TEXT, MESSAGES, REQUIREMENT_TEXT } from '../constants';

export default function EditContainer({
  postId,
  onSave,
  onCancel,
}: PostEditProps) {
  const {
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
    currentImageUrl,
    handleImageChange,
    handleRemoveImage,
    handleSubmit,
    handleCancel,
    gameList,
  } = useEditForm({ postId, onSave, onCancel });

  const {
    currentRating: interactiveScore,
    hoverRating,
    processedStars,
    handleStarClick,
    handleStarMouseEnter,
    handleStarMouseLeave,
  } = useInteractiveStarRating({
    initialRating: rating,
    onRatingChange: setGameSelectionRating,
    maxRating: 5,
  });

  if (loading) {
    return <LoadingSpinner message={MESSAGES.LOADING_POST} />;
  }

  if (!originalData && postId) {
    return (
      <Empty
        title={MESSAGES.POST_NOT_FOUND_TITLE}
        message={MESSAGES.POST_NOT_FOUND_MESSAGE}
        buttonText={BUTTON_TEXT.GO_BACK}
        onButtonClick={handleCancel}
      />
    );
  }

  const typeAndGameCurrentRating = interactiveScore;
  const typeAndGameDisplayRequirementText = isReviewMode
    ? REQUIREMENT_TEXT.REQUIRED
    : REQUIREMENT_TEXT.OPTIONAL;
  const typeAndGameIsSelectFieldRequired = isReviewMode;

  return (
    <EditPresenter
      title={title}
      setTitle={setTitle}
      content={content}
      setContent={setContent}
      topic={isReviewMode ? '후기' : '자유'}
      currentImageUrl={currentImageUrl}
      handleImageChange={handleImageChange}
      handleRemoveImage={handleRemoveImage}
      handleSubmit={handleSubmit}
      handleCancel={handleCancel}
      saving={saving}
      isReviewMode={isReviewMode}
      typeAndGameProps={{
        mode: 'edit',
        gameName: selectedGame,
        setGameName: setSelectedGame,
        gameList: gameList,
        isReviewMode: isReviewMode,
        currentRating: typeAndGameCurrentRating,
        displayRequirementText: typeAndGameDisplayRequirementText,
        isSelectFieldRequired: typeAndGameIsSelectFieldRequired,
        hoverRating: hoverRating,
        processedStars: processedStars,
        handleStarClick: handleStarClick,
        handleStarMouseEnter: handleStarMouseEnter,
        handleStarMouseLeave: handleStarMouseLeave,
      }}
    />
  );
}
