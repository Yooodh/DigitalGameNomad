// slice
import Header from '../components/Header';
import Stats from '../components/Stats';
import Filters from '../components/Filters';
import ListItem from '../components/ListItem';
import EmptyState from '../components/EmptyState';
import Pagination from '../components/Pagination';
import Modal from '../components/Modal';
import styles from '../styles/Detail.module.scss';
import { InquiryStatus, DetailPresenterProps } from '../types';

export default function DetailPresenter({
  inquiries,
  totalFilteredInquiries,
  searchTerm,
  statusFilter,
  currentPage,
  totalPages,
  maxVisiblePages,
  selectedInquiry,
  isDetailModalOpen,
  totalInquiriesCount,
  processingInquiriesCount,
  completedInquiriesCount,
  onSearchChange,
  onStatusFilterChange,
  onDeleteInquiry,
  onOpenDetailModal,
  onCloseDetailModal,
  onPageChange,
  startIndex,
}: DetailPresenterProps) {
  const getStatusClass = (status: InquiryStatus) => {
    switch (status) {
      case '접수':
        return styles.statusReceived;
      case '처리중':
        return styles.statusProcessing;
      case '완료':
        return styles.statusCompleted;
      default:
        return '';
    }
  };

  return (
    <div className={styles.detailContainer}>
      <Header />

      <Stats
        totalInquiriesCount={totalInquiriesCount}
        processingInquiriesCount={processingInquiriesCount}
        completedInquiriesCount={completedInquiriesCount}
      />

      <Filters
        searchTerm={searchTerm}
        statusFilter={statusFilter}
        onSearchChange={onSearchChange}
        onStatusFilterChange={onStatusFilterChange}
      />

      <div className={styles.listContainer}>
        {inquiries.length === 0 ? (
          <EmptyState />
        ) : (
          inquiries.map((inquiry) => (
            <ListItem
              key={inquiry.id}
              inquiry={inquiry}
              onDeleteInquiry={onDeleteInquiry}
              onOpenDetailModal={onOpenDetailModal}
              getStatusClass={getStatusClass}
            />
          ))
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        maxVisiblePages={maxVisiblePages}
        totalFilteredInquiries={totalFilteredInquiries}
        startIndex={startIndex}
        inquiriesLength={inquiries.length}
        onPageChange={onPageChange}
      />

      {isDetailModalOpen && selectedInquiry && (
        <Modal
          selectedInquiry={selectedInquiry}
          onCloseDetailModal={onCloseDetailModal}
          getStatusClass={getStatusClass}
        />
      )}
    </div>
  );
}
