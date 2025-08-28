// slice
import styles from '../styles/AdminApplications.module.scss';
import { StatusFilter, StatusFilterDropdownProps } from '../types';

// layer
import { Filter } from '@/shared/icons';

export default function StatusFilterDropdown({
  statusFilter,
  onStatusFilterChange,
}: StatusFilterDropdownProps) {
  return (
    <div className={styles.selectContainer}>
      <span className={styles.selectContainer__icon}>
        <Filter />
      </span>
      <select
        value={statusFilter}
        onChange={(e) => onStatusFilterChange(e.target.value as StatusFilter)}
        className={styles.selectContainer__select}
      >
        <option value='all'>모든 상태</option>
        <option value='pending'>검토중</option>
        <option value='approved'>승인됨</option>
        <option value='rejected'>거부됨</option>
      </select>
    </div>
  );
}
