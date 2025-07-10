// slice
import styles from '../styles/Users.module.scss';
import { FilterResetButtonProps } from '../types';

// layer
import { RefreshCw } from '@/shared/icons';

export default function FilterResetButton({
  handleResetFilters,
}: FilterResetButtonProps) {
  return (
    <button onClick={handleResetFilters} className={styles.resetFilterBtn}>
      <RefreshCw />
      필터 초기화
    </button>
  );
}
