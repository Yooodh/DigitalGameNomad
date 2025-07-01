// package
import { useState, useEffect, useCallback } from 'react';

// slice
import { useValidationUtils } from './useValidationUtils';
import { UseEmailVerificationReturn } from '../types';

export function useEmailVerification(): UseEmailVerificationReturn {
  const { validateEmail } = useValidationUtils();
  const [isEmailCodeSent, setIsEmailCodeSent] = useState<boolean>(false);
  const [emailCountdown, setEmailCountdown] = useState<number>(0);

  const sendEmailVerificationCode = useCallback(
    async (
      email: string,
      setLoading: (loading: boolean) => void,
      setEmailError: (error: string) => void
    ) => {
      if (!validateEmail(email)) {
        setEmailError('올바른 이메일 형식을 입력해주세요');
        return;
      }

      setEmailError('');
      setLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 1500));

      setIsEmailCodeSent(true);
      setLoading(false);
      setEmailCountdown(300);
    },
    [validateEmail]
  );

  useEffect(() => {
    let emailTimer: NodeJS.Timeout;
    if (isEmailCodeSent && emailCountdown > 0) {
      emailTimer = setInterval(() => {
        setEmailCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(emailTimer);
  }, [isEmailCodeSent, emailCountdown]);

  const resetEmailVerification = useCallback(() => {
    setIsEmailCodeSent(false);
    setEmailCountdown(0);
  }, []);

  return {
    isEmailCodeSent,
    setIsEmailCodeSent,
    emailCountdown,
    setEmailCountdown,
    sendEmailVerificationCode,
    resetEmailVerification,
  };
}
