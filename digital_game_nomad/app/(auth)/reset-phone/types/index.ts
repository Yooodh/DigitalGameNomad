export type InfoItem = {
  label: string;
  value: string;
};

export type InfoDisplayProps = {
  items: InfoItem[];
};

export type InputGroupProps = {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  error?: string;
  maxLength?: number;
  inputMode?: 'text' | 'numeric' | 'tel' | 'email' | 'url';
  autoFocus?: boolean;
  countdown?: number;
  formatTime?: (seconds: number) => string;
};

export type PhoneInputGroupProps = {
  label: string;
  phoneName: string;
  phoneValue: string;
  carrierName: string;
  carrierValue: string;
  carriers: string[];
  isSelectOpen: boolean;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onSelectFocus: () => void;
  onSelectBlur: () => void;
  placeholder?: string;
};

export type ProgressBarProps = {
  currentStep: number;
  totalSteps: number;
};

export type FirstStepEmailVerificationProps = {
  formData: {
    email: string;
    emailVerificationCode: string;
  };
  isLoading: boolean;
  isEmailCodeSent: boolean;
  emailCountdown: number;
  emailError: string;
  emailCodeError: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  sendEmailVerificationCode: () => Promise<void>;
  formatTime: (seconds: number) => string;
  validateVerificationCode: (code: string) => boolean;
};

export type SecondStepPersonalInfoProps = {
  formData: {
    name: string;
    currentPhone: string;
    currentCarrier: string;
  };
  isLoading: boolean;
  isCurrentCarrierSelectOpen: boolean;
  carriers: string[];
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleSelectFocus: (selectName: 'currentCarrier') => void;
  handleSelectBlur: (selectName: 'currentCarrier') => void;
  handlePrevStep: () => void;
  personalInfoError: string;
};

export type VerificationCodeProps = {
  label: string;
  name: string;
  value: string;
  error: string;
  countdown: number;
  isCodeSent: boolean;
  isLoading: boolean;
  successMessage?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onResendCode: () => Promise<void>;
  formatTime: (seconds: number) => string;
  validateVerificationCode: (code: string) => boolean;
};

export type ThirdStepNewPhoneInputProps = {
  formData: {
    name: string;
    currentPhone: string;
    currentCarrier: string;
    newPhone: string;
    newCarrier: string;
    phoneVerificationCode: string;
  };
  isLoading: boolean;
  isPhoneCodeSent: boolean;
  phoneCountdown: number;
  phoneCodeError: string;
  isNewCarrierSelectOpen: boolean;
  carriers: string[];
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleSelectFocus: (selectName: 'newCarrier') => void;
  handleSelectBlur: (selectName: 'newCarrier') => void;
  sendPhoneVerificationCode: () => Promise<void>;
  formatTime: (seconds: number) => string;
  validateVerificationCode: (code: string) => boolean;
  handlePrevStep: () => void;
};

export type FourthStepCompletionProps = {
  formData: {
    name: string;
    currentPhone: string;
    currentCarrier: string;
    newPhone: string;
    newCarrier: string;
  };
  handleCompletionAndRedirect: () => void;
};

export type ResetPhonePresenterProps = {
  formData: {
    email: string;
    emailVerificationCode: string;
    name: string;
    currentPhone: string;
    currentCarrier: string;
    newPhone: string;
    newCarrier: string;
    phoneVerificationCode: string;
  };
  step: number;
  isLoading: boolean;
  isEmailCodeSent: boolean;
  isPhoneCodeSent: boolean;
  emailCountdown: number;
  phoneCountdown: number;
  emailError: string;
  emailCodeError: string;
  phoneCodeError: string;
  personalInfoError: string;
  isCurrentCarrierSelectOpen: boolean;
  isNewCarrierSelectOpen: boolean;
  carriers: string[];
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleSelectFocus: (selectName: 'currentCarrier' | 'newCarrier') => void;
  handleSelectBlur: (selectName: 'currentCarrier' | 'newCarrier') => void;
  sendEmailVerificationCode: () => Promise<void>;
  sendPhoneVerificationCode: () => Promise<void>;
  formatTime: (seconds: number) => string;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  handleCompletionAndRedirect: () => void;
  validateVerificationCode: (code: string) => boolean;
  handlePrevStep: () => void;
  resetForm: () => void;
};

export type FormData = {
  email: string;
  emailVerificationCode: string;
  name: string;
  currentPhone: string;
  currentCarrier: string;
  newPhone: string;
  newCarrier: string;
  phoneVerificationCode: string;
};

export type UseEmailVerificationReturn = {
  sendEmailVerificationCode: (email: string) => Promise<void>;
  resetEmailVerification: () => void;
};

export type UsePhoneVerificationReturn = {
  sendPhoneVerificationCode: () => Promise<void>;
  resetPhoneVerification: () => void;
};

export type UseResetPhoneFormReturn = {
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleSelectFocus: (selectName: 'currentCarrier' | 'newCarrier') => void;
  handleSelectBlur: (selectName: 'currentCarrier' | 'newCarrier') => void;
};

export type UseStepNavigationReturn = {
  step: number;
  isLoading: boolean;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  handlePrevStep: () => void;
  handleCompletionAndRedirect: () => void;
};
