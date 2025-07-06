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

export type ProgressBarProps = {
  currentStep: number;
  totalSteps: number;
};

export type SecondStepNewPasswordProps = {
  formData: {
    newPassword: string;
    confirmPassword: string;
  };
  isLoading: boolean;
  passwordError: string;
  confirmPasswordError: string;
  showNewPassword: boolean;
  showConfirmPassword: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  togglePasswordVisibility: (field: 'new' | 'confirm') => void;
  passwordStrength: {
    strength: number;
    label: string;
    color: string;
  };
  handlePrev: () => void;
};

export type StrengthBarProps = {
  strength: number;
  label: string;
  color: string;
};

export type InputFieldProps = {
  label: string;
  name: string;
  value: string;
  showPassword: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTogglePassword: () => void;
  placeholder: string;
  error?: string;
};

export type RequirementsProps = {
  password: string;
};

export type FormData = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  email: string;
  emailVerificationCode: string;
};

export type PasswordStrengthResult = {
  strength: number;
  label: string;
  color: string;
};

export type ForgotPasswordPresenterProps = {
  formData: FormData;
  step: number;
  isLoading: boolean;
  passwordError: string;
  confirmPasswordError: string;
  currentPasswordError: string;
  showCurrentPassword: boolean;
  showNewPassword: boolean;
  showConfirmPassword: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  togglePasswordVisibility: (field: 'current' | 'new' | 'confirm') => void;
  passwordStrength: PasswordStrengthResult;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  isEmailCodeSent: boolean;
  emailCountdown: number;
  emailError: string;
  emailCodeError: string;
  sendEmailVerificationCode: () => Promise<void>;
  formatTime: (seconds: number) => string;
  validateVerificationCode: (code: string) => boolean;
  handlePrev: () => void;
};

export type UsePasswordFormProps = {
  validatePassword: (password: string) => boolean;
  setConfirmPasswordError: (error: string) => void;
  setPasswordError: (error: string) => void;
  setCurrentPasswordError: (error: string) => void;
};

export type UsePasswordResetProcessProps = {
  formData: FormData;
  validatePassword: (password: string) => boolean;
  setPasswordError: (error: string) => void;
  setConfirmPasswordError: (error: string) => void;
  setCurrentPasswordError: (error: string) => void;
  setEmailCodeError: (error: string) => void;
  validateVerificationCode: (code: string) => boolean;
};

export type PasswordStrength = {
  strength: number;
  label: string;
  color: string;
};

export type UseEmailVerificationReturn = {
  isEmailCodeSent: boolean;
  setIsEmailCodeSent: React.Dispatch<React.SetStateAction<boolean>>;
  emailCountdown: number;
  setEmailCountdown: React.Dispatch<React.SetStateAction<number>>;
  sendEmailVerificationCode: (
    email: string,
    setLoading: (loading: boolean) => void,
    setEmailError: (error: string) => void
  ) => Promise<void>;
  resetEmailVerification: () => void;
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
