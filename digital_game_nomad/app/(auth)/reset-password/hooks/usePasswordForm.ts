// package
import { useCallback } from 'react';

// slice
import { useResetPasswordStore } from '@/shared/stores/useResetPasswordStore';
import { UsePasswordFormProps, FormData } from '../types';

export function usePasswordForm({ validatePassword }: UsePasswordFormProps) {
  const { formData, setFormData, setError, togglePasswordVisibility } =
    useResetPasswordStore();

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      setFormData(name as keyof FormData, value);

      if (name === 'currentPassword') {
        setError('currentPasswordError', '');
      } else if (name === 'newPassword') {
        if (value && !validatePassword(value)) {
          setError(
            'newPasswordError',
            '8자 이상, 영문 소문자, 숫자, 특수문자를 포함해 주세요.'
          );
        } else {
          setError('newPasswordError', '');
        }
        if (formData.confirmPassword && value !== formData.confirmPassword) {
          setError('confirmPasswordError', '비밀번호가 일치하지 않습니다.');
        } else if (formData.confirmPassword) {
          setError('confirmPasswordError', '');
        }
      } else if (name === 'confirmPassword') {
        if (value && value !== formData.newPassword) {
          setError('confirmPasswordError', '비밀번호가 일치하지 않습니다.');
        } else {
          setError('confirmPasswordError', '');
        }
      }
    },
    [formData, setFormData, setError, validatePassword]
  );

  return {
    formData,
    handleInputChange,
    togglePasswordVisibility,
  };
}
