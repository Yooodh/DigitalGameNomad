// package
import { useEffect, useCallback } from 'react';

// slice
import { useValidationUtils } from './useValidationUtils';
import { UseEmailVerificationReturn } from '../types';

// layer
import { useResetPhoneStore } from '@/shared/stores/useResetPhoneStore';
import { useAuthStore } from '@/shared/stores/useAuthStore';

export function useEmailVerification(): UseEmailVerificationReturn {
  const { validateEmail } = useValidationUtils();

  const currentUserEmail = useAuthStore((state) => state.userEmail);

  const {
    isEmailCodeSent,
    setIsEmailCodeSent,
    emailCountdown,
    setEmailCountdown,
    setIsLoading,
    setError,
  } = useResetPhoneStore();

  const sendEmailVerificationCode = useCallback(
    async (email: string) => {
      if (!validateEmail(email)) {
        setError('emailError', '올바른 이메일 형식을 입력해주세요');
        return;
      }

      if (email !== currentUserEmail) {
        setError(
          'emailError',
          '현재 로그인한 계정의 이메일과 일치하지 않습니다.'
        );
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
      currentUserEmail,
      setError,
      setIsLoading,
      setIsEmailCodeSent,
      setEmailCountdown,
    ]
  );

  useEffect(() => {
    let emailTimer: NodeJS.Timeout;

    if (isEmailCodeSent && emailCountdown > 0) {
      emailTimer = setInterval(() => {
        setEmailCountdown(emailCountdown - 1);
      }, 1000);
    }
    return () => clearInterval(emailTimer);
  }, [isEmailCodeSent, emailCountdown, setEmailCountdown]);

  const resetEmailVerification = useCallback(() => {
    setIsEmailCodeSent(false);
    setEmailCountdown(0);
    setError('emailCodeError', '');
  }, [setIsEmailCodeSent, setEmailCountdown, setError]);

  return {
    sendEmailVerificationCode,
    resetEmailVerification,
  };
}
