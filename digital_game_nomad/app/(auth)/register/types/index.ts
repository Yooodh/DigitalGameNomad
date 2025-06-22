import { Dispatch, SetStateAction } from 'react';

export type RegistrationFormData = {
  email: string;
  password: string;
  passwordCheck: string;
  name: string;
  nickname: string;
  phone: string[];
};

export type ValidationState = {
  email: boolean;
  emailChecked: boolean;
  password: boolean;
  passwordCheck: boolean;
  name: boolean;
  nickname: boolean;
  phone: boolean;
  phoneVerified: boolean;
};

export type EmailInputGroupProps = {
  email: string;
  emailDomain: string;
  isEmailSelectOpen: boolean;
  handleInputChange: (field: 'email', value: string) => void;
  handleEmailDomainChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  checkEmailDuplicate: () => Promise<void>;
  validationEmail: boolean;
  validationEmailChecked: boolean;
  isLoading: boolean;
  setIsSelectOpen: React.Dispatch<
    React.SetStateAction<{ email: boolean; carrier: boolean }>
  >;
};

export type InputGroupProps = {
  label: string;
  children: React.ReactNode;
  errorMessage?: string;
  successMessage?: string;
  showError: boolean;
  showSuccess: boolean;
};

export type PasswordInputGroupProps = {
  password: string;
  passwordCheck: string;
  showPassword: boolean;
  showPasswordCheck: boolean;
  handleInputChange: (
    field: 'password' | 'passwordCheck',
    value: string
  ) => void;
  setShowPassword: (show: boolean) => void;
  setShowPasswordCheck: (show: boolean) => void;
  validationPassword: boolean;
  validationPasswordCheck: boolean;
};

export type PhoneInputGroupProps = {
  phone: string[];
  verificationCode: string;
  showVerification: boolean;
  isLoading: boolean;
  isCarrierSelectOpen: boolean;
  validationPhone: boolean;
  validationPhoneVerified: boolean;
  handleInputChange: (field: 'phone', value: string, index: number) => void;
  handleCarrierChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  requestVerification: () => Promise<void>;
  verifyPhone: () => void;
  setVerificationCode: (code: string) => void;
  setIsSelectOpen: React.Dispatch<
    React.SetStateAction<{ email: boolean; carrier: boolean }>
  >;
};

export type EmailRegistrationProps = {
  email: string;
  setValidation: Dispatch<SetStateAction<ValidationState>>;
  setIsLoading: (loading: boolean) => void;
  setFormData: Dispatch<SetStateAction<RegistrationFormData>>;
};

export type PhoneVerificationProps = {
  phone: string[];
  setValidation: Dispatch<SetStateAction<ValidationState>>;
  setIsLoading: (loading: boolean) => void;
};

export type UseRegisterFormReturn = {
  formData: RegistrationFormData;
  validation: ValidationState;
  showPassword: boolean;
  showPasswordCheck: boolean;
  verificationCode: string;
  showVerification: boolean;
  isLoading: boolean;
  emailDomain: string;
  isSelectOpen: { email: boolean; carrier: boolean };
  handleInputChange: (
    field: keyof RegistrationFormData,
    value: string,
    index?: number
  ) => void;
  handleEmailDomainChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleCarrierChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  checkEmailDuplicate: () => Promise<void>;
  requestVerification: () => Promise<void>;
  verifyPhone: () => void;
  handleSubmit: () => Promise<void>;
  setShowPassword: (show: boolean) => void;
  setShowPasswordCheck: (show: boolean) => void;
  setVerificationCode: (code: string) => void;
  setIsSelectOpen: React.Dispatch<
    React.SetStateAction<{ email: boolean; carrier: boolean }>
  >;
};

export type RegisterPresenterProps = {
  formData: RegistrationFormData;
  validation: ValidationState;
  showPassword: boolean;
  showPasswordCheck: boolean;
  verificationCode: string;
  showVerification: boolean;
  isLoading: boolean;
  emailDomain: string;
  isSelectOpen: {
    email: boolean;
    carrier: boolean;
  };
  handleInputChange: (
    field: keyof RegistrationFormData,
    value: string,
    index?: number
  ) => void;
  handleEmailDomainChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleCarrierChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  checkEmailDuplicate: () => Promise<void>;
  requestVerification: () => Promise<void>;
  verifyPhone: () => void;
  handleSubmit: () => Promise<void>;
  setShowPassword: (show: boolean) => void;
  setShowPasswordCheck: (show: boolean) => void;
  setVerificationCode: (code: string) => void;
  setIsSelectOpen: React.Dispatch<
    React.SetStateAction<{ email: boolean; carrier: boolean }>
  >;
};
