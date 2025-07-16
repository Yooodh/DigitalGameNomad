'use client';

// package
import { useCallback } from 'react';

// slice
import DetailPresenter from '../presenters/Detail.presenter';
import { useInquiryFilters } from '../hooks/useInquiryFilters';
import { useInquiryList } from '../hooks/useInquiryList';
import { useInquiryModal } from '../hooks/useInquiryModal';
import { useInquiryStats } from '../hooks/useInquiryStats';

const ITEMS_PER_PAGE = 10;
const MAX_VISIBLE_PAGES = 5;

export default function DetailContainer() {
  const onFilterChange = useCallback(() => {}, []);

  const {
    searchTerm,
    statusFilter,
    handleSearchChange,
    handleStatusFilterChange,
  } = useInquiryFilters({ onFilterChange });

  const {
    inquiries: currentItems,
    totalFilteredInquiries,
    handleDeleteInquiry,
    currentPage,
    totalPages,
    startIndex,
    handlePageChange,
    initialLoadComplete,
    allInquiries: fullInquiryDataForStats,
  } = useInquiryList({
    searchTerm,
    statusFilter,
    itemsPerPage: ITEMS_PER_PAGE,
  });

  const {
    selectedInquiry,
    isDetailModalOpen,
    openDetailModal,
    closeDetailModal,
  } = useInquiryModal();

  const {
    totalInquiriesCount,
    processingInquiriesCount,
    completedInquiriesCount,
  } = useInquiryStats(fullInquiryDataForStats || []);

  if (!initialLoadComplete) {
    return <div>Loading...</div>;
  }

  return (
    <DetailPresenter
      inquiries={currentItems}
      totalFilteredInquiries={totalFilteredInquiries}
      searchTerm={searchTerm}
      statusFilter={statusFilter}
      currentPage={currentPage}
      totalPages={totalPages}
      maxVisiblePages={MAX_VISIBLE_PAGES}
      selectedInquiry={selectedInquiry}
      isDetailModalOpen={isDetailModalOpen}
      totalInquiriesCount={totalInquiriesCount}
      processingInquiriesCount={processingInquiriesCount}
      completedInquiriesCount={completedInquiriesCount}
      onSearchChange={handleSearchChange}
      onStatusFilterChange={handleStatusFilterChange}
      onDeleteInquiry={handleDeleteInquiry}
      onOpenDetailModal={openDetailModal}
      onCloseDetailModal={closeDetailModal}
      onPageChange={handlePageChange}
      startIndex={startIndex}
    />
  );
}
