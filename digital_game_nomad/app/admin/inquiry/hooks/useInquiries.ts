// package
import { useState, useEffect, useCallback } from 'react';

// slice
import { Inquiry, InquiryStatus } from '../types';
import { sampleInquiries } from '../data';

export function useInquiries() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);

  useEffect(() => {
    setInquiries(sampleInquiries);
  }, []);

  const updateInquiryStatus = useCallback(
    (id: string, newStatus: InquiryStatus) => {
      setInquiries((prev) =>
        prev.map((inquiry) =>
          inquiry.id === id ? { ...inquiry, status: newStatus } : inquiry
        )
      );
    },
    []
  );

  const saveReplyToInquiry = useCallback((id: string, replyContent: string) => {
    const currentDate = new Date().toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });

    setInquiries((prev) =>
      prev.map((inquiry) =>
        inquiry.id === id
          ? {
              ...inquiry,
              reply: replyContent,
              replyDate: currentDate,
              status: '완료' as InquiryStatus,
            }
          : inquiry
      )
    );
  }, []);

  return {
    inquiries,
    setInquiries,
    updateInquiryStatus,
    saveReplyToInquiry,
  };
}
