'use client';

// slice
import styles from '../styles/Detail.module.scss';
import { ActionsProps } from '../types';

export default function Actions({
  isAuthor,
  handleBackClick,
  handleEditClick,
  handleDeleteClick,
}: ActionsProps) {
  return (
    <div className={styles.navContainer}>
      <button className={styles.navBtn} onClick={handleBackClick}>
        목록
      </button>
      {isAuthor && (
        <div className={styles.navBtnGroup}>
          <button
            className={`${styles.navBtn} ${styles.editBtn}`}
            onClick={handleEditClick}
            aria-label='게시글 수정'
          >
            수정
          </button>
          <button
            className={`${styles.navBtn} ${styles.deleteBtn}`}
            onClick={handleDeleteClick}
            aria-label='게시글 삭제'
          >
            삭제
          </button>
        </div>
      )}
    </div>
  );
}
