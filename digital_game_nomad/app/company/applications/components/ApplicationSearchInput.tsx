// slice
import styles from '../styles/Applications.module.scss';
import { ApplicationSearchInputProps } from '../types';

// layer
import { Search } from '@/shared/icons';

export default function ApplicationSearchInput({
  searchTerm,
  onSearchChange,
}: ApplicationSearchInputProps) {
  return (
    <div className={styles.searchContainer}>
      <div className={styles.boxContainer}>
        <span className={styles.boxContainer__icon}>
          <Search />
        </span>
        <input
          type='text'
          placeholder='게임명으로 검색...'
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className={styles.boxContainer__input}
        />
      </div>
    </div>
  );
}
