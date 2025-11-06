'use client';

// package
import { useCallback, useEffect } from 'react';

// slice
import ResetPhonePresenter from '../presenter/ResetPhonePresenter';
import { useResetPhoneForm } from '../hooks/useResetPhoneForm';
import { useStepNavigation } from '../hooks/useStepNavigation';
import { useEmailVerification } from '../hooks/useEmailVerification';
import { usePhoneVerification } from '../hooks/usePhoneVerification';
import { useValidationUtils } from '../hooks/useValidationUtils';
import { FormData } from '../types';

// layer
import { useAuthStore } from '@/shared/stores/useAuthStore';
import { useResetPhoneStore } from '@/shared/stores/useResetPhoneStore';

export default function ResetPhoneContainer() {
  const {
    validateVerificationCode,
    formatTime,
    validateEmail,
    formatPhoneNumber,
  } = useValidationUtils();

  const currentUserEmail = useAuthStore((state) => state.userEmail);

  const {
    step,
    isLoading,
    formData,
    emailError,
    emailCodeError,
    phoneCodeError,
    personalInfoError,
    isEmailCodeSent,
    emailCountdown,
    isPhoneCodeSent,
    phoneCountdown,
    isCurrentCarrierSelectOpen,
    isNewCarrierSelectOpen,
    carriers,
    setFormData,
    setError,
    setIsLoading,
    resetForm,
  } = useResetPhoneStore();

  const { handleSelectFocus, handleSelectBlur } = useResetPhoneForm();
  const { sendEmailVerificationCode: sendEmailCodeHook } =
    useEmailVerification();
  const { sendPhoneVerificationCode: sendPhoneCodeHook } =
    usePhoneVerification();
  const {
    handleSubmit: handleStepSubmit,
    handlePrevStep: handleStepPrev,
    handleCompletionAndRedirect,
  } = useStepNavigation();

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;

      if (name === 'email') {
        setFormData('email', value);
        setError('emailError', '');
      } else if (name === 'emailVerificationCode') {
        const numbersOnly = value.replace(/\D/g, '').slice(0, 6);
        setFormData('emailVerificationCode', numbersOnly);
      } else if (name === 'currentPhone' || name === 'newPhone') {
        const formatted = formatPhoneNumber(value);
        setFormData(name as keyof FormData, formatted);
      } else if (name === 'phoneVerificationCode') {
        const numbersOnly = value.replace(/\D/g, '').slice(0, 6);
        setFormData('phoneVerificationCode', numbersOnly);
      } else {
        setFormData(name as keyof FormData, value);
      }

      if (
        name === 'name' ||
        name === 'currentCarrier' ||
        name === 'newCarrier'
      ) {
        setError('personalInfoError', '');
      }
    },
    [setFormData, setError, formatPhoneNumber]
  );

  const sendEmailVerificationCode = async () => {
    if (!validateEmail(formData.email)) {
      setError('emailError', '올바른 이메일 형식을 입력해주세요.');
      return;
    }
    if (formData.email !== currentUserEmail) {
      setError(
        'emailError',
        '현재 로그인한 계정의 이메일과 일치하지 않습니다.'
      );
      return;
    }
    await sendEmailCodeHook(formData.email);
  };

  const sendPhoneVerificationCode = async () => {
    if (!formData.newPhone || formData.newCarrier === '') {
      setError('phoneCodeError', '새 전화번호와 통신사를 입력해주세요.');
      return;
    }
    await sendPhoneCodeHook();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError('emailError', '');
    setError('emailCodeError', '');
    setError('phoneCodeError', '');
    setError('personalInfoError', '');

    if (step === 1) {
      if (!validateEmail(formData.email)) {
        setError('emailError', '올바른 이메일 형식을 입력해주세요.');
        setIsLoading(false);
        return;
      }
      if (!validateVerificationCode(formData.emailVerificationCode)) {
        setError('emailCodeError', '6자리 인증번호를 입력해주세요.');
        setIsLoading(false);
        return;
      }
    } else if (step === 2) {
      if (
        !formData.name ||
        !formData.currentPhone ||
        formData.currentCarrier === ''
      ) {
        setError(
          'personalInfoError',
          '이름, 현재 전화번호, 통신사를 모두 입력해주세요.'
        );
        setIsLoading(false);
        return;
      }
    } else if (step === 3) {
      if (!formData.newPhone || formData.newCarrier === '') {
        setError('phoneCodeError', '새 전화번호와 통신사를 입력해주세요.');
        setIsLoading(false);
        return;
      }
      if (!validateVerificationCode(formData.phoneVerificationCode)) {
        setError('phoneCodeError', '6자리 인증번호를 입력해주세요.');
        setIsLoading(false);
        return;
      }
    }

    await handleStepSubmit(e);
  };

  const handlePrevStep = useCallback(() => {
    handleStepPrev();
  }, [handleStepPrev]);

  const presenterProps = {
    formData,
    step,
    isLoading,
    isEmailCodeSent,
    isPhoneCodeSent,
    emailCountdown,
    phoneCountdown,
    emailError,
    emailCodeError,
    phoneCodeError,
    personalInfoError,
    isCurrentCarrierSelectOpen,
    isNewCarrierSelectOpen,
    carriers,
    handleInputChange,
    handleSelectFocus,
    handleSelectBlur,
    sendEmailVerificationCode,
    sendPhoneVerificationCode,
    formatTime,
    handleSubmit,
    handleCompletionAndRedirect,
    validateVerificationCode,
    handlePrevStep,
    resetForm,
  };

  return <ResetPhonePresenter {...presenterProps} />;
}
