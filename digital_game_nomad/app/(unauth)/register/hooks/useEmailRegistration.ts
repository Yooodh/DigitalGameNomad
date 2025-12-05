// package
import { useState, useCallback, useMemo } from 'react';
import { toast } from 'react-toastify';

// slice
import { isValidEmailFormat } from '../utils/validation';
import {
  EmailRegistrationProps,
  ValidationState,
  RegistrationFormData,
} from '../types';

export const useEmailRegistration = ({
  email,
  setValidation,
  setIsLoading,
  setFormData,
}: EmailRegistrationProps) => {
  const [emailDomain, setEmailDomain] = useState<string>('');
  const [isEmailSelectOpen, setIsEmailSelectOpen] = useState<boolean>(false);

  const handleEmailDomainChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedDomain = e.target.value;
      setEmailDomain(selectedDomain);
      setIsEmailSelectOpen(false);

      const localPart = email.split('@')[0];

      if (selectedDomain === 'direct') {
        setFormData((prev: RegistrationFormData) => ({
          ...prev,
          email: localPart,
        }));
        setValidation((prev: ValidationState) => ({
          ...prev,
          email: /^[^\s@]+$/.test(localPart),
          emailChecked: false,
        }));
      } else {
        setFormData((prev: RegistrationFormData) => ({
          ...prev,
          email: localPart,
        }));
        setValidation((prev: ValidationState) => ({
          ...prev,
          email: isValidEmailFormat(`${localPart}@${selectedDomain}`),
          emailChecked: false,
        }));
      }
    },
    [email, setFormData, setValidation]
  );

  const fullEmailForValidation = useMemo(() => {
    if (emailDomain && emailDomain !== 'direct') {
      const localPart = email.split('@')[0];
      return `${localPart}@${emailDomain}`;
    }
    return email;
  }, [email, emailDomain]);

  const checkEmailDuplicate = useCallback(async () => {
    if (!isValidEmailFormat(fullEmailForValidation)) {
      toast.warning('올바른 이메일 주소 형식을 입력하고 중복확인을 해주세요.');
      setValidation((prev: ValidationState) => ({ ...prev, email: false }));
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setValidation((prev: ValidationState) => ({ ...prev, emailChecked: true }));
    setIsLoading(false);
  }, [fullEmailForValidation, setIsLoading, setValidation]);

  return {
    emailDomain,
    setEmailDomain,
    isEmailSelectOpen,
    setIsEmailSelectOpen,
    handleEmailDomainChange,
    fullEmailForValidation,
    checkEmailDuplicate,
  };
};
