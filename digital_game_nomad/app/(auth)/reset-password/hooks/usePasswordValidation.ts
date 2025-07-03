// package
import { useState, useCallback } from 'react';

//slice
import { PasswordStrength } from '../types';

export function usePasswordValidation() {
  const [passwordError, setPasswordError] = useState<string>('');
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>('');
  const [currentPasswordError, setCurrentPasswordError] = useState<string>('');

  const validatePassword = useCallback((password: string): boolean => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  }, []);

  const getPasswordStrength = useCallback(
    (password: string): PasswordStrength => {
      if (!password) return { strength: 0, label: '', color: '' };

      let score = 0;
      if (password.length >= 8) score++;
      if (/[a-z]/.test(password)) score++;
      if (/\d/.test(password)) score++;
      if (/[@$!%*?&]/.test(password)) score++;
      if (/[A-Z]/.test(password)) score++;

      if (score <= 2)
        return { strength: score * 20, label: '약함', color: '#ef4444' };
      if (score <= 3)
        return { strength: score * 20, label: '보통', color: '#f59e0b' };
      if (score <= 4)
        return { strength: score * 20, label: '강함', color: '#10b981' };
      return { strength: 100, label: '매우 강함', color: '#059669' };
    },
    []
  );

  return {
    passwordError,
    setPasswordError,
    confirmPasswordError,
    setConfirmPasswordError,
    currentPasswordError,
    setCurrentPasswordError,
    validatePassword,
    getPasswordStrength,
  };
}
