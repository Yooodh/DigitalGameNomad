'use client';

// slice
import styles from '../styles/Detail.module.scss';
import { InteractionProps } from '../types';

export default function Interaction({
  likeCount,
  dislikeCount,
  handleLikeClick,
  handleDislikeClick,
}: InteractionProps) {
  return (
    <div className={styles.actionContainer}>
      <button
        className={styles.likeBtn}
        aria-label='게시글 추천하기'
        onClick={handleLikeClick}
      >
        <span className={styles.btnIcon}>👍</span> 추천 ({likeCount})
      </button>
      <button
        className={styles.dislikeBtn}
        aria-label='게시글 비공감하기'
        onClick={handleDislikeClick}
      >
        <span className={styles.btnIcon}>👎</span> 비공감 ({dislikeCount ?? 0})
      </button>
    </div>
  );
}
