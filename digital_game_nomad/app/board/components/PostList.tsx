// package
import Link from 'next/link';

// slice
import styles from '../styles/Board.module.scss';
import { PostListProps } from '../types';

// layer
import { StarRating } from '@/features/starrating';

export default function PostList({
  title,
  posts,
  basePath,
  formatDate,
  isReviewSection = false,
}: PostListProps) {
  const boardType = basePath.split('/').pop();

  return (
    <section className={styles.sectionContainer}>
      <div className={styles.sectionContainer__header}>
        <h2 className={styles.sectionContainer__title}>{title}</h2>

        <Link href={basePath} className={styles.sectionContainer__moreLink}>
          더보기
        </Link>
      </div>

      <div className={styles.postListContainer}>
        {posts.slice(0, 10).map((post) => (
          <div key={post.postKey} className={styles.postListContainer__item}>
            <Link
              href={`/board/detail?postId=${post.postKey}&boardType=${boardType}`}
              className={styles.postListContainer__link}
            >
              <span className={styles.postListContainer__title}>
                <span className={styles.postListContainer__like}>
                  {post.likeCount}👍{' '}
                </span>
                {post.postTitle}
                <span className={styles.postListContainer__comment}>
                  {' '}
                  [{post.comments || 0}]
                </span>
              </span>
            </Link>

            {isReviewSection ? (
              <div className={styles.postListContainer__meta}>
                <span className={styles.postListContainer__gameName}>
                  {post.game_name}
                </span>

                {post.post_score !== undefined && (
                  <div className={styles.postListContainer__gameRating}>
                    <StarRating
                      rating={post.post_score}
                      showRatingText={false}
                    />
                  </div>
                )}
                <span className={styles.postListContainer__username}>
                  {post.userName}
                </span>
                <span className={styles.postListContainer__date}>
                  {formatDate(post.postDate)}
                </span>
              </div>
            ) : (
              <div className={styles.postListContainer__meta}>
                <span className={styles.postListContainer__username}>
                  {post.userName}
                </span>
                <span className={styles.postListContainer__date}>
                  {formatDate(post.postDate)}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
