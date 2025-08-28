// slice
import styles from '../styles/AdminApplications.module.scss';
import { SearchInputProps } from '../types';

// layer
import { Search } from '@/shared/icons';

export default function SearchInput({
  searchTerm,
  onSearchChange,
  placeholder = '검색어를 입력하세요...',
}: SearchInputProps) {
  return (
    <div className={styles.searchContainer}>
      <div className={styles.boxContainer}>
        <span className={styles.boxContainer__icon}>
          <Search />
        </span>
        <input
          type='text'
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className={styles.boxContainer__input}
        />
      </div>
    </div>
  );
}
