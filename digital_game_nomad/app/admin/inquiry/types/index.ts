export type InquiryStatus = '접수' | '처리중' | '완료';

export type Inquiry = {
  id: string;
  title: string;
  content: string;
  nickName: string;
  userName: string;
  email: string;
  phone?: string;
  createdAt: string;
  status: InquiryStatus;
  reply?: string;
  replyDate?: string;
};

export type FiltersProps = {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: InquiryStatus | 'all';
  setStatusFilter: (status: InquiryStatus | 'all') => void;
};

export type ModalProps = {
  selectedInquiry: Inquiry;
  isReplyMode: boolean;
  replyContent: string;
  closeDetailModal: () => void;
  updateInquiryStatus: (id: string, newStatus: InquiryStatus) => void;
  setReplyContent: (content: string) => void;
  saveReply: () => void;
  toggleReplyMode: () => void;
  cancelReply: () => void;
  getStatusClass: (status: InquiryStatus) => string;
};

export type ModalActionButtonsProps = {
  selectedInquiry: Inquiry;
  isReplyMode: boolean;
  replyContent: string;
  updateInquiryStatus: (id: string, newStatus: InquiryStatus) => void;
  saveReply: () => void;
  toggleReplyMode: () => void;
  cancelReply: () => void;
  getStatusClass: (status: InquiryStatus) => string;
};

export type ModalBasicInfoProps = {
  selectedInquiry: Inquiry;
  getStatusClass: (status: InquiryStatus) => string;
};

export type ModalContentProps = {
  selectedInquiry: Inquiry;
};

export type ModalHeaderProps = {
  closeDetailModal: () => void;
};

export type ModalReplyProps = {
  selectedInquiry: Inquiry;
  isReplyMode: boolean;
  replyContent: string;
  setReplyContent: (content: string) => void;
};

export type ModalUserInfoProps = {
  selectedInquiry: Inquiry;
};

export type PaginationProps = {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
  MAX_VISIBLE_PAGES: number;
  filteredInquiriesLength: number;
  currentInquiriesLength: number;
  ITEMS_PER_PAGE: number;
};

export type StatsProps = {
  inquiries: Inquiry[];
};

export type TableProps = {
  currentInquiries: Inquiry[];
  openDetailModal: (inquiry: Inquiry) => void;
  updateInquiryStatus: (id: string, newStatus: InquiryStatus) => void;
  getStatusClass: (status: InquiryStatus) => string;
};

export type AdminInquiryPresenterProps = {
  inquiries: Inquiry[];
  filteredInquiries: Inquiry[];
  currentInquiries: Inquiry[];
  selectedInquiry: Inquiry | null;
  statusFilter: InquiryStatus | 'all';
  searchTerm: string;
  currentPage: number;
  totalPages: number;
  isDetailModalOpen: boolean;
  isReplyMode: boolean;
  replyContent: string;
  ITEMS_PER_PAGE: number;
  MAX_VISIBLE_PAGES: number;
  setSearchTerm: (term: string) => void;
  setStatusFilter: (status: InquiryStatus | 'all') => void;
  setCurrentPage: (page: number) => void;
  setReplyContent: (content: string) => void;
  updateInquiryStatus: (id: string, newStatus: InquiryStatus) => void;
  saveReply: () => void;
  toggleReplyMode: () => void;
  cancelReply: () => void;
  openDetailModal: (inquiry: Inquiry) => void;
  closeDetailModal: () => void;
  getStatusClass: (status: InquiryStatus) => string;
  updateSelectedInquiryStatus: (newStatus: InquiryStatus) => void;
};
