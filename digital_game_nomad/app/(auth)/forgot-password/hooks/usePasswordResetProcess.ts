// package
import { useState, useCallback } from 'react';

// slice
import { UsePasswordResetProcessProps } from '../types';

export function usePasswordResetProcess({
  formData,
  validatePassword,
  setPasswordError,
  setConfirmPasswordError,
  setCurrentPasswordError,
  setEmailCodeError,
  validateVerificationCode,
}: UsePasswordResetProcessProps) {
  const [step, setStep] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);

      if (step === 1) {
        if (!validateVerificationCode(formData.emailVerificationCode)) {
          setEmailCodeError('유효하지 않은 인증번호입니다.');
          setIsLoading(false);
          return;
        }

        console.log('이메일 인증 코드 검증 완료 (서버 통신 시뮬레이션)');
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setStep(2);
        setIsLoading(false);
      } else if (step === 2) {
        const passwordValid = validatePassword(formData.newPassword);
        const passwordsMatch =
          formData.newPassword === formData.confirmPassword;

        if (!passwordValid) {
          setPasswordError(
            '8자 이상, 영문 소문자, 숫자, 특수문자를 포함해주세요'
          );
        } else {
          setPasswordError('');
        }

        if (!passwordsMatch) {
          setConfirmPasswordError('비밀번호가 일치하지 않습니다.');
        } else {
          setConfirmPasswordError('');
        }

        if (!passwordValid || !passwordsMatch) {
          setIsLoading(false);
          return;
        }

        console.log('새 비밀번호 변경 처리 중...');
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setStep(3);
        setIsLoading(false);
      } else if (step === 3) {
        setIsLoading(false);
      }
    },
    [
      step,
      formData.emailVerificationCode,
      formData.newPassword,
      formData.confirmPassword,
      validateVerificationCode,
      validatePassword,
      setEmailCodeError,
      setPasswordError,
      setConfirmPasswordError,
      setCurrentPasswordError,
    ]
  );

  return {
    step,
    setStep,
    isLoading,
    setIsLoading,
    handleSubmit,
  };
}
