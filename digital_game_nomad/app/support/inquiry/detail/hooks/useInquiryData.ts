// package
import { useState, useEffect, useMemo } from 'react';

// slice
import { sampleInquiries } from '../data';
import {
  InquiryDetail,
  UseInquiryDataProps,
  UseInquiryDataReturn,
} from '../types';

export function useInquiryData({
  searchTerm,
  statusFilter,
}: UseInquiryDataProps): UseInquiryDataReturn {
  const [allInquiries, setAllInquiries] = useState<InquiryDetail[]>([]);

  useEffect(() => {
    setAllInquiries(sampleInquiries);
  }, []);

  const filteredInquiries = useMemo(() => {
    return allInquiries.filter((inquiry) => {
      const matchesStatus =
        statusFilter === 'all' || inquiry.status === statusFilter;
      const matchesSearch =
        inquiry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inquiry.id.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [allInquiries, searchTerm, statusFilter]);

  return { inquiries: allInquiries, filteredInquiries };
}
