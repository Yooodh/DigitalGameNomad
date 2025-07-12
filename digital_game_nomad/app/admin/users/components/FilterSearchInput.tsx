// slice
import styles from '../styles/Users.module.scss';
import { FilterSearchInputProps } from '../types';

// layer
import { Search } from '@/shared/icons';

export default function FilterSearchInput({
  searchTerm,
  handleSearchChange,
}: FilterSearchInputProps) {
  return (
    <div className={styles.searchContainer}>
      <div className={styles.boxContainer}>
        <span className={styles.boxContainer__icon}>
          <Search />
        </span>
        <input
          type='text'
          placeholder='이름, 닉네임, 이메일로 검색...'
          value={searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
          className={styles.boxContainer__input}
        />
      </div>
    </div>
  );
}
