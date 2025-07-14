// slice
import styles from '../styles/Detail.module.scss';
import { FiltersProps } from '../types';

// layer
import { Search, Filter } from '@/shared/icons';

export default function Filters({
  searchTerm,
  statusFilter,
  onSearchChange,
  onStatusFilterChange,
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
            onChange={onSearchChange}
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
            onChange={onStatusFilterChange}
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
