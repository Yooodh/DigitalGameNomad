// package
import { useCallback } from 'react';
import { useRouter } from 'next/navigation';

// slice
import { useValidationUtils } from './useValidationUtils';
import { UseStepNavigationReturn } from '../types';

// layer
import { useResetPhoneStore } from '@/shared/stores/useResetPhoneStore';
import { useRegisteredUsersStore } from '@/shared/stores/useRegisteredUsersStore';
import { useAuthStore } from '@/shared/stores/useAuthStore';

export function useStepNavigation(): UseStepNavigationReturn {
  const router = useRouter();
  const {
    step,
    isLoading,
    formData,
    verifiedEmail,
    setStep,
    setIsLoading,
    setError,
    setVerifiedEmail,
    setVerifiedPersonalInfo,
    resetForm,
    setIsEmailCodeSent,
    setEmailCountdown,
    setIsPhoneCodeSent,
    setPhoneCountdown,
    setFormData: setStoreFormData,
  } = useResetPhoneStore();

  const registeredUsers = useRegisteredUsersStore((state) => state.users);
  const updateUserProfileInStore = useRegisteredUsersStore(
    (state) => state.updateUserProfile
  );
  const { validateVerificationCode } = useValidationUtils();

  const currentUserEmail = useAuthStore((state) => state.userEmail);

  const handleCompletionAndRedirect = useCallback(() => {
    resetForm();
    router.push('/profile');
  }, [router, resetForm]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);

      setError('emailError', '');
      setError('emailCodeError', '');
      setError('phoneCodeError', '');
      setError('personalInfoError', '');

      if (step === 1) {
        if (formData.email !== currentUserEmail) {
          setError(
            'emailError',
            '현재 로그인한 계정의 이메일과 일치하지 않습니다.'
          );
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

        const correctCode = '123456';
        if (formData.emailVerificationCode !== correctCode) {
          setError('emailCodeError', '인증번호가 일치하지 않습니다.');
          setIsLoading(false);
          return;
        }

        setVerifiedEmail(formData.email);
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsLoading(false);
        setStep(2);
      } else if (step === 2) {
        const userToVerify = registeredUsers.find(
          (user) => user.email === verifiedEmail
        );
        if (!userToVerify) {
          setError(
            'personalInfoError',
            '인증된 사용자 정보를 찾을 수 없습니다. 다시 시도해주세요.'
          );
          setIsLoading(false);
          return;
        }

        let hasError = false;

        if (formData.name !== userToVerify.name) {
          setError('personalInfoError', '이름이 일치하지 않습니다.');
          hasError = true;
        }

        const userPhoneFormatted =
          userToVerify.phone && userToVerify.phone.length === 4
            ? `${userToVerify.phone[1]}-${userToVerify.phone[2]}-${userToVerify.phone[3]}`
            : '';
        if (formData.currentPhone !== userPhoneFormatted) {
          setError('personalInfoError', '전화번호가 일치하지 않습니다.');
          hasError = true;
        }

        if (formData.currentCarrier !== userToVerify.phone?.[0]) {
          setError('personalInfoError', '통신사가 일치하지 않습니다.');
          hasError = true;
        }

        if (hasError) {
          setIsLoading(false);
          return;
        }

        setVerifiedPersonalInfo(
          formData.name,
          formData.currentPhone,
          formData.currentCarrier
        );
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsLoading(false);
        setStep(3);
      } else if (step === 3) {
        if (!validateVerificationCode(formData.phoneVerificationCode)) {
          setError('phoneCodeError', '유효하지 않은 인증번호입니다.');
          setIsLoading(false);
          return;
        }

        const correctPhoneCode = '123456';
        if (formData.phoneVerificationCode !== correctPhoneCode) {
          setError('phoneCodeError', '인증번호가 일치하지 않습니다.');
          setIsLoading(false);
          return;
        }

        if (verifiedEmail) {
          try {
            await new Promise((resolve) => setTimeout(resolve, 1500));

            const newPhoneArray = [
              formData.newCarrier,
              ...formData.newPhone.split('-'),
            ] as [string, string, string, string];

            updateUserProfileInStore(verifiedEmail, {
              phone: newPhoneArray,
            });

            setIsLoading(false);
            setStep(4);
          } catch (error) {
            console.error('전화번호 업데이트 중 오류 발생:', error);
            setError(
              'phoneCodeError',
              '전화번호 업데이트에 실패했습니다. 다시 시도해주세요.'
            );
            setIsLoading(false);
          }
        } else {
          setError('phoneCodeError', '이메일 인증이 필요합니다.');
          setIsLoading(false);
        }
      }
    },
    [
      step,
      formData,
      currentUserEmail,
      registeredUsers,
      verifiedEmail,
      validateVerificationCode,
      setError,
      setIsLoading,
      setStep,
      setVerifiedEmail,
      setVerifiedPersonalInfo,
      updateUserProfileInStore,
    ]
  );

  const handlePrevStep = useCallback(() => {
    if (step === 2) {
      setStep(1);
      setIsEmailCodeSent(false);
      setEmailCountdown(0);
      setError('emailError', '');
      setError('emailCodeError', '');
      setError('personalInfoError', '');
      setStoreFormData('emailVerificationCode', '');
      setVerifiedEmail(null);
    } else if (step === 3) {
      setStep(2);
      setIsPhoneCodeSent(false);
      setPhoneCountdown(0);
      setError('phoneCodeError', '');
      setError('personalInfoError', '');
      setStoreFormData('phoneVerificationCode', '');
      setStoreFormData('newPhone', '');
      setStoreFormData('newCarrier', '');
    }
  }, [
    step,
    setStep,
    setIsEmailCodeSent,
    setEmailCountdown,
    setError,
    setStoreFormData,
    setVerifiedEmail,
    setIsPhoneCodeSent,
    setPhoneCountdown,
  ]);

  return {
    step,
    isLoading,
    handleSubmit,
    handlePrevStep,
    handleCompletionAndRedirect,
  };
}
