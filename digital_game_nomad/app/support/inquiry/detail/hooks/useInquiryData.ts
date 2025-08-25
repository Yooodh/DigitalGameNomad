// package
import { useState, useEffect, useMemo } from 'react';

// slice
import { InquiryDetail, InquiryStatus } from '../types';

// layer
import { useInquiriesStore } from '@/shared/stores/useInquiriesStore';
import { useAuthStore } from '@/shared/stores/useAuthStore';

export function useInquiryData({
  searchTerm,
  statusFilter,
}: {
  searchTerm: string;
  statusFilter: InquiryStatus | 'all';
}) {
  const allStoreInquiries = useInquiriesStore((state) => state.inquiries);
  const { userEmail: currentUserEmail } = useAuthStore();

  const [initialLoadComplete, setInitialLoadComplete] =
    useState<boolean>(false);

  const myInquiries = useMemo(() => {
    if (!currentUserEmail) {
      return [];
    }
    return allStoreInquiries
      .filter((inquiry) => inquiry.senderEmail === currentUserEmail)
      .map((inquiry) => ({
        id: inquiry.id,
        title: inquiry.title,
        content: inquiry.text,
        createdAt: inquiry.submittedAt,
        status: inquiry.status,
        senderEmail: inquiry.senderEmail,
        adminReply: inquiry.reply,
        repliedAt: inquiry.replyDate,
      })) as InquiryDetail[];
  }, [allStoreInquiries, currentUserEmail]);

  const filteredInquiries = useMemo(() => {
    return myInquiries.filter((inquiry) => {
      const matchesStatus =
        statusFilter === 'all' || inquiry.status === statusFilter;
      const matchesSearch =
        inquiry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inquiry.id.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [myInquiries, searchTerm, statusFilter]);

  useEffect(() => {
    setInitialLoadComplete(true);
  }, []);

  return { inquiries: myInquiries, filteredInquiries, initialLoadComplete };
}
