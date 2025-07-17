// slice
import styles from '../styles/Inquiry.module.scss';
import { InquiryStatus, FiltersProps } from '../types';

// layer
import { Search, Filter } from '@/shared/icons';

export default function Filters({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
}: FiltersProps) {
  return (
    <div className={styles.filtersContainer}>
      <div className={styles.searchContainer}>
        <div className={styles.boxContainer}>
          <span className={styles.boxContainer__icon}>
            <Search />
          </span>
          <input
            type='text'
            placeholder='제목 또는 문의번호로 검색...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.boxContainer__input}
          />
        </div>
      </div>

      <div className={styles.filterContainer}>
        <div className={styles.selectContainer}>
          <span className={styles.selectContainer__icon}>
            <Filter />
          </span>
          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value as InquiryStatus | 'all')
            }
            className={styles.selectContainer__select}
          >
            <option value='all'>전체</option>
            <option value='접수'>접수</option>
            <option value='처리중'>처리중</option>
            <option value='완료'>완료</option>
          </select>
        </div>
      </div>
    </div>
  );
}
