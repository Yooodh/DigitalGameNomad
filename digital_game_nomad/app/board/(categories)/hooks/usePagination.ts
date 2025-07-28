// package
import { useState, useEffect, useMemo } from 'react';

// slice
import { UsePaginationResult } from '../types';

export function usePagination<T>(
  items: T[],
  itemsPerPage: number
): UsePaginationResult<T> {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const totalPages = useMemo(() => {
    return Math.ceil(items.length / itemsPerPage);
  }, [items.length, itemsPerPage]);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    } else if (totalPages === 0 && currentPage !== 1) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  const startIndex = (currentPage - 1) * itemsPerPage;

  const currentItems = useMemo(() => {
    return items.slice(startIndex, startIndex + itemsPerPage);
  }, [items, startIndex, itemsPerPage]);

  return {
    currentPage,
    totalPages,
    startIndex,
    currentItems,
    setCurrentPage,
  };
}
