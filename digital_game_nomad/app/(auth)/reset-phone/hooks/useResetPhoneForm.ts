// package
import { useCallback } from 'react';

// slice
import { useValidationUtils } from './useValidationUtils';
import { FormData, UseResetPhoneFormReturn } from '../types';

// layer
import { useResetPhoneStore } from '@/shared/stores/useResetPhoneStore';

export function useResetPhoneForm(): UseResetPhoneFormReturn {
  const { validateEmail, getVerificationCodeError, formatPhoneNumber } =
    useValidationUtils();

  const {
    setFormData,
    setError,
    setIsCurrentCarrierSelectOpen,
    setIsNewCarrierSelectOpen,
  } = useResetPhoneStore();

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;

      setFormData(name as keyof FormData, value);

      if (name === 'email') {
        if (value && !validateEmail(value)) {
          setError('emailError', '올바른 이메일 형식을 입력해 주세요.');
        } else {
          setError('emailError', '');
        }
      } else if (name === 'currentPhone' || name === 'newPhone') {
        const formatted = formatPhoneNumber(value);
        setFormData(name as keyof FormData, formatted);
      } else if (name === 'emailVerificationCode') {
        const numbersOnly = value.replace(/\D/g, '').slice(0, 6);
        setFormData(name as keyof FormData, numbersOnly);
        setError('emailCodeError', getVerificationCodeError(numbersOnly));
      } else if (name === 'currentCarrier' || name === 'newCarrier') {
        setFormData(name as keyof FormData, value === '통신사' ? '' : value);
        if (name === 'currentCarrier') {
          setIsCurrentCarrierSelectOpen(false);
        } else {
          setIsNewCarrierSelectOpen(false);
        }
      } else if (name === 'phoneVerificationCode') {
        const numbersOnly = value.replace(/\D/g, '').slice(0, 6);
        setFormData(name as keyof FormData, numbersOnly);
        setError('phoneCodeError', getVerificationCodeError(numbersOnly));
      }
    },
    [
      validateEmail,
      formatPhoneNumber,
      getVerificationCodeError,
      setFormData,
      setError,
      setIsCurrentCarrierSelectOpen,
      setIsNewCarrierSelectOpen,
    ]
  );

  const handleSelectFocus = useCallback(
    (selectName: 'currentCarrier' | 'newCarrier') => {
      if (selectName === 'currentCarrier') {
        setIsCurrentCarrierSelectOpen(true);
      } else if (selectName === 'newCarrier') {
        setIsNewCarrierSelectOpen(true);
      }
    },
    [setIsCurrentCarrierSelectOpen, setIsNewCarrierSelectOpen]
  );

  const handleSelectBlur = useCallback(
    (selectName: 'currentCarrier' | 'newCarrier') => {
      if (selectName === 'currentCarrier') {
        setIsCurrentCarrierSelectOpen(false);
      } else if (selectName === 'newCarrier') {
        setIsNewCarrierSelectOpen(false);
      }
    },
    [setIsCurrentCarrierSelectOpen, setIsNewCarrierSelectOpen]
  );

  return {
    handleInputChange,
    handleSelectFocus,
    handleSelectBlur,
  };
}
