// slice
import styles from '../styles/Users.module.scss';
import { FilterLevelSelectProps } from '../types';

// layer
import { Filter } from '@/shared/icons';

export default function FilterLevelSelect({
  filterLevel,
  handleFilterChange,
}: FilterLevelSelectProps) {
  return (
    <div className={styles.selectContainer}>
      <span className={styles.selectContainer__icon}>
        <Filter />
      </span>
      <select
        value={filterLevel}
        onChange={(e) =>
          handleFilterChange(
            e.target.value === 'all' ? 'all' : parseInt(e.target.value)
          )
        }
        className={styles.selectContainer__select}
      >
        <option value='all'>전체 등급</option>
        <option value={2}>기업</option>
        <option value={3}>일반</option>
      </select>
    </div>
  );
}
