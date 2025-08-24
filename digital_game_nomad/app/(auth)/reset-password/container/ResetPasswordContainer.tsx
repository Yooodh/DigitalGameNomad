'use client';

// package
import { useMemo } from 'react';

// slice
import ResetPasswordPresenter from '../presenter/ResetPasswordPresenter';
import { useResetPasswordStore } from '@/shared/stores/useResetPasswordStore';
import { usePasswordValidation } from '../hooks/usePasswordValidation';
import { usePasswordForm } from '../hooks/usePasswordForm';
import { usePasswordResetProcess } from '../hooks/usePasswordResetProcess';

export default function ResetPasswordContainer() {
  const { validatePassword, getPasswordStrength } = usePasswordValidation();

  const {
    step,
    isLoading,
    formData,
    passwordErrors,
    showPassword,
    setStep,
    resetForm,
  } = useResetPasswordStore();

  const { handleInputChange, togglePasswordVisibility } = usePasswordForm({
    validatePassword,
  });

  const { handleSubmit } = usePasswordResetProcess({ validatePassword });

  const passwordStrength = useMemo(() => {
    return getPasswordStrength(formData.newPassword);
  }, [formData.newPassword, getPasswordStrength]);

  const presenterProps = {
    step,
    isLoading,
    formData,
    passwordError: passwordErrors.newPasswordError,
    confirmPasswordError: passwordErrors.confirmPasswordError,
    currentPasswordError: passwordErrors.currentPasswordError,
    showCurrentPassword: showPassword.current,
    showNewPassword: showPassword.new,
    showConfirmPassword: showPassword.confirm,
    handleInputChange,
    handleSubmit,
    togglePasswordVisibility,
    passwordStrength,
    setStep,
    resetForm,
  };

  return <ResetPasswordPresenter {...presenterProps} />;
}
