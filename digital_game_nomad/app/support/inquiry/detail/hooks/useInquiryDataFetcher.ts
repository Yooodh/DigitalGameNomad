// package
import { useState, useEffect } from 'react';

// slice
import { sampleInquiries } from '../data';
import { InquiryDetail, UseInquiryDataFetcherReturn } from '../types';

export function useInquiryDataFetcher(): UseInquiryDataFetcherReturn {
  const [allInquiries, setAllInquiries] = useState<InquiryDetail[]>([]);
  const [initialLoadComplete, setInitialLoadComplete] =
    useState<boolean>(false);

  useEffect(() => {
    setAllInquiries(sampleInquiries);
    setInitialLoadComplete(true);
  }, []);

  return { allInquiries, setAllInquiries, initialLoadComplete };
}
