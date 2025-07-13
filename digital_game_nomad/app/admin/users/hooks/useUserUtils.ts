// package
import { useCallback } from 'react';

export const useUserUtils = () => {
  const getUserLevelText = useCallback((level: number): string => {
    return level === 2 ? '기업' : '일반';
  }, []);

  const getUserLevelClass = useCallback((level: number): string => {
    return level === 2 ? 'business' : 'general';
  }, []);

  return {
    getUserLevelText,
    getUserLevelClass,
  };
};
