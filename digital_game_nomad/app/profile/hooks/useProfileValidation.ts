// package
import { useState, useCallback } from 'react';

// slice
import { UserProfile, ValidationState } from '../types';

export function useProfileValidation() {
  const [validation, setValidation] = useState<ValidationState>({
    name: true,
    nickname: true,
    phone: true,
  });

  const validateName = useCallback((name: string): boolean => {
    const nameRegex = /^[가-힣a-zA-Z]{1,10}$/;
    return nameRegex.test(name);
  }, []);

  const validateNickname = useCallback((nickname: string): boolean => {
    const nicknameRegex = /^[가-힣a-zA-Z0-9]{1,10}$/;
    return nicknameRegex.test(nickname);
  }, []);

  const validatePhone = useCallback((phone: string[]): boolean => {
    return (
      phone.length === 3 &&
      phone.every((part) => part.length > 0) &&
      phone[0].length === 3 &&
      phone[1].length === 4 &&
      phone[2].length === 4
    );
  }, []);

  const validateField = useCallback(
    <T extends keyof UserProfile>(field: T, value: UserProfile[T]): void => {
      let isValid = true;

      switch (field) {
        case 'name':
          isValid = typeof value === 'string' && validateName(value);
          break;
        case 'nickname':
          isValid = typeof value === 'string' && validateNickname(value);
          break;
        case 'phone':
          isValid = Array.isArray(value) && validatePhone(value);
          break;
        default:
          return;
      }

      if (field === 'name' || field === 'nickname' || field === 'phone') {
        setValidation((prev) => ({
          ...prev,
          [field]: isValid,
        }));
      }
    },
    [validateName, validateNickname, validatePhone]
  );

  const validateAll = useCallback(
    (profile: UserProfile): boolean => {
      const newValidation: ValidationState = {
        name: validateName(profile.name),
        nickname: validateNickname(profile.nickname),
        phone: validatePhone(profile.phone),
      };

      setValidation(newValidation);
      return Object.values(newValidation).every(Boolean);
    },
    [validateName, validateNickname, validatePhone]
  );

  const resetValidation = useCallback(() => {
    setValidation({
      name: true,
      nickname: true,
      phone: true,
    });
  }, []);

  return {
    validation,
    validateField,
    validateAll,
    resetValidation,
  };
}
