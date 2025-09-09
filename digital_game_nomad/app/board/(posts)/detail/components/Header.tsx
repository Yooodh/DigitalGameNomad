// slice
import styles from '../styles/Detail.module.scss';
import { HeaderProps } from '../types';
import { formatDate } from '../../../utils/formatDate';

// layer
import { useRegisteredUsersStore } from '@/shared/stores/useRegisteredUsersStore';
import { getUserGradeLabel } from '@/shared/utils/userGradeLabel';
import { StarRating } from '@/features/starrating';

export default function Header({ currentPost }: HeaderProps) {
  const users = useRegisteredUsersStore((state) => state.users);
  const author = users.find((u) => u.id === currentPost.userKey);
  const displayName =
    author?.nickname || author?.name || currentPost.userName || '알수없음';

  const isReviewPost = currentPost.postTopic === '후기';

  return (
    <div className={styles.headercontainer}>
      <div className={styles.topContainer}>
        <span
          className={`${styles.topContainer__badge} ${
            isReviewPost ? styles.review : styles.free
          }`}
        >
          {currentPost.postTopic}
        </span>

        {isReviewPost && currentPost.game_name && (
          <div className={styles.gameContainer}>
            <span className={styles.gameContainer__name}>
              {currentPost.game_name}
            </span>
            {currentPost.post_score !== undefined &&
              currentPost.post_score !== null && (
                <StarRating
                  rating={currentPost.post_score}
                  showRatingText={true}
                />
              )}
          </div>
        )}
      </div>

      <h1 className={styles.headercontainer__title}>{currentPost.postTitle}</h1>

      <div className={styles.metaContainer}>
        <div className={styles.authorContainer}>
          <span className={styles.authorContainer__name}>
            {displayName}
            {author && author.userGrade !== 3 && (
              <span className={styles.userGrade}>
                &nbsp;({getUserGradeLabel(author.userGrade)})
              </span>
            )}
          </span>
          <span className={styles.authorContainer__date}>
            {formatDate(currentPost.postDate)}
            {currentPost.isEdited && currentPost.lastModifiedDate && (
              <span className={styles.editedIndicator}>
                (수정됨: {formatDate(currentPost.lastModifiedDate)})
              </span>
            )}
          </span>
        </div>

        <div className={styles.statContainer}>
          <span className={styles.statContainer__stat}>
            <span className={styles.statIcon}>👁</span>{' '}
            {currentPost.viewCount ?? 0}
          </span>
          <span className={styles.statContainer__stat}>
            <span className={styles.statIcon}>👍</span>{' '}
            {currentPost.likeCount ?? 0}
          </span>
        </div>
      </div>
    </div>
  );
}
