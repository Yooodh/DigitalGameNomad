// slice
import { InquiryStatus } from '../types';

export const getStatusClass = (status: InquiryStatus): string => {
  switch (status) {
    case '접수':
      return 'statusReceived';
    case '처리중':
      return 'statusProcessing';
    case '완료':
      return 'statusCompleted';
    default:
      return '';
  }
};
