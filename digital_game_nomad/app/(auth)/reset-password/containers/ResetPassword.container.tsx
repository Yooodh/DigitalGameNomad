'use client';

// package
import { useMemo } from 'react';

// slice
import ResetPasswordPresenter from '../presenters/ResetPassword.presenter';
import { usePasswordForm } from '../hooks/usePasswordForm';
import { usePasswordValidation } from '../hooks/usePasswordValidation';
import { usePasswordResetProcess } from '../hooks/usePasswordResetProcess';

export default function ResetPasswordContainer() {
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

  const {
    formData,
    handleInputChange,
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

  const { step, setStep, isLoading, handleSubmit } = usePasswordResetProcess({
    formData,
    validatePassword,
    setPasswordError,
    setConfirmPasswordError,
    setCurrentPasswordError,
  });

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
  };
  return <ResetPasswordPresenter {...presenterProps} />;
}
