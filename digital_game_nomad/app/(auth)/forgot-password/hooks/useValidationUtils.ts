// package
import { useCallback } from 'react';

export function useValidationUtils() {
  const validateEmail = useCallback((email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }, []);

  const validateVerificationCode = useCallback((code: string): boolean => {
    return /^\d{6}$/.test(code);
  }, []);

  const getVerificationCodeError = useCallback((code: string): string => {
    if (!code) return '';
    if (!/^\d+$/.test(code)) return '숫자만 입력 가능합니다';
    if (code.length < 6) return '6자리 숫자를 입력해주세요';
    return '';
  }, []);

  const formatPhoneNumber = useCallback((value: string): string => {
    const numbers = value.replace(/[^\d]/g, '');
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 7)
      return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(
      7,
      11
    )}`;
  }, []);

  const formatTime = useCallback((seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }, []);

  return {
    validateEmail,
    validateVerificationCode,
    getVerificationCodeError,
    formatPhoneNumber,
    formatTime,
  };
}
