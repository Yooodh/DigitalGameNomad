'use client';

// package
import { useMemo, useCallback, useEffect } from 'react';

// slice
import ForgotPasswordPresenter from '../presenter/ForgotPasswordPresenter';
import { useForgotPasswordStore } from '@/shared/stores/useForgotPasswordStore';
import { usePasswordValidation } from '../hooks/usePasswordValidation';
import { useForgotPasswordProcess } from '../hooks/useForgotPasswordProcess';
import { useEmailVerification } from '../hooks/useEmailVerification';
import { useValidationUtils } from '../hooks/useValidationUtils';
import { FormData } from '../types';

export default function ForgotPasswordContainer() {
  const { validatePassword, getPasswordStrength } = usePasswordValidation();
  const { validateVerificationCode, formatTime, validateEmail } =
    useValidationUtils();

  const {
    step,
    isLoading,
    formData,
    emailError,
    emailCodeError,
    passwordError,
    confirmPasswordError,
    isEmailCodeSent,
    emailCountdown,
    showPassword,
    setFormData,
    setError,
    togglePasswordVisibility,
    resetForm,
    setStep,
  } = useForgotPasswordStore();

  const { sendEmailVerificationCode: sendEmailCodeHook } =
    useEmailVerification();
  const { handleSubmit, handlePrev } = useForgotPasswordProcess({
    validatePassword,
    validateVerificationCode,
  });

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData(name as keyof FormData, value);
    },
    [setFormData]
  );

  useEffect(() => {
    if (formData.email && !validateEmail(formData.email)) {
      setError('emailError', '올바른 이메일 형식을 입력해주세요.');
    } else {
      setError('emailError', '');
    }
  }, [formData.email, validateEmail, setError]);

  useEffect(() => {
    const { emailVerificationCode } = formData;
    const numbersOnly = emailVerificationCode.replace(/\D/g, '').slice(0, 6);
    setFormData('emailVerificationCode', numbersOnly);

    if (numbersOnly.length > 0 && !validateVerificationCode(numbersOnly)) {
      setError('emailCodeError', '6자리 숫자를 입력해주세요.');
    } else {
      setError('emailCodeError', '');
    }
  }, [
    formData.emailVerificationCode,
    validateVerificationCode,
    setFormData,
    setError,
  ]);

  useEffect(() => {
    const { newPassword, confirmPassword } = formData;
    if (newPassword.length > 0 && !validatePassword(newPassword)) {
      setError(
        'passwordError',
        '8자 이상, 영문 소문자, 숫자, 특수문자를 포함해주세요.'
      );
    } else {
      setError('passwordError', '');
    }

    if (confirmPassword.length > 0 && newPassword !== confirmPassword) {
      setError('confirmPasswordError', '비밀번호가 일치하지 않습니다.');
    } else {
      setError('confirmPasswordError', '');
    }
  }, [
    formData.newPassword,
    formData.confirmPassword,
    validatePassword,
    setError,
  ]);

  const handleSendEmailCode = useCallback(async () => {
    if (emailError) {
      return;
    }
    await sendEmailCodeHook(formData.email);
  }, [emailError, sendEmailCodeHook, formData.email]);

  const passwordStrength = useMemo(() => {
    return getPasswordStrength(formData.newPassword);
  }, [formData.newPassword, getPasswordStrength]);

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  const presenterProps = {
    formData,
    step,
    isLoading,
    passwordError,
    confirmPasswordError,
    emailError,
    emailCodeError,
    showNewPassword: showPassword.new,
    showConfirmPassword: showPassword.confirm,
    handleInputChange,
    handleSubmit,
    togglePasswordVisibility,
    passwordStrength,
    isEmailCodeSent,
    emailCountdown,
    sendEmailVerificationCode: handleSendEmailCode,
    formatTime,
    validateVerificationCode,
    handlePrev,
    resetForm,
    setStep,
  };

  return <ForgotPasswordPresenter {...presenterProps} />;
}
