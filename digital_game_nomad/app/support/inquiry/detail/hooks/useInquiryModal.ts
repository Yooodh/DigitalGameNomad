// package
import { useState, useCallback } from 'react';

// slice
import { InquiryDetail, UseInquiryModalReturn } from '../types';

export function useInquiryModal(): UseInquiryModalReturn {
  const [selectedInquiry, setSelectedInquiry] = useState<InquiryDetail | null>(
    null
  );
  const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false);

  const openDetailModal = useCallback((inquiry: InquiryDetail) => {
    setSelectedInquiry(inquiry);
    setIsDetailModalOpen(true);
  }, []);

  const closeDetailModal = useCallback(() => {
    setIsDetailModalOpen(false);
    setSelectedInquiry(null);
  }, []);

  return {
    selectedInquiry,
    isDetailModalOpen,
    openDetailModal,
    closeDetailModal,
  };
}
