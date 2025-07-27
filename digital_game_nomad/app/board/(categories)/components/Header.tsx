// slice
import styles from '../styles/BoardCategory.module.scss';
import { HeaderProps } from '../types';

export default function Header({
  filteredPostsCount,
  onListClick,
  onWriteClick,
  boardTitle,
}: HeaderProps) {
  return (
    <div className={styles.headerContainer}>
      <h2 className={styles.headerContainer__title}>
        {boardTitle} ({filteredPostsCount})
      </h2>
      <div className={styles.btnContainer}>
        <button
          className={styles.btnContainer__btn}
          aria-label='목록 보기'
          onClick={onListClick}
        >
          목록
        </button>
        <button
          className={styles.btnContainer__btn}
          aria-label='새 글 작성'
          onClick={onWriteClick}
        >
          글쓰기
        </button>
      </div>
    </div>
  );
}
