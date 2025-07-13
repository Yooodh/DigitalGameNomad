// package
import { useState, useCallback, useMemo } from 'react';

// slice
import { UserData, PaginationState } from '../types';

export const useUserPagination = (
  filteredAndSortedUsers: UserData[],
  itemsPerPage: number
): PaginationState & {
  totalPages: number;
  startIndex: number;
  endIndex: number;
  currentUsers: UserData[];
  totalFilteredAndSortedUsersCount: number;
  handlePageChange: (page: number) => void;
  generatePageNumbers: () => (number | string)[];
} => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const totalFilteredAndSortedUsersCount = useMemo(
    () => filteredAndSortedUsers.length,
    [filteredAndSortedUsers]
  );

  const totalPages = Math.ceil(totalFilteredAndSortedUsersCount / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentUsers = useMemo(() => {
    return filteredAndSortedUsers.slice(startIndex, endIndex);
  }, [filteredAndSortedUsers, startIndex, endIndex]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const generatePageNumbers = useCallback(() => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      let startPage = Math.max(
        1,
        currentPage - Math.floor(maxVisiblePages / 2)
      );
      let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

      if (endPage === totalPages && endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, totalPages - maxVisiblePages + 1);
      }

      if (startPage > 1) {
        pages.push(1);
        if (startPage > 2) {
          pages.push('...');
        }
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pages.push('...');
        }
        pages.push(totalPages);
      }
    }
    return pages;
  }, [currentPage, totalPages]);

  return {
    currentPage,
    itemsPerPage,
    setCurrentPage,
    totalPages,
    startIndex,
    endIndex,
    currentUsers,
    totalFilteredAndSortedUsersCount,
    handlePageChange,
    generatePageNumbers,
  };
};
