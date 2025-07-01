// package
import { useState, useCallback } from 'react';

// slice
import { useValidationUtils } from './useValidationUtils';
import { FormData, UseResetPhoneFormReturn } from '../types';

export function useResetPhoneForm(): UseResetPhoneFormReturn {
  const { validateEmail, getVerificationCodeError, formatPhoneNumber } =
    useValidationUtils();

  const [formData, setFormData] = useState<FormData>({
    email: '',
    emailVerificationCode: '',
    name: '',
    currentPhone: '',
    currentCarrier: '',
    newPhone: '',
    newCarrier: '',
    phoneVerificationCode: '',
  });
  const [emailError, setEmailError] = useState<string>('');
  const [emailCodeError, setEmailCodeError] = useState<string>('');
  const [phoneCodeError, setPhoneCodeError] = useState<string>('');
  const [isCurrentCarrierSelectOpen, setIsCurrentCarrierSelectOpen] =
    useState<boolean>(false);
  const [isNewCarrierSelectOpen, setIsNewCarrierSelectOpen] =
    useState<boolean>(false);

  const carriers = ['통신사', 'SKT', 'KT', 'LG U+', '알뜰폰'];

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;

      if (name === 'email') {
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (value && !validateEmail(value)) {
          setEmailError('올바른 이메일 형식을 입력해주세요');
        } else {
          setEmailError('');
        }
      } else if (name === 'currentPhone' || name === 'newPhone') {
        const formatted = formatPhoneNumber(value);
        setFormData((prev) => ({ ...prev, [name]: formatted }));
      } else if (name === 'emailVerificationCode') {
        const numbersOnly = value.replace(/\D/g, '').slice(0, 6);
        setFormData((prev) => ({ ...prev, [name]: numbersOnly }));
        setEmailCodeError(getVerificationCodeError(numbersOnly));
      } else if (name === 'currentCarrier' || name === 'newCarrier') {
        setFormData((prev) => ({
          ...prev,
          [name]: value === '통신사' ? '' : value,
        }));
        if (name === 'currentCarrier') {
          setIsCurrentCarrierSelectOpen(false);
        } else {
          setIsNewCarrierSelectOpen(false);
        }
      } else if (name === 'phoneVerificationCode') {
        const numbersOnly = value.replace(/\D/g, '').slice(0, 6);
        setFormData((prev) => ({ ...prev, [name]: numbersOnly }));
        setPhoneCodeError(getVerificationCodeError(numbersOnly));
      } else {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
    },
    [validateEmail, formatPhoneNumber, getVerificationCodeError]
  );

  const handleSelectFocus = useCallback(
    (selectName: 'currentCarrier' | 'newCarrier') => {
      if (selectName === 'currentCarrier') {
        setIsCurrentCarrierSelectOpen(true);
      } else if (selectName === 'newCarrier') {
        setIsNewCarrierSelectOpen(true);
      }
    },
    []
  );

  const handleSelectBlur = useCallback(
    (selectName: 'currentCarrier' | 'newCarrier') => {
      if (selectName === 'currentCarrier') {
        setIsCurrentCarrierSelectOpen(false);
      } else if (selectName === 'newCarrier') {
        setIsNewCarrierSelectOpen(false);
      }
    },
    []
  );

  return {
    formData,
    setFormData,
    handleInputChange,
    emailError,
    setEmailError,
    emailCodeError,
    setEmailCodeError,
    phoneCodeError,
    setPhoneCodeError,
    isCurrentCarrierSelectOpen,
    setIsCurrentCarrierSelectOpen,
    isNewCarrierSelectOpen,
    setIsNewCarrierSelectOpen,
    carriers,
    handleSelectFocus,
    handleSelectBlur,
  };
}
