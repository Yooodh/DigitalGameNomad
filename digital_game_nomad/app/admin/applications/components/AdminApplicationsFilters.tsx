// slice
import SearchInput from './SearchInput';
import SortButtons from './SortButtons';
import StatusFilterDropdown from './StatusFilterDropdown';
import styles from '../styles/AdminApplications.module.scss';
import { AdminApplicationsFiltersProps } from '../types';

// layer
import { RefreshCw } from '@/shared/icons';

export default function AdminApplicationsFilters({
  searchTerm,
  statusFilter,
  sortBy,
  sortOrder,
  onSearchChange,
  onStatusFilterChange,
  onResetFilters,
  onToggleSort,
}: AdminApplicationsFiltersProps) {
  return (
    <div className={styles.filtersContainer}>
      <SearchInput
        searchTerm={searchTerm}
        onSearchChange={onSearchChange}
        placeholder='기업명, 게임명, 이메일, 전화번호로 검색...'
      />

      <div className={styles.filterContainer}>
        <StatusFilterDropdown
          statusFilter={statusFilter}
          onStatusFilterChange={onStatusFilterChange}
        />

        <button
          onClick={onResetFilters}
          className={styles.resetFilterButton}
          title='필터 초기화'
        >
          <RefreshCw />
          필터 초기화
        </button>

        <SortButtons
          sortBy={sortBy}
          sortOrder={sortOrder}
          onToggleSort={onToggleSort}
        />
      </div>
    </div>
  );
}
