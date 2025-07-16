// package
import { useState, useCallback } from 'react';

// slice
import {
  InquiryStatus,
  UseInquiryFiltersProps,
  UseInquiryFiltersReturn,
} from '../types';

export function useInquiryFilters({
  onFilterChange,
}: UseInquiryFiltersProps): UseInquiryFiltersReturn {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<InquiryStatus | 'all'>(
    'all'
  );

  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
      onFilterChange();
    },
    [onFilterChange]
  );

  const handleStatusFilterChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setStatusFilter(event.target.value as InquiryStatus | 'all');
      onFilterChange();
    },
    [onFilterChange]
  );

  return {
    searchTerm,
    statusFilter,
    handleSearchChange,
    handleStatusFilterChange,
  };
}
