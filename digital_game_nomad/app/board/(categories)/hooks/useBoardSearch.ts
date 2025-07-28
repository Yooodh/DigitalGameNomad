// package
import { useState, ChangeEvent, useCallback } from 'react';

// slice
import { UseBoardSearchProps } from '../types';
import { INITIAL_SEARCH_FILTER_OPTION } from '../constants';

export function useBoardSearch({
  onSearch,
  onFilterChange,
  onResetPage,
}: UseBoardSearchProps) {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterOption, setFilterOption] = useState<string>(
    INITIAL_SEARCH_FILTER_OPTION
  );
  const [inputValue, setInputValue] = useState<string>('');

  const handleFilterChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const newFilterOption = e.target.value;
      setFilterOption(newFilterOption);
      onFilterChange(newFilterOption);
      onResetPage();
    },
    [onFilterChange, onResetPage]
  );

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }, []);

  const handleSearch = useCallback(() => {
    setSearchTerm(inputValue);
    onSearch(inputValue);
    onResetPage();
  }, [inputValue, onSearch, onResetPage]);

  const resetSearchAndFilter = useCallback(() => {
    setSearchTerm('');
    setInputValue('');
    setFilterOption(INITIAL_SEARCH_FILTER_OPTION);
    onResetPage();
  }, [onResetPage]);

  return {
    searchTerm,
    filterOption,
    inputValue,
    setSearchTerm,
    setFilterOption,
    setInputValue,
    handleFilterChange,
    handleInputChange,
    handleSearch,
    resetSearchAndFilter,
  };
}
