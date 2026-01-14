// package
import { useEffect, useCallback } from 'react';

// slice
import { UseEmailVerificationReturn } from '../types';
import { useValidationUtils } from './useValidationUtils';

// layer
import { useForgotPasswordStore } from '@/shared/stores/useForgotPasswordStore';

export function useEmailVerification(): UseEmailVerificationReturn {
  const { validateEmail } = useValidationUtils();
  const {
    isEmailCodeSent,
    setIsEmailCodeSent,
    emailCountdown,
    setEmailCountdown,
    setIsLoading,
    setError,
  } = useForgotPasswordStore();

  const sendEmailVerificationCode = useCallback(
    async (email: string) => {
      if (!validateEmail(email)) {
        setError('emailError', '올바른 이메일 형식을 입력해 주세요.');
        return;
      }

      setError('emailError', '');
      setIsLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 1500));

      setIsEmailCodeSent(true);
      setIsLoading(false);
      setEmailCountdown(300);
    },
    [
      validateEmail,
      setError,
      setIsLoading,
      setIsEmailCodeSent,
      setEmailCountdown,
    ]
  );

  useEffect(() => {
    if (isEmailCodeSent && emailCountdown > 0) {
      const emailTimer = setInterval(() => {
        setEmailCountdown(emailCountdown - 1);
      }, 1000);

      return () => clearInterval(emailTimer);
    }
    return () => {};
  }, [isEmailCodeSent, emailCountdown, setEmailCountdown]);

  const resetEmailVerification = useCallback(() => {
    setIsEmailCodeSent(false);
    setEmailCountdown(0);
    setError('emailCodeError', '');
  }, [setIsEmailCodeSent, setEmailCountdown, setError]);

  return {
    isEmailCodeSent,
    emailCountdown,
    sendEmailVerificationCode,
    resetEmailVerification,
  };
}
