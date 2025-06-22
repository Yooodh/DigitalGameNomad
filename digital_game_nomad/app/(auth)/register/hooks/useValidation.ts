// package
import { useState, useCallback } from 'react';

// slice
import {
  isValidEmailFormat,
  isValidPasswordFormat,
  isValidNameFormat,
  isValidNicknameFormat,
  isValidPhoneFormat,
} from '../utils/validation';
import { RegistrationFormData, ValidationState } from '../types';

export const useValidation = () => {
  const [validation, setValidation] = useState<ValidationState>({
    email: true,
    emailChecked: false,
    password: true,
    passwordCheck: true,
    name: true,
    nickname: true,
    phone: true,
    phoneVerified: false,
  });

  const validateField = useCallback(
    <T extends keyof RegistrationFormData>(
      field: T,
      value: RegistrationFormData[T],
      currentFormData: RegistrationFormData
    ) => {
      setValidation((prev) => {
        let isValid = true;
        let emailChecked = prev.emailChecked;
        let phoneVerified = prev.phoneVerified;

        switch (field) {
          case 'email':
            isValid = (value as string).includes('@')
              ? isValidEmailFormat(value as string)
              : /^[^\s@]+$/.test(value as string);
            emailChecked = false;
            break;
          case 'password':
            isValid = isValidPasswordFormat(value as string);
            break;
          case 'passwordCheck':
            isValid = (value as string) === currentFormData.password;
            break;
          case 'name':
            isValid = isValidNameFormat(value as string);
            break;
          case 'nickname':
            isValid = isValidNicknameFormat(value as string);
            break;
          case 'phone':
            isValid = isValidPhoneFormat((value as string[]).join(''));
            phoneVerified = false;
            break;
          default:
            break;
        }
        return { ...prev, [field]: isValid, emailChecked, phoneVerified };
      });
    },
    []
  );

  return {
    validation,
    setValidation,
    validateField,
  };
};
