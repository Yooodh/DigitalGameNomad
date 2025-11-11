// package
import { useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';

// slice
import { useFormInput } from './useFormInput';
import { useValidation } from './useValidation';
import { useEmailRegistration } from './useEmailRegistration';
import { usePhoneVerification } from './usePhoneVerification';
import { usePasswordVisibility } from './usePasswordVisibility';
import { useLoadingState } from './useLoadingState';
import { isValidEmailFormat } from '../utils/validation';
import { RegistrationFormData, UseRegisterFormReturn } from '../types';

// layer
import { useAuthStore } from '@/shared/stores/useAuthStore';
import { useRegisteredUsersStore } from '@/shared/stores/useRegisteredUsersStore';

export const useRegisterForm = (): UseRegisterFormReturn => {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const addUser = useRegisteredUsersStore((state) => state.addUser);
  const updateUserProfileInStore = useRegisteredUsersStore(
    (state) => state.updateUserProfile
  );

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
    phone: ['', '', '', ''],
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
    handleCarrierChange: baseHandleCarrierChange,
    requestVerification: baseRequestVerification,
    verifyPhone: baseVerifyPhone,
  } = usePhoneVerification({
    phone: formData.phone,
    setValidation,
    setIsLoading,
    setFormData,
  });

  const handleInputChange = useCallback(
    (
      field: keyof RegistrationFormData,
      value: string,
      index?: 0 | 1 | 2 | 3
    ) => {
      baseHandleInputChange(field, value, index);

      setFormData((prevFormData) => {
        let currentInputtedFormData: RegistrationFormData;

        if (field === 'phone' && index !== undefined) {
          const newPhoneTuple: [string, string, string, string] = [
            prevFormData.phone[0],
            prevFormData.phone[1],
            prevFormData.phone[2],
            prevFormData.phone[3],
          ];
          newPhoneTuple[index] = value;
          currentInputtedFormData = { ...prevFormData, phone: newPhoneTuple };
        } else {
          currentInputtedFormData = {
            ...prevFormData,
            [field]: value as string,
          };
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
        return currentInputtedFormData;
      });
    },
    [baseHandleInputChange, validateField, setEmailDomain, setFormData]
  );

  const handleCarrierChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      baseHandleCarrierChange(e);
      setFormData((prevFormData) => {
        const updatedPhone: [string, string, string, string] = [
          e.target.value,
          prevFormData.phone[1],
          prevFormData.phone[2],
          prevFormData.phone[3],
        ];
        const updatedFormData = { ...prevFormData, phone: updatedPhone };
        validateField('phone', updatedFormData.phone, updatedFormData);
        return updatedFormData;
      });
    },
    [baseHandleCarrierChange, setFormData, validateField]
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
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    const existingUsers = useRegisteredUsersStore.getState().users;
    const isDuplicate = existingUsers.some(
      (user) => user.email === fullEmailForValidation
    );

    if (isDuplicate) {
      alert('이미 사용 중인 이메일입니다.');
      setValidation((prev: any) => ({
        ...prev,
        emailChecked: false,
        email: false,
      }));
    } else if (!isValidEmailFormat(fullEmailForValidation)) {
      alert('올바른 이메일 주소 형식을 입력해 주세요.');
      setValidation((prev: any) => ({
        ...prev,
        emailChecked: false,
        email: false,
      }));
    } else {
      alert('사용 가능한 이메일입니다.');
      setValidation((prev: any) => ({
        ...prev,
        emailChecked: true,
        email: true,
      }));
    }
    setIsLoading(false);
  }, [fullEmailForValidation, setIsLoading, setValidation]);

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

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!allFieldsValid) {
        alert('모든 필수 정보를 올바르게 입력하고 인증을 완료해주세요.');
        return;
      }

      setIsLoading(true);

      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));

        addUser({
          email: fullEmailForValidation,
          password: formData.password,
          userGrade: 3,
          name: formData.name,
          nickname: formData.nickname,
          phone: formData.phone,
          joinDate: new Date().toISOString().split('T')[0],
        });

        login(3, fullEmailForValidation);

        updateUserProfileInStore(fullEmailForValidation, {
          lastLoginDate: new Date().toISOString().slice(0, 10),
        });

        alert('회원가입이 완료되었습니다!');
        router.push('/');
      } catch (error) {
        console.error('회원가입 처리 중 오류 발생:', error);
        alert('회원가입에 실패했습니다. 다시 시도해주세요.');
      } finally {
        setIsLoading(false);
      }
    },
    [
      formData,
      fullEmailForValidation,
      allFieldsValid,
      setIsLoading,
      addUser,
      login,
      router,
      updateUserProfileInStore,
    ]
  );

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
