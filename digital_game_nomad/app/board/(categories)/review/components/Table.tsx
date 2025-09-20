// slice
import styles from '../styles/Review.module.scss';
import { ReviewTableProps } from '../types';
import { formatDate } from '../../../utils/formatDate';

// layer
import { useRegisteredUsersStore } from '@/shared/stores/useRegisteredUsersStore';
import { getUserGradeLabel } from '@/shared/utils/userGradeLabel';
import { truncateText } from '@/shared/utils/truncateText';
import { StarRating } from '@/features/starrating';

export default function ReviewTable({
  currentPosts,
  filteredPostsCount,
  startIndex,
  onPostClick,
}: ReviewTableProps) {
  const users = useRegisteredUsersStore((state) => state.users);

  return (
    <table className={styles.tableContainer}>
      <thead className={styles.tableHeaderContainer}>
        <tr>
          <th className={styles.tableHeaderContainer__number}>번호</th>
          <th className={styles.tableHeaderContainer__game}>게임명</th>
          <th className={styles.tableHeaderContainer__title}>제목</th>
          <th className={styles.tableHeaderContainer__author}>작성자</th>
          <th className={styles.tableHeaderContainer__score}>별점</th>
          <th className={styles.tableHeaderContainer__date}>작성일</th>
          <th className={styles.tableHeaderContainer__views}>조회</th>
          <th className={styles.tableHeaderContainer__likes}>추천</th>
          <th className={styles.tableHeaderContainer__comments}>댓글</th>
        </tr>
      </thead>

      <tbody>
        {currentPosts.map((post, index) => {
          const author = users.find((u) => u.id === post.userKey);
          const displayName =
            author?.nickname || author?.name || post.userName || '알수없음';
          return (
            <tr
              key={post.postKey}
              className={styles.tableRowContainer}
              onClick={() => onPostClick(post.postKey)}
            >
              <td className={styles.tableRowContainer__number}>
                {filteredPostsCount - (startIndex + index)}
              </td>
              <td className={styles.tableRowContainer__game}>
                {post.game_name || '-'}
              </td>
              <td className={styles.tableRowContainer__title}>
                {truncateText(post.postTitle)}
              </td>
              <td className={styles.tableRowContainer__author}>
                {displayName}
                {author && author.userGrade !== 3 && (
                  <span className={styles.userGrade}>
                    &nbsp;({getUserGradeLabel(author.userGrade)})
                  </span>
                )}
              </td>
              <td className={styles.tableRowContainer__score}>
                {post.post_score !== undefined && post.post_score !== null ? (
                  <StarRating rating={Math.max(0, post.post_score)} />
                ) : (
                  '-'
                )}
              </td>
              <td className={styles.tableRowContainer__date}>
                {formatDate(post.postDate)}
              </td>
              <td className={styles.tableRowContainer__views}>
                {post.viewCount}
              </td>
              <td className={styles.tableRowContainer__likes}>
                {post.likeCount}
              </td>
              <td className={styles.tableRowContainer__comments}>
                {post.comments || 0}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
