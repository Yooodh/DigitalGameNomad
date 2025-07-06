'use client';

// package
import { useMemo, useState, useCallback } from 'react';

// slice
import ForgotPasswordPresenter from '../presenters/ForgotPassword.presenter';
import { usePasswordForm } from '../hooks/usePasswordForm';
import { usePasswordValidation } from '../hooks/usePasswordValidation';
import { usePasswordResetProcess } from '../hooks/usePasswordResetProcess';
import { useEmailVerification } from '../hooks/useEmailVerification';
import { useValidationUtils } from '../hooks/useValidationUtils';

export default function ForgotPasswordContainer() {
  const {
    passwordError,
    setPasswordError,
    confirmPasswordError,
    setConfirmPasswordError,
    currentPasswordError,
    setCurrentPasswordError,
    validatePassword,
    getPasswordStrength,
  } = usePasswordValidation();

  const [emailError, setEmailError] = useState<string>('');
  const [emailCodeError, setEmailCodeError] = useState<string>('');

  const {
    formData,
    setFormData,
    handleInputChange: baseHandleInputChange,
    showCurrentPassword,
    showNewPassword,
    showConfirmPassword,
    togglePasswordVisibility,
  } = usePasswordForm({
    validatePassword,
    setConfirmPasswordError,
    setPasswordError,
    setCurrentPasswordError,
  });

  const {
    isEmailCodeSent,
    emailCountdown,
    sendEmailVerificationCode: sendEmailCodeHook,
    resetEmailVerification,
  } = useEmailVerification();

  const { validateVerificationCode, formatTime, validateEmail } =
    useValidationUtils();

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      if (name === 'email') {
        if (value && validateEmail(value)) {
          setEmailError('');
        }
      }
      baseHandleInputChange(e);
    },
    [baseHandleInputChange, setEmailError, validateEmail]
  );

  const { step, setStep, isLoading, setIsLoading, handleSubmit } =
    usePasswordResetProcess({
      formData,
      validatePassword,
      setPasswordError,
      setConfirmPasswordError,
      setCurrentPasswordError,
      setEmailCodeError,
      validateVerificationCode,
    });

  const handleSendEmailCode = async () => {
    await sendEmailCodeHook(formData.email, setIsLoading, setEmailError);
  };

  const handlePrevStep = () => {
    if (step === 2) {
      resetEmailVerification();
      setEmailCodeError('');
      setFormData((prev) => ({
        ...prev,
        emailVerificationCode: '',
      }));
      setStep(1);
    }
  };

  const passwordStrength = useMemo(() => {
    return getPasswordStrength(formData.newPassword);
  }, [formData.newPassword, getPasswordStrength]);

  const presenterProps = {
    formData,
    step,
    isLoading,
    passwordError,
    confirmPasswordError,
    currentPasswordError,
    showCurrentPassword,
    showNewPassword,
    showConfirmPassword,
    handleInputChange,
    handleSubmit,
    togglePasswordVisibility,
    passwordStrength,
    setStep,
    isEmailCodeSent,
    emailCountdown,
    emailError,
    emailCodeError,
    sendEmailVerificationCode: handleSendEmailCode,
    formatTime,
    validateVerificationCode,
    handlePrev: handlePrevStep,
  };

  return <ForgotPasswordPresenter {...presenterProps} />;
}
