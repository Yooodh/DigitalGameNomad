'use client';

// slice
import WritePresenter from '../presenters/Write.presenter';
import { useWriteForm } from '../hooks/useWriteForm';

// layer
import { useInteractiveStarRating } from '@/features/starrating';

export default function WriteContainer() {
  const {
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
  } = useWriteForm();

  const {
    currentRating: displayRating,
    hoverRating,
    processedStars,
    handleStarClick,
    handleStarMouseEnter,
    handleStarMouseLeave,
  } = useInteractiveStarRating({
    initialRating: rating,
    onRatingChange: setRating,
    maxRating: 5,
  });

  const typeAndGameCurrentRating = displayRating;
  const typeAndGameDisplayRequirementText = gameSelectRequirementText;
  const typeAndGameIsSelectFieldRequired = isGameSelectFieldRequired;

  return (
    <WritePresenter
      titleValue={titleValue}
      handleTitleChange={handleTitleChange}
      contentValue={contentValue}
      handleContentChange={handleContentChange}
      currentImageUrl={currentImageUrl}
      handleImageChange={handleImageChange}
      handleRemoveImage={handleRemoveImage}
      handleSubmit={handleSubmit}
      typeAndGameProps={{
        mode: 'write',
        gameName: selectedGame,
        handleGameSelect: handleGameSelect,
        gameList: gameList,
        isReviewMode: shouldShowReviewElements,
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
