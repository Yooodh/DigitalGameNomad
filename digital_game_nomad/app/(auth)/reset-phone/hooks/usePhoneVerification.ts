// package
import { useEffect, useCallback, useRef } from 'react';

// slice
import { UsePhoneVerificationReturn } from '../types';

// layer
import { useResetPhoneStore } from '@/shared/stores/useResetPhoneStore';

export function usePhoneVerification(): UsePhoneVerificationReturn {
  const {
    isPhoneCodeSent,
    setIsPhoneCodeSent,
    phoneCountdown,
    setPhoneCountdown,
    setIsLoading,
    setError,
  } = useResetPhoneStore();

  const phoneCountdownRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const sendPhoneVerificationCode = useCallback(async () => {
    setIsLoading(true);
    setError('phoneCodeError', '');

    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsPhoneCodeSent(true);
    setIsLoading(false);
    setPhoneCountdown(180);
  }, [setIsLoading, setIsPhoneCodeSent, setPhoneCountdown, setError]);

  useEffect(() => {
    if (phoneCountdownRef.current) {
      clearInterval(phoneCountdownRef.current);
    }

    if (isPhoneCodeSent && phoneCountdown > 0) {
      phoneCountdownRef.current = setInterval(() => {
        setPhoneCountdown(phoneCountdown - 1);
      }, 1000);
    } else if (phoneCountdown === 0 && isPhoneCodeSent) {
    }

    return () => {
      if (phoneCountdownRef.current) {
        clearInterval(phoneCountdownRef.current);
      }
    };
  }, [isPhoneCodeSent, phoneCountdown, setPhoneCountdown, setError]);

  const resetPhoneVerification = useCallback(() => {
    setIsPhoneCodeSent(false);
    setPhoneCountdown(0);
    setError('phoneCodeError', '');

    if (phoneCountdownRef.current) {
      clearInterval(phoneCountdownRef.current);
      phoneCountdownRef.current = undefined;
    }
  }, [setIsPhoneCodeSent, setPhoneCountdown, setError]);

  return {
    sendPhoneVerificationCode,
    resetPhoneVerification,
  };
}
