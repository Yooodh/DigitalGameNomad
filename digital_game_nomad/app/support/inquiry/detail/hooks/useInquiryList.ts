// package
import { useCallback, useMemo } from 'react';
import { toast } from 'react-toastify';

// slice
import { usePagination } from './usePagination';
import { useInquiryData } from './useInquiryData';
import { useFilterPaginationSync } from './useFilterPaginationSync';
import { UseInquiryListProps, UseInquiryListReturn } from '../types';

// layer
import { useInquiriesStore } from '@/shared/stores/useInquiriesStore';
import { customConfirm } from '@/shared/utils/customConfirm';

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
    async (id: string) => {
      const confirmed = await customConfirm(
        '문의 삭제',
        '해당 문의 내역을 삭제하시겠습니까?'
      );

      if (confirmed) {
        deleteInquiriesFromStore([id]);
        toast.success('문의 내역이 삭제되었습니다.');
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
