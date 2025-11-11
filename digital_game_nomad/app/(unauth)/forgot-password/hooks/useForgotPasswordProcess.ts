// package
import { useCallback } from 'react';

// slice
import { UseForgotPasswordProcessProps } from '../types';

// layer
import { useForgotPasswordStore } from '@/shared/stores/useForgotPasswordStore';
import { useRegisteredUsersStore } from '@/shared/stores/useRegisteredUsersStore';

export function useForgotPasswordProcess({
  validatePassword,
  validateVerificationCode,
}: UseForgotPasswordProcessProps) {
  const {
    step,
    isLoading,
    formData,
    emailError,
    emailCodeError,
    passwordError,
    confirmPasswordError,
    setStep,
    setIsLoading,
    setError,
    setVerifiedEmail,
    verifiedEmail,
    setFormData,
    setIsEmailCodeSent,
    setEmailCountdown,
  } = useForgotPasswordStore();

  const updateUserProfileInStore = useRegisteredUsersStore(
    (state) => state.updateUserProfile
  );
  const registeredUsers = useRegisteredUsersStore((state) => state.users);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);

      if (step === 1) {
        if (emailError || emailCodeError) {
          setIsLoading(false);
          return;
        }

        const correctCode = '123456';
        if (formData.emailVerificationCode !== correctCode) {
          setError('emailCodeError', '인증번호가 일치하지 않습니다.');
          setIsLoading(false);
          return;
        }

        const userExists = registeredUsers.some(
          (user) => user.email === formData.email
        );
        if (!userExists) {
          setError('emailError', '등록되지 않은 이메일 주소입니다.');
          setIsLoading(false);
          return;
        }

        await new Promise((resolve) => setTimeout(resolve, 1000));

        setVerifiedEmail(formData.email);
        setStep(2);
        setIsLoading(false);
      } else if (step === 2) {
        if (passwordError || confirmPasswordError) {
          setIsLoading(false);
          return;
        }

        if (verifiedEmail) {
          try {
            await new Promise((resolve) => setTimeout(resolve, 1500));

            updateUserProfileInStore(verifiedEmail, {
              password: formData.newPassword,
            });

            setStep(3);
          } catch (error) {
            console.error('비밀번호 업데이트 중 오류 발생:', error);
            setError(
              'passwordError',
              '비밀번호 업데이트에 실패했습니다. 다시 시도해주세요.'
            );
          } finally {
            setIsLoading(false);
          }
        } else {
          console.warn(
            '인증된 이메일이 없어 비밀번호를 업데이트할 수 없습니다.'
          );
          setError('passwordError', '이메일 인증이 필요합니다.');
          setIsLoading(false);
        }
      }
    },
    [
      step,
      formData,
      validateVerificationCode,
      validatePassword,
      setStep,
      setIsLoading,
      setError,
      setVerifiedEmail,
      verifiedEmail,
      updateUserProfileInStore,
      registeredUsers,
      emailError,
      emailCodeError,
      passwordError,
      confirmPasswordError,
    ]
  );

  const handlePrev = useCallback(() => {
    if (step > 1) {
      setStep(step - 1);
      setError('emailError', '');
      setError('emailCodeError', '');
      setError('passwordError', '');
      setError('confirmPasswordError', '');
      if (step === 2) {
        setVerifiedEmail(null);
        setIsEmailCodeSent(false);
        setEmailCountdown(0);
        setFormData('emailVerificationCode', '');
        setFormData('newPassword', '');
        setFormData('confirmPassword', '');
      }
    }
  }, [
    step,
    setStep,
    setError,
    setVerifiedEmail,
    setIsEmailCodeSent,
    setEmailCountdown,
    setFormData,
  ]);

  return {
    step,
    isLoading,
    handleSubmit,
    handlePrev,
  };
}
