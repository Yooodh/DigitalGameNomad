// package
import { useState, useMemo } from 'react';

// slice
import { Inquiry, InquiryStatus } from '../types';

export function useInquiryFilters(inquiries: Inquiry[]) {
  const [statusFilter, setStatusFilter] = useState<InquiryStatus | 'all'>(
    'all'
  );
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredInquiries = useMemo(() => {
    return inquiries.filter((inquiry) => {
      const matchesStatus =
        statusFilter === 'all' || inquiry.status === statusFilter;

      const matchesSearch =
        inquiry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (inquiry.userName?.toLowerCase() ?? '').includes(
          searchTerm.toLowerCase()
        ) ||
        inquiry.id.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesStatus && matchesSearch;
    });
  }, [inquiries, statusFilter, searchTerm]);

  return {
    statusFilter,
    setStatusFilter,
    searchTerm,
    setSearchTerm,
    filteredInquiries,
  };
}
