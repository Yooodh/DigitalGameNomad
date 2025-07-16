// package
import { useState, useCallback, useMemo } from 'react';

// slice
import { UsePaginationProps, UsePaginationReturn } from '../types';

export function usePagination({
  totalItems,
  itemsPerPage,
}: UsePaginationProps): UsePaginationReturn {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const totalPages = useMemo(
    () => Math.ceil(totalItems / itemsPerPage),
    [totalItems, itemsPerPage]
  );

  const startIndex = useMemo(
    () => (currentPage - 1) * itemsPerPage,
    [currentPage, itemsPerPage]
  );

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const resetPagination = useCallback(() => {
    setCurrentPage(1);
  }, []);

  return {
    currentPage,
    totalPages,
    startIndex,
    handlePageChange,
    resetPagination,
  };
}
