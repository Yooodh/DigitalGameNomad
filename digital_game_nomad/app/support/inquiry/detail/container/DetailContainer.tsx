'use client';

// slice
import LoadingState from '../components/LoadingState';
import DetailPresenter from '../presenter/DetailPresenter';
import { useInquiryFilters } from '../hooks/useInquiryFilters';
import { useInquiryList } from '../hooks/useInquiryList';
import { useInquiryModal } from '../hooks/useInquiryModal';
import { useInquiryStats } from '../hooks/useInquiryStats';
import { ITEMS_PER_PAGE, MAX_VISIBLE_PAGES } from '../constants';

// layer
import { Loading } from '@/features/loading';

export default function DetailContainer() {
  const {
    searchTerm,
    statusFilter,
    handleSearchChange,
    handleStatusFilterChange,
  } = useInquiryFilters();

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
    return <LoadingState />;
  }

  return (
    <Loading message='문의 내역 불러오는 중...'>
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
    </Loading>
  );
}
