// package
import { useState, useCallback } from 'react';

// slice
import { InquiryStatus, UseInquiryFiltersReturn } from '../types';

export function useInquiryFilters(): UseInquiryFiltersReturn {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<InquiryStatus | 'all'>(
    'all'
  );

  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
    },
    []
  );

  const handleStatusFilterChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setStatusFilter(event.target.value as InquiryStatus | 'all');
    },
    []
  );

  return {
    searchTerm,
    statusFilter,
    handleSearchChange,
    handleStatusFilterChange,
  };
}
