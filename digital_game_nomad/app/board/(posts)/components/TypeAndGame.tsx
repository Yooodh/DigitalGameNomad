'use client';

// slice
import styles from '../styles/BoardPost.module.scss';
import { TypeAndGameProps } from '../types';

// layer
import { StarRatingUi } from '@/features/starrating';
import { StarSize } from '@/features/starrating/types/StarRating.types';

export default function TypeAndGame({
  setGameName,
  isReviewMode,
  handleGameSelect,
  gameName,
  gameList,
  hoverRating,
  processedStars,
  handleStarClick,
  handleStarMouseEnter,
  handleStarMouseLeave,
  currentRating,
  displayRequirementText,
  isSelectFieldRequired,
}: TypeAndGameProps) {
  const onGameSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (handleGameSelect) {
      handleGameSelect(e);
    } else if (setGameName) {
      setGameName(e.target.value);
    }
  };

  return (
    <>
      <div className={styles.gameContainer}>
        <label htmlFor='gameSelect' className={styles.label}>
          게임 선택 {displayRequirementText}
        </label>
        <select
          id='gameSelect'
          className={styles.gameContainer__select}
          value={gameName}
          onChange={onGameSelectChange}
          required={isSelectFieldRequired}
        >
          <option value=''>
            게임을 선택하세요 (
            {displayRequirementText === '(필수)' ? '필수' : '자유 게시판'})
          </option>
          {gameList.map((game, index) => (
            <option key={index} value={game}>
              {game}
            </option>
          ))}
        </select>

        {isReviewMode && (
          <div className={styles.gameContainer__rating}>
            <label className={styles.label}>별점</label>
            <StarRatingUi
              processedStars={processedStars}
              rating={currentRating}
              showRatingText={true}
              size={'large' as StarSize}
              isInteractive={true}
              onStarClick={handleStarClick}
              onStarMouseEnter={handleStarMouseEnter}
              onStarMouseLeave={handleStarMouseLeave}
              hoverRating={hoverRating}
            />
          </div>
        )}
      </div>
    </>
  );
}
