// slice
import Stats from '../components/Stats';
import Filters from '../components/Filters';
import Table from '../components/Table';
import Pagination from '../components/Pagination';
import Modal from '../components/Modal';
import styles from '../styles/AdminInquiry.module.scss';
import { AdminInquiryPresenterProps } from '../types';

export default function AdminInquiryPresenter({
  inquiries,
  filteredInquiries,
  currentInquiries,
  selectedInquiry,
  statusFilter,
  searchTerm,
  currentPage,
  totalPages,
  isDetailModalOpen,
  isReplyMode,
  replyContent,
  ITEMS_PER_PAGE,
  MAX_VISIBLE_PAGES,
  setSearchTerm,
  setStatusFilter,
  setCurrentPage,
  setReplyContent,
  updateInquiryStatus,
  updateSelectedInquiryStatus,
  saveReply,
  toggleReplyMode,
  cancelReply,
  openDetailModal,
  closeDetailModal,
  getStatusClass,
}: AdminInquiryPresenterProps) {
  return (
    <div className={styles.container}>
      <Stats inquiries={inquiries} />

      <Filters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      <div className={styles.sectionContainer}>
        <Table
          currentInquiries={currentInquiries}
          openDetailModal={openDetailModal}
          updateInquiryStatus={updateInquiryStatus}
          getStatusClass={getStatusClass}
        />
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          MAX_VISIBLE_PAGES={MAX_VISIBLE_PAGES}
          filteredInquiriesLength={filteredInquiries.length}
          currentInquiriesLength={currentInquiries.length}
          ITEMS_PER_PAGE={ITEMS_PER_PAGE}
        />
      </div>

      {isDetailModalOpen && selectedInquiry && (
        <Modal
          selectedInquiry={selectedInquiry}
          isReplyMode={isReplyMode}
          replyContent={replyContent}
          closeDetailModal={closeDetailModal}
          updateInquiryStatus={updateInquiryStatus}
          updateSelectedInquiryStatus={updateSelectedInquiryStatus}
          setReplyContent={setReplyContent}
          saveReply={saveReply}
          toggleReplyMode={toggleReplyMode}
          cancelReply={cancelReply}
          getStatusClass={getStatusClass}
        />
      )}
    </div>
  );
}
