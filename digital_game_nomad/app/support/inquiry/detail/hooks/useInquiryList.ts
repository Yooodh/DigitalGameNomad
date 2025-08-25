// package
import { useCallback, useMemo } from 'react';

// slice
import { usePagination } from './usePagination';
import { useInquiryData } from './useInquiryData';
import { useFilterPaginationSync } from './useFilterPaginationSync';
import { UseInquiryListProps, UseInquiryListReturn } from '../types';

// layer
import { useInquiriesStore } from '@/shared/stores/useInquiriesStore';

export function useInquiryList({
  searchTerm,
  statusFilter,
  itemsPerPage,
}: UseInquiryListProps): UseInquiryListReturn {
  const {
    inquiries: allMyInquiries,
    filteredInquiries,
    initialLoadComplete,
  } = useInquiryData({ searchTerm, statusFilter });

  const deleteInquiriesFromStore = useInquiriesStore(
    (state) => state.deleteInquiries
  );

  const handleDeleteInquiry = useCallback(
    (id: string) => {
      if (window.confirm('이 문의를 삭제하시겠습니까?')) {
        deleteInquiriesFromStore([id]);
      }
    },
    [deleteInquiriesFromStore]
  );

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
    allInquiries: allMyInquiries,
  };
}
