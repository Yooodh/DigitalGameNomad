// slice
import styles from '../styles/BoardCategory.module.scss';
import { PaginationProps } from '../types';

// layer
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from '@/shared/icons';

export default function Pagination({
  currentPosts,
  filteredPostsCount,
  startIndex,
  totalPages,
  currentPage,
  onPageChange,
  maxVisiblePages,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = [];
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  pages.push(
    <button
      key='first'
      className={styles.controlContainer__btn}
      onClick={() => onPageChange(1)}
      disabled={currentPage === 1}
      aria-label='첫 페이지'
    >
      <ChevronsLeft />
    </button>
  );

  pages.push(
    <button
      key='prev'
      className={styles.controlContainer__btn}
      onClick={() => onPageChange(currentPage - 1)}
      disabled={currentPage === 1}
      aria-label='이전 페이지'
    >
      <ChevronLeft />
    </button>
  );

  for (let i = startPage; i <= endPage; i++) {
    pages.push(
      <button
        key={i}
        className={`${styles.controlContainer__btn} ${
          i === currentPage ? styles.pageBtnActive : ''
        }`}
        onClick={() => onPageChange(i)}
        aria-label={`${i} 페이지`}
      >
        {i}
      </button>
    );
  }

  pages.push(
    <button
      key='next'
      className={styles.controlContainer__btn}
      onClick={() => onPageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
      aria-label='다음 페이지'
    >
      <ChevronRight />
    </button>
  );

  pages.push(
    <button
      key='last'
      className={styles.controlContainer__btn}
      onClick={() => onPageChange(totalPages)}
      disabled={currentPage === totalPages}
      aria-label='마지막 페이지'
    >
      <ChevronsRight />
    </button>
  );

  return (
    <div className={styles.paginationContainer}>
      <div className={styles.paginationContainer__wrap}>
        <div className={styles.resultContainer}>
          <span className={styles.resultContainer__count}>
            전체 {filteredPostsCount}개 중{' '}
            {filteredPostsCount === 0 ? 0 : startIndex + 1}-
            {Math.min(startIndex + currentPosts.length, filteredPostsCount)} 개
            표시
          </span>
        </div>
        <div className={styles.controlContainer}>{pages}</div>
      </div>
    </div>
  );
}
