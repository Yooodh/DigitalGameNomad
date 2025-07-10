// slice
import styles from '../styles/Users.module.scss';
import { SortButtonsProps } from '../types';

// layer
import { Calendar, Clock, ArrowUpDown, CheckCircle } from '@/shared/icons';

export default function SortButtons({
  sortBy,
  handleSortChange,
}: SortButtonsProps) {
  return (
    <div className={styles.sortContainer}>
      <button
        onClick={() => handleSortChange('joinDate')}
        className={`${styles.sortContainer__btn} ${
          sortBy === 'joinDate' ? styles.active : ''
        }`}
      >
        <Calendar />
        가입일
        <ArrowUpDown />
      </button>

      <button
        onClick={() => handleSortChange('lastLoginDate')}
        className={`${styles.sortContainer__btn} ${
          sortBy === 'lastLoginDate' ? styles.active : ''
        }`}
      >
        <Clock />
        접속일
        <ArrowUpDown />
      </button>

      <button
        onClick={() => handleSortChange('name')}
        className={`${styles.sortContainer__btn} ${
          sortBy === 'name' ? styles.active : ''
        }`}
      >
        <CheckCircle />
        이름
        <ArrowUpDown />
      </button>
    </div>
  );
}
