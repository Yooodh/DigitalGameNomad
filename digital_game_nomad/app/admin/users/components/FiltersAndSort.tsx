// slice
import FilterSearchInput from './FilterSearchInput';
import FilterLevelSelect from './FilterLevelSelect';
import SortButtons from './SortButtons';
import FilterResetButton from './FilterResetButton';
import ShowDeletedUsersToggle from './ShowDeletedUsersToggle';
import styles from '../styles/Users.module.scss';
import { FiltersAndSortProps } from '../types';

export default function FiltersAndSort({
  searchTerm,
  filterLevel,
  showDeletedUsers,
  sortBy,
  handleSearchChange,
  handleFilterChange,
  handleDeletedToggle,
  handleSortChange,
  handleResetFilters,
}: FiltersAndSortProps) {
  return (
    <div className={styles.filtersContainer}>
      <FilterSearchInput
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
      />

      <div className={styles.filterContainer}>
        <FilterLevelSelect
          filterLevel={filterLevel}
          handleFilterChange={handleFilterChange}
        />

        <SortButtons sortBy={sortBy} handleSortChange={handleSortChange} />

        <FilterResetButton handleResetFilters={handleResetFilters} />

        <ShowDeletedUsersToggle
          showDeletedUsers={showDeletedUsers}
          handleDeletedToggle={handleDeletedToggle}
        />
      </div>
    </div>
  );
}
