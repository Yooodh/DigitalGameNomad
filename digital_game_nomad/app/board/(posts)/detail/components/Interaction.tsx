// slice
import styles from '../styles/Detail.module.scss';
import { useInteraction } from '../hooks/useInteraction';
import { InteractionProps } from '../types';

export default function Interaction({ postId }: InteractionProps) {
  const {
    likeCount,
    dislikeCount,
    likeBtnClass,
    dislikeBtnClass,
    onLike,
    onDislike,
  } = useInteraction(postId);

  return (
    <div className={styles.interactionContainer}>
      <button
        type='button'
        className={`${styles.interactionBtn} ${styles[likeBtnClass]}`}
        onClick={onLike}
        aria-label='추천'
        tabIndex={0}
      >
        <span className={styles.btnIcon}>👍</span> 추천 {likeCount}
      </button>
      <button
        type='button'
        className={`${styles.interactionBtn} ${styles[dislikeBtnClass]}`}
        onClick={onDislike}
        aria-label='비공감'
        tabIndex={0}
      >
        <span className={styles.btnIcon}>👎</span> 비공감 {dislikeCount}
      </button>
    </div>
  );
}
