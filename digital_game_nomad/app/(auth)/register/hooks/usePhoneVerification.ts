// package
import { useState, useCallback } from 'react';

// slice
import { isValidPhoneFormat } from '../utils/validation';
import { PhoneVerificationProps, ValidationState } from '../types';

export const usePhoneVerification = ({
  phone,
  setValidation,
  setIsLoading,
}: PhoneVerificationProps) => {
  const [verificationCode, setVerificationCode] = useState<string>('');
  const [showVerification, setShowVerification] = useState<boolean>(false);
  const [isCarrierSelectOpen, setIsCarrierSelectOpen] =
    useState<boolean>(false);

  const handleCarrierChange = useCallback(() => {
    setIsCarrierSelectOpen(false);
  }, []);

  const requestVerification = useCallback(async () => {
    if (!isValidPhoneFormat(phone.join(''))) {
      alert('유효한 전화번호를 입력해주세요.');

      setValidation((prev: ValidationState) => ({ ...prev, phone: false }));
      return;
    }

    setIsLoading(true);
    setShowVerification(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
  }, [phone, setIsLoading, setValidation]);

  const verifyPhone = useCallback(() => {
    if (verificationCode.length === 4) {
      setValidation((prev: ValidationState) => ({
        ...prev,
        phoneVerified: true,
      }));
      setShowVerification(false);
    } else {
      alert('유효한 인증번호 4자리를 입력해주세요.');

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
