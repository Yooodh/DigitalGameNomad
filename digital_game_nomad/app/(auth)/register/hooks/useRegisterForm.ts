// package
import { useCallback, useMemo } from 'react';

// slice
import { useFormInput } from './useFormInput';
import { useValidation } from './useValidation';
import { useEmailRegistration } from './useEmailRegistration';
import { usePhoneVerification } from './usePhoneVerification';
import { usePasswordVisibility } from './usePasswordVisibility';
import { useLoadingState } from './useLoadingState';

import { isValidEmailFormat } from '../utils/validation';

import { RegistrationFormData, UseRegisterFormReturn } from '../types';

export const useRegisterForm = (): UseRegisterFormReturn => {
  const {
    formData,
    setFormData,
    handleInputChange: baseHandleInputChange,
  } = useFormInput({
    email: '',
    password: '',
    passwordCheck: '',
    name: '',
    nickname: '',
    phone: ['', '', ''],
  });

  const { isLoading, setIsLoading } = useLoadingState();
  const {
    showPassword,
    setShowPassword,
    showPasswordCheck,
    setShowPasswordCheck,
  } = usePasswordVisibility();

  const { validation, setValidation, validateField } = useValidation();

  const {
    emailDomain,
    setEmailDomain,
    isEmailSelectOpen,
    setIsEmailSelectOpen,
    handleEmailDomainChange,
    fullEmailForValidation,
    checkEmailDuplicate: baseCheckEmailDuplicate,
  } = useEmailRegistration({
    email: formData.email,
    setValidation,
    setIsLoading,
    setFormData,
  });

  const {
    verificationCode,
    setVerificationCode,
    showVerification,
    isCarrierSelectOpen,
    setIsCarrierSelectOpen,
    handleCarrierChange,
    requestVerification: baseRequestVerification,
    verifyPhone: baseVerifyPhone,
  } = usePhoneVerification({
    phone: formData.phone,
    setValidation,
    setIsLoading,
  });

  const handleInputChange = useCallback(
    (field: keyof RegistrationFormData, value: string, index?: number) => {
      baseHandleInputChange(field, value, index);

      let currentInputtedFormData: RegistrationFormData;
      if (field === 'phone' && index !== undefined) {
        const newPhoneArray = [...formData.phone];
        newPhoneArray[index] = value;
        currentInputtedFormData = { ...formData, phone: newPhoneArray };
      } else {
        currentInputtedFormData = { ...formData, [field]: value as string };
      }

      if (field === 'phone') {
        validateField(
          field,
          currentInputtedFormData.phone,
          currentInputtedFormData
        );
      } else {
        validateField(
          field,
          currentInputtedFormData[field] as string,
          currentInputtedFormData
        );
      }

      if (field === 'email' && value.includes('@')) {
        setEmailDomain('direct');
      }
    },
    [baseHandleInputChange, validateField, formData, setEmailDomain]
  );

  const setIsSelectOpen = useCallback(
    (setter: React.SetStateAction<{ email: boolean; carrier: boolean }>) => {
      if (typeof setter === 'function') {
        const newState = setter({
          email: isEmailSelectOpen,
          carrier: isCarrierSelectOpen,
        });
        setIsEmailSelectOpen(newState.email);
        setIsCarrierSelectOpen(newState.carrier);
      } else {
        setIsEmailSelectOpen(setter.email);
        setIsCarrierSelectOpen(setter.carrier);
      }
    },
    [
      isEmailSelectOpen,
      isCarrierSelectOpen,
      setIsEmailSelectOpen,
      setIsCarrierSelectOpen,
    ]
  );

  const checkEmailDuplicate = useCallback(async () => {
    await baseCheckEmailDuplicate();
  }, [baseCheckEmailDuplicate]);

  const requestVerification = useCallback(async () => {
    await baseRequestVerification();
  }, [baseRequestVerification]);

  const verifyPhone = useCallback(() => {
    baseVerifyPhone();
  }, [baseVerifyPhone]);

  const allFieldsValid = useMemo(() => {
    const isEmailValidForSubmission = fullEmailForValidation
      ? isValidEmailFormat(fullEmailForValidation)
      : false;

    return (
      isEmailValidForSubmission &&
      validation.emailChecked &&
      validation.password &&
      validation.passwordCheck &&
      validation.name &&
      validation.nickname &&
      validation.phone &&
      validation.phoneVerified
    );
  }, [fullEmailForValidation, validation]);

  const handleSubmit = useCallback(async () => {
    const finalFormData = {
      ...formData,
      email: fullEmailForValidation,
    };

    if (!allFieldsValid) {
      alert('모든 필수 정보를 올바르게 입력하고 인증을 완료해주세요.');
      return;
    }

    console.log('폼 제출됨:', finalFormData);
    alert('회원가입이 완료되었습니다!');
  }, [formData, fullEmailForValidation, allFieldsValid]);

  const combinedIsSelectOpen = useMemo(
    () => ({
      email: isEmailSelectOpen,
      carrier: isCarrierSelectOpen,
    }),
    [isEmailSelectOpen, isCarrierSelectOpen]
  );

  return {
    formData,
    validation,
    showPassword,
    showPasswordCheck,
    verificationCode,
    showVerification,
    isLoading,
    emailDomain,
    isSelectOpen: combinedIsSelectOpen,
    handleInputChange,
    handleEmailDomainChange,
    handleCarrierChange,
    checkEmailDuplicate,
    requestVerification,
    verifyPhone,
    handleSubmit,
    setShowPassword,
    setShowPasswordCheck,
    setVerificationCode,
    setIsSelectOpen,
  };
};
