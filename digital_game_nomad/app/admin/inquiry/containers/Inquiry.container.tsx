'use client';

// slice
import AdminInquiryPresenter from '../presenters/Inquiry.presenter';
import { useInquiries } from '../hooks/useInquiries';
import { useInquiryFilters } from '../hooks/useInquiryFilters';
import { useInquiryPagination } from '../hooks/useInquiryPagination';
import { useInquiryDetail } from '../hooks/useInquiryDetail';
import { getStatusClass } from '../utils';

export default function AdminInquiryContainer() {
  const { inquiries, updateInquiryStatus, saveReplyToInquiry } = useInquiries();
  const {
    statusFilter,
    setStatusFilter,
    searchTerm,
    setSearchTerm,
    filteredInquiries,
  } = useInquiryFilters(inquiries);

  const {
    currentPage,
    setCurrentPage,
    totalPages,
    currentInquiries,
    ITEMS_PER_PAGE,
    MAX_VISIBLE_PAGES,
  } = useInquiryPagination(filteredInquiries);

  const {
    selectedInquiry,
    isDetailModalOpen,
    isReplyMode,
    replyContent,
    setReplyContent,
    openDetailModal,
    closeDetailModal,
    toggleReplyMode,
    saveReply,
    cancelReply,
    updateSelectedInquiryStatus,
  } = useInquiryDetail(saveReplyToInquiry, updateInquiryStatus);

  return (
    <AdminInquiryPresenter
      inquiries={inquiries}
      filteredInquiries={filteredInquiries}
      currentInquiries={currentInquiries}
      selectedInquiry={selectedInquiry}
      statusFilter={statusFilter}
      searchTerm={searchTerm}
      currentPage={currentPage}
      totalPages={totalPages}
      isDetailModalOpen={isDetailModalOpen}
      isReplyMode={isReplyMode}
      replyContent={replyContent}
      ITEMS_PER_PAGE={ITEMS_PER_PAGE}
      MAX_VISIBLE_PAGES={MAX_VISIBLE_PAGES}
      setSearchTerm={setSearchTerm}
      setStatusFilter={setStatusFilter}
      setCurrentPage={setCurrentPage}
      setReplyContent={setReplyContent}
      updateInquiryStatus={updateInquiryStatus}
      saveReply={saveReply}
      toggleReplyMode={toggleReplyMode}
      cancelReply={cancelReply}
      openDetailModal={openDetailModal}
      closeDetailModal={closeDetailModal}
      getStatusClass={getStatusClass}
      updateSelectedInquiryStatus={updateSelectedInquiryStatus}
    />
  );
}
