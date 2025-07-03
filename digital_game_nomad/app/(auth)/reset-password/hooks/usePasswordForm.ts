// package
import { useState, useCallback } from 'react';

// slice
import { FormData, UsePasswordFormProps } from '../types';

export function usePasswordForm({
  validatePassword,
  setConfirmPasswordError,
  setPasswordError,
  setCurrentPasswordError,
}: UsePasswordFormProps) {
  const [formData, setFormData] = useState<FormData>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [showCurrentPassword, setShowCurrentPassword] =
    useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const togglePasswordVisibility = useCallback(
    (field: 'current' | 'new' | 'confirm') => {
      if (field === 'current') {
        setShowCurrentPassword((prev) => !prev);
      } else if (field === 'new') {
        setShowNewPassword((prev) => !prev);
      } else if (field === 'confirm') {
        setShowConfirmPassword((prev) => !prev);
      }
    },
    []
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      setFormData((prev) => ({ ...prev, [name]: value }));

      if (name === 'currentPassword') {
        setCurrentPasswordError('');
      } else if (name === 'newPassword') {
        if (value && !validatePassword(value)) {
          setPasswordError(
            '8자 이상, 영문 소문자, 숫자, 특수문자를 포함해주세요'
          );
        } else {
          setPasswordError('');
        }
        if (formData.confirmPassword && value !== formData.confirmPassword) {
          setConfirmPasswordError('비밀번호가 일치하지 않습니다');
        } else if (formData.confirmPassword) {
          setConfirmPasswordError('');
        }
      } else if (name === 'confirmPassword') {
        if (value && value !== formData.newPassword) {
          setConfirmPasswordError('비밀번호가 일치하지 않습니다');
        } else {
          setConfirmPasswordError('');
        }
      }
    },
    [
      formData.confirmPassword,
      formData.newPassword,
      validatePassword,
      setConfirmPasswordError,
      setPasswordError,
      setCurrentPasswordError,
    ]
  );

  return {
    formData,
    handleInputChange,
    showCurrentPassword,
    showNewPassword,
    showConfirmPassword,
    togglePasswordVisibility,
  };
}
