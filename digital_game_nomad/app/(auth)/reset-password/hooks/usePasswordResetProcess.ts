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
}: UsePasswordResetProcessProps) {
  const [step, setStep] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);

      if (step === 1) {
        const isCurrentPasswordCorrect =
          formData.currentPassword === 'qwer1234!';

        if (!isCurrentPasswordCorrect) {
          setCurrentPasswordError('현재 비밀번호가 올바르지 않습니다');
          setIsLoading(false);
          return;
        }

        setTimeout(() => {
          setIsLoading(false);
          setStep(2);
        }, 1500);
      } else if (step === 2) {
        if (!validatePassword(formData.newPassword)) {
          setPasswordError(
            '8자 이상, 영문 소문자, 숫자, 특수문자를 포함해주세요'
          );
          setIsLoading(false);
          return;
        }
        if (formData.newPassword !== formData.confirmPassword) {
          setConfirmPasswordError('비밀번호가 일치하지 않습니다');
          setIsLoading(false);
          return;
        }

        setTimeout(() => {
          setIsLoading(false);
          setStep(3);
        }, 1500);
      }
    },
    [
      step,
      formData.currentPassword,
      formData.newPassword,
      formData.confirmPassword,
      validatePassword,
      setPasswordError,
      setConfirmPasswordError,
      setCurrentPasswordError,
    ]
  );

  return {
    step,
    setStep,
    isLoading,
    handleSubmit,
  };
}
