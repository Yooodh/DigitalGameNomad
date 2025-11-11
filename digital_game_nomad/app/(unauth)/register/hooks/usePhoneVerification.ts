// package
import { useState, useCallback } from 'react';

// slice
import { isValidPhoneFormat } from '../utils/validation';
import {
  PhoneVerificationProps,
  ValidationState,
  RegistrationFormData,
} from '../types';

export const usePhoneVerification = ({
  phone,
  setValidation,
  setIsLoading,
  setFormData,
}: PhoneVerificationProps) => {
  const [verificationCode, setVerificationCode] = useState<string>('');
  const [showVerification, setShowVerification] = useState<boolean>(false);
  const [isCarrierSelectOpen, setIsCarrierSelectOpen] =
    useState<boolean>(false);

  const handleCarrierChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedCarrier = e.target.value;
      setIsCarrierSelectOpen(false);
      setFormData((prev: RegistrationFormData) => ({
        ...prev,
        phone: [selectedCarrier, prev.phone[1], prev.phone[2], prev.phone[3]],
      }));
    },
    [setFormData]
  );

  const requestVerification = useCallback(async () => {
    const phoneDigits = phone.slice(1).join('');
    if (!isValidPhoneFormat(phoneDigits)) {
      alert('유효한 전화번호 11자리를 입력해주세요.');
      setValidation((prev: ValidationState) => ({ ...prev, phone: false }));
      return;
    }

    setIsLoading(true);
    setShowVerification(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
  }, [phone, setIsLoading, setValidation]);

  const verifyPhone = useCallback(() => {
    const correctCode = '1234';
    if (verificationCode === correctCode) {
      setValidation((prev: ValidationState) => ({
        ...prev,
        phoneVerified: true,
      }));
      setShowVerification(false);
    } else {
      setValidation((prev: ValidationState) => ({
        ...prev,
        phoneVerified: false,
      }));
    }
  }, [verificationCode, setValidation]);

  return {
    verificationCode,
    setVerificationCode,
    showVerification,
    setShowVerification,
    isCarrierSelectOpen,
    setIsCarrierSelectOpen,
    handleCarrierChange,
    requestVerification,
    verifyPhone,
  };
};
