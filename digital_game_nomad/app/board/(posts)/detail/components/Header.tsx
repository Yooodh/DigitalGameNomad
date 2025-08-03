'use client';

// slice
import styles from '../styles/Detail.module.scss';
import { HeaderProps } from '../types';
import { formatDate } from '../../../utils/formatDate';

// layer
import { StarRating } from '@/features/starrating';

export default function Header({ currentPost }: HeaderProps) {
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
            {currentPost.userName}
          </span>
          <span className={styles.authorContainer__date}>
            {formatDate(currentPost.postDate)}{' '}
            {currentPost.isEdited && currentPost.lastModifiedDate && (
              <span className={styles.editedIndicator}>
                (수정됨: {formatDate(currentPost.lastModifiedDate)})
              </span>
            )}
          </span>
        </div>

        <div className={styles.statContainer}>
          <span className={styles.statContainer__stat}>
            <span className={styles.statIcon}>👁</span> {currentPost.viewCount}{' '}
          </span>
          <span className={styles.statContainer__stat}>
            <span className={styles.statIcon}>👍</span> {currentPost.likeCount}{' '}
          </span>
        </div>
      </div>
    </div>
  );
}
