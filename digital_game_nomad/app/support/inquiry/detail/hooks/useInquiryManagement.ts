// package
import { useState, useCallback } from 'react';

// slice
import { InquiryDetail, UseInquiryManagementReturn } from '../types';

export function useInquiryManagement(
  initialInquiries: InquiryDetail[]
): UseInquiryManagementReturn {
  const [inquiries, setInquiries] = useState<InquiryDetail[]>(initialInquiries);

  const handleDeleteInquiry = useCallback((id: string) => {
    if (window.confirm('이 문의를 삭제하시겠습니까?')) {
      setInquiries((prev) => prev.filter((inquiry) => inquiry.id !== id));
    }
  }, []);

  return { inquiries, setInquiries, handleDeleteInquiry };
}
