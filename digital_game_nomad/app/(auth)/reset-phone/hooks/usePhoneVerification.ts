// package
import { useState, useEffect, useCallback, useRef } from 'react';

// slice
import { UsePhoneVerificationReturn } from '../types';

export function usePhoneVerification(): UsePhoneVerificationReturn {
  const [isPhoneCodeSent, setIsPhoneCodeSent] = useState<boolean>(false);
  const [phoneCountdown, setPhoneCountdown] = useState<number>(0);

  const phoneCountdownRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const sendPhoneVerificationCode = useCallback(
    async (setLoading: (loading: boolean) => void) => {
      setLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 1500));

      setIsPhoneCodeSent(true);
      setLoading(false);
      setPhoneCountdown(180);
    },
    []
  );

  useEffect(() => {
    if (phoneCountdownRef.current) {
      clearInterval(phoneCountdownRef.current);
    }

    if (isPhoneCodeSent && phoneCountdown > 0) {
      phoneCountdownRef.current = setInterval(() => {
        setPhoneCountdown((prev) => prev - 1);
      }, 1000);
    }

    return () => {
      if (phoneCountdownRef.current) {
        clearInterval(phoneCountdownRef.current);
      }
    };
  }, [isPhoneCodeSent, phoneCountdown]);

  const resetPhoneVerification = useCallback(() => {
    setIsPhoneCodeSent(false);
    setPhoneCountdown(0);

    if (phoneCountdownRef.current) {
      clearInterval(phoneCountdownRef.current);
      phoneCountdownRef.current = undefined;
    }
  }, []);

  return {
    isPhoneCodeSent,
    setIsPhoneCodeSent,
    phoneCountdown,
    setPhoneCountdown,
    sendPhoneVerificationCode,
    resetPhoneVerification,
  };
}
