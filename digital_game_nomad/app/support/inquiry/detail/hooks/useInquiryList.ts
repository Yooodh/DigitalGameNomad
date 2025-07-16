// package
import { useCallback, useMemo } from 'react';

// slice
import { usePagination } from './usePagination';
import { useInquiryDataFetcher } from './useInquiryDataFetcher';
import { useFilterPaginationSync } from './useFilterPaginationSync';
import { UseInquiryListProps, UseInquiryListReturn } from '../types';

export function useInquiryList({
  searchTerm,
  statusFilter,
  itemsPerPage,
}: UseInquiryListProps): UseInquiryListReturn {
  const { allInquiries, setAllInquiries, initialLoadComplete } =
    useInquiryDataFetcher();

  const handleDeleteInquiry = useCallback(
    (id: string) => {
      if (window.confirm('이 문의를 삭제하시겠습니까?')) {
        setAllInquiries((prev) => prev.filter((inquiry) => inquiry.id !== id));
      }
    },
    [setAllInquiries]
  );

  const filteredInquiries = useMemo(() => {
    return allInquiries.filter((inquiry) => {
      const matchesStatus =
        statusFilter === 'all' || inquiry.status === statusFilter;
      const matchesSearch =
        inquiry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inquiry.id.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [allInquiries, searchTerm, statusFilter]);

  const {
    currentPage,
    totalPages,
    startIndex,
    handlePageChange,
    resetPagination,
  } = usePagination({
    totalItems: filteredInquiries.length,
    itemsPerPage: itemsPerPage,
  });

  useFilterPaginationSync({ searchTerm, statusFilter, resetPagination });

  const currentItems = useMemo(() => {
    return filteredInquiries.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredInquiries, startIndex, itemsPerPage]);

  return {
    inquiries: currentItems,
    totalFilteredInquiries: filteredInquiries.length,
    handleDeleteInquiry,
    currentPage,
    totalPages,
    startIndex,
    handlePageChange,
    initialLoadComplete,
    allInquiries,
  };
}
