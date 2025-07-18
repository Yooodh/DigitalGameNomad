// package
import { useState, useMemo } from 'react';

// slice
import { Inquiry } from '../types';

const ITEMS_PER_PAGE = 10;
const MAX_VISIBLE_PAGES = 5;

export function useInquiryPagination(filteredInquiries: Inquiry[]) {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const totalPages = useMemo(() => {
    return Math.ceil(filteredInquiries.length / ITEMS_PER_PAGE);
  }, [filteredInquiries.length]);

  const startIndex = useMemo(() => {
    return (currentPage - 1) * ITEMS_PER_PAGE;
  }, [currentPage, ITEMS_PER_PAGE]);

  const currentInquiries = useMemo(() => {
    return filteredInquiries.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredInquiries, startIndex, ITEMS_PER_PAGE]);

  return {
    currentPage,
    setCurrentPage,
    totalPages,
    currentInquiries,
    ITEMS_PER_PAGE,
    MAX_VISIBLE_PAGES,
  };
}
