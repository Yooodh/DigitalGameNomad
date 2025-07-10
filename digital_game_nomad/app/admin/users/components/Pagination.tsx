// slice
import styles from '../styles/Users.module.scss';
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
  totalPages,
  startIndex,
  endIndex,
  totalFilteredAndSortedUsersCount,
  handlePageChange,
  generatePageNumbers,
}: PaginationProps) {
  return (
    <div className={styles.paginationContainer}>
      <div className={styles.paginationContainer__wrap}>
        <div className={styles.resultContainer}>
          <span className={styles.resultContainer__count}>
            전체 {totalFilteredAndSortedUsersCount}명 중 {startIndex + 1}-
            {Math.min(endIndex, totalFilteredAndSortedUsersCount)}명 표시
          </span>
        </div>

        {totalPages > 1 && (
          <div className={styles.controlContainer}>
            <button
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
              className={styles.controlContainer__btn}
            >
              <ChevronsLeft />
            </button>

            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={styles.controlContainer__btn}
            >
              <ChevronLeft />
            </button>

            <div>
              {generatePageNumbers().map((page, index) => (
                <button
                  key={index}
                  onClick={() =>
                    typeof page === 'number' && handlePageChange(page)
                  }
                  disabled={page === '...'}
                  className={`${styles.controlContainer__btn} ${
                    page === currentPage ? styles.pageBtnActive : ''
                  } ${page === '...' ? styles.ellipsis : ''}`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={styles.controlContainer__btn}
            >
              <ChevronRight />
            </button>

            <button
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
              className={styles.controlContainer__btn}
            >
              <ChevronsRight />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
