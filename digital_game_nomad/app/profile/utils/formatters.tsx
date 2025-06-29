// package
import { useCallback } from 'react';

// layer
import { User, Building } from '@/shared/icons';

export function useFormatters() {
  const getGradeText = useCallback((grade: number) => {
    return grade === 2 ? '기업' : '일반';
  }, []);

  const formatDate = useCallback((dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }, []);

  const getGradeIcon = useCallback((grade: number): React.ReactNode => {
    return grade === 2 ? <Building /> : <User />;
  }, []);

  return {
    getGradeText,
    formatDate,
    getGradeIcon,
  };
}
