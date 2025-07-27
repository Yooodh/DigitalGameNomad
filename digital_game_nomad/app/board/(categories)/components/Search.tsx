// slice
import styles from '../styles/BoardCategory.module.scss';
import { SearchProps } from '../types';

// layer
import { Search as SearchIcon } from '@/shared/icons';

export default function Search({
  filterOption,
  inputValue,
  onFilterChange,
  onInputChange,
  onSearch,
  searchOptions = ['제목', '내용', '닉네임', '제목+내용'],
}: SearchProps) {
  return (
    <div className={styles.searchContainer}>
      <select
        value={filterOption}
        onChange={onFilterChange}
        className={styles.searchContainer__select}
      >
        {searchOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <input
        type='text'
        placeholder='검색어를 입력하세요'
        value={inputValue}
        onChange={onInputChange}
        className={styles.searchContainer__input}
        onKeyDown={(e) => {
          if (e.key === 'Enter') onSearch();
        }}
      />
      <button
        onClick={onSearch}
        className={styles.searchContainer__btn}
        aria-label='검색'
      >
        <SearchIcon />
      </button>
    </div>
  );
}
