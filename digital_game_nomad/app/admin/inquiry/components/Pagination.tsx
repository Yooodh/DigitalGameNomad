// slice
import styles from '../styles/AdminInquiry.module.scss';
import { PaginationProps } from '../types';

// layer
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from '@/shared/icons';

export default function Pagination({
  currentPage,
  setCurrentPage,
  totalPages,
  MAX_VISIBLE_PAGES,
  filteredInquiriesLength,
  currentInquiriesLength,
  ITEMS_PER_PAGE,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = [];
  let startPage = Math.max(1, currentPage - Math.floor(MAX_VISIBLE_PAGES / 2));
  let endPage = Math.min(totalPages, startPage + MAX_VISIBLE_PAGES - 1);

  if (endPage - startPage + 1 < MAX_VISIBLE_PAGES) {
    startPage = Math.max(1, endPage - MAX_VISIBLE_PAGES + 1);
  }

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  pages.push(
    <button
      key='first'
      className={styles.controlContainer__btn}
      onClick={() => setCurrentPage(1)}
      disabled={currentPage === 1}
      aria-label='First page'
    >
      <ChevronsLeft />
    </button>
  );
  pages.push(
    <button
      key='prev'
      className={styles.controlContainer__btn}
      onClick={() => setCurrentPage(currentPage - 1)}
      disabled={currentPage === 1}
      aria-label='Previous page'
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
        onClick={() => setCurrentPage(i)}
        aria-label={`Page ${i}`}
      >
        {i}
      </button>
    );
  }

  pages.push(
    <button
      key='next'
      className={styles.controlContainer__btn}
      onClick={() => setCurrentPage(currentPage + 1)}
      disabled={currentPage === totalPages}
      aria-label='Next page'
    >
      <ChevronRight />
    </button>
  );
  pages.push(
    <button
      key='last'
      className={styles.controlContainer__btn}
      onClick={() => setCurrentPage(totalPages)}
      disabled={currentPage === totalPages}
      aria-label='Last page'
    >
      <ChevronsRight />
    </button>
  );

  return (
    <div className={styles.paginationContainer}>
      <div className={styles.paginationContainer__wrap}>
        <div className={styles.resultContainer}>
          <span className={styles.resultContainer__count}>
            전체 {filteredInquiriesLength}개 중{' '}
            {filteredInquiriesLength === 0 ? 0 : startIndex + 1}-
            {Math.min(
              startIndex + currentInquiriesLength,
              filteredInquiriesLength
            )}
            개 표시
          </span>
        </div>
        <div className={styles.controlContainer}>{pages}</div>
      </div>
    </div>
  );
}
