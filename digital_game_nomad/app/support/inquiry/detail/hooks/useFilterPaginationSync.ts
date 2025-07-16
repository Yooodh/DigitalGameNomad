// package
import { useEffect } from 'react';

// slice
import { UseFilterPaginationSyncProps } from '../types';

export function useFilterPaginationSync({
  searchTerm,
  statusFilter,
  resetPagination,
}: UseFilterPaginationSyncProps) {
  useEffect(() => {
    resetPagination();
  }, [searchTerm, statusFilter, resetPagination]);
}
