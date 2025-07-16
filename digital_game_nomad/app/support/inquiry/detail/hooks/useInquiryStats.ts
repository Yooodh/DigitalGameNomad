// package
import { useMemo } from 'react';

// slice
import { InquiryDetail, UseInquiryStatsReturn } from '../types';

export function useInquiryStats(
  allInquiries: InquiryDetail[]
): UseInquiryStatsReturn {
  const totalInquiriesCount = useMemo(
    () => allInquiries.length,
    [allInquiries]
  );

  const processingInquiriesCount = useMemo(
    () => allInquiries.filter((i) => i.status === '처리중').length,
    [allInquiries]
  );

  const completedInquiriesCount = useMemo(
    () => allInquiries.filter((i) => i.status === '완료').length,
    [allInquiries]
  );

  return {
    totalInquiriesCount,
    processingInquiriesCount,
    completedInquiriesCount,
  };
}
