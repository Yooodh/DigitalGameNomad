// slice
import styles from '../styles/AdminApplications.module.scss';
import { SortButtonsProps } from '../types';

// layer
import { Calendar, CheckCircle, ArrowUpDown } from '@/shared/icons';

export default function SortButtons({
  sortBy,
  onToggleSort,
}: SortButtonsProps) {
  return (
    <div className={styles.sortContainer}>
      <button
        onClick={() => onToggleSort('date')}
        className={`${styles.sortContainer__btn} ${
          sortBy === 'date' ? styles.active : ''
        }`}
      >
        <Calendar />
        날짜
        <ArrowUpDown />
      </button>
      <button
        onClick={() => onToggleSort('status')}
        className={`${styles.sortContainer__btn} ${
          sortBy === 'status' ? styles.active : ''
        }`}
      >
        <CheckCircle />
        상태
        <ArrowUpDown />
      </button>
    </div>
  );
}
