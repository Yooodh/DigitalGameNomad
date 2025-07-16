export type InquiryStatus = '접수' | '처리중' | '완료';

export type InquiryDetail = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  status: InquiryStatus;
  adminReply?: string;
  repliedAt?: string;
};

export type FiltersProps = {
  searchTerm: string;
  statusFilter: InquiryStatus | 'all';
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onStatusFilterChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

export type ListItemProps = {
  inquiry: InquiryDetail;
  onDeleteInquiry: (id: string) => void;
  onOpenDetailModal: (inquiry: InquiryDetail) => void;
  getStatusClass: (status: InquiryStatus) => string;
};

export type ModalProps = {
  selectedInquiry: InquiryDetail;
  onCloseDetailModal: () => void;
  getStatusClass: (status: InquiryStatus) => string;
};

export type PaginationProps = {
  currentPage: number;
  totalPages: number;
  maxVisiblePages: number;
  totalFilteredInquiries: number;
  startIndex: number;
  inquiriesLength: number;
  onPageChange: (page: number) => void;
};

export type StatsProps = {
  totalInquiriesCount: number;
  processingInquiriesCount: number;
  completedInquiriesCount: number;
};

export type UseFilterPaginationSyncProps = {
  searchTerm: string;
  statusFilter: InquiryStatus | 'all';
  resetPagination: () => void;
};

export type UseInquiryDataProps = {
  searchTerm: string;
  statusFilter: InquiryStatus | 'all';
};

export type UseInquiryDataFetcherReturn = {
  allInquiries: InquiryDetail[];
  setAllInquiries: React.Dispatch<React.SetStateAction<InquiryDetail[]>>;
  initialLoadComplete: boolean;
};

export type UseInquiryDataReturn = {
  inquiries: InquiryDetail[];
  filteredInquiries: InquiryDetail[];
};

export type UseInquiryFiltersProps = {
  onFilterChange: () => void;
};

export type UseInquiryFiltersReturn = {
  searchTerm: string;
  statusFilter: InquiryStatus | 'all';
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleStatusFilterChange: (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => void;
};

export type UseInquiryListProps = {
  searchTerm: string;
  statusFilter: InquiryStatus | 'all';
  itemsPerPage: number;
};

export type UseInquiryManagementReturn = {
  inquiries: InquiryDetail[];
  setInquiries: React.Dispatch<React.SetStateAction<InquiryDetail[]>>;
  handleDeleteInquiry: (id: string) => void;
};

export type UseInquiryModalReturn = {
  selectedInquiry: InquiryDetail | null;
  isDetailModalOpen: boolean;
  openDetailModal: (inquiry: InquiryDetail) => void;
  closeDetailModal: () => void;
};

export type UseInquiryStatsReturn = {
  totalInquiriesCount: number;
  processingInquiriesCount: number;
  completedInquiriesCount: number;
};

export type UseInquiryListReturn = {
  inquiries: InquiryDetail[];
  totalFilteredInquiries: number;
  handleDeleteInquiry: (id: string) => void;
  currentPage: number;
  totalPages: number;
  startIndex: number;
  handlePageChange: (page: number) => void;
  initialLoadComplete: boolean;
  allInquiries: InquiryDetail[];
};

export type UsePaginationProps = {
  totalItems: number;
  itemsPerPage: number;
};

export type UsePaginationReturn = {
  currentPage: number;
  totalPages: number;
  startIndex: number;
  handlePageChange: (page: number) => void;
  resetPagination: () => void;
};

export type DetailPresenterProps = {
  inquiries: InquiryDetail[];
  totalFilteredInquiries: number;
  searchTerm: string;
  statusFilter: InquiryStatus | 'all';
  currentPage: number;
  totalPages: number;
  maxVisiblePages: number;
  selectedInquiry: InquiryDetail | null;
  isDetailModalOpen: boolean;
  totalInquiriesCount: number;
  processingInquiriesCount: number;
  completedInquiriesCount: number;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onStatusFilterChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onDeleteInquiry: (id: string) => void;
  onOpenDetailModal: (inquiry: InquiryDetail) => void;
  onCloseDetailModal: () => void;
  onPageChange: (page: number) => void;
  startIndex: number;
};
