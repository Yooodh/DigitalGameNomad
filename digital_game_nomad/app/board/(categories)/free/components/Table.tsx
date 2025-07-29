// slice
import styles from '../styles/Free.module.scss';
import { formatDate } from '../../../utils/formatDate';
import { TableProps } from '../types';

// layer
import { truncateText } from '@/shared/utils/truncateText';

export default function Table({
  currentPosts,
  filteredPostsCount,
  startIndex,
  onPostClick,
}: TableProps) {
  return (
    <table className={styles.tableContainer}>
      <thead className={styles.tableHeaderContainer}>
        <tr>
          <th className={styles.tableHeaderContainer__number}>번호</th>
          <th className={styles.tableHeaderContainer__title}>제목</th>
          <th className={styles.tableHeaderContainer__author}>작성자</th>
          <th className={styles.tableHeaderContainer__date}>작성일</th>
          <th className={styles.tableHeaderContainer__views}>조회</th>
          <th className={styles.tableHeaderContainer__likes}>추천</th>
          <th className={styles.tableHeaderContainer__comments}>댓글</th>
        </tr>
      </thead>
      <tbody>
        {currentPosts.map((post, index) => (
          <tr
            key={post.postKey}
            className={styles.tableRowContainer}
            onClick={() => onPostClick(post.postKey)}
          >
            <td className={styles.tableRowContainer__number}>
              {filteredPostsCount - (startIndex + index)}
            </td>
            <td className={styles.tableRowContainer__title}>
              {truncateText(post.postTitle)}
            </td>
            <td className={styles.tableRowContainer__author}>
              {post.userName}
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
        ))}
      </tbody>
    </table>
  );
}
