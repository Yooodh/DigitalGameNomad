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
  showPassword?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTogglePassword?: () => void;
  placeholder: string;
  type?: string;
  error?: string;
  maxLength?: number;
  inputMode?: 'text' | 'numeric' | 'tel' | 'email' | 'url';
  autoFocus?: boolean;
  countdown?: number;
  formatTime?: (seconds: number) => string;
};

export type RequirementsProps = {
  password: string;
};

export type FormData = {
  email: string;
  emailVerificationCode: string;
  newPassword: string;
  confirmPassword: string;
};

// 누락된 PasswordStrength 타입을 추가했습니다.
export type PasswordStrength = {
  strength: number;
  label: string;
  color: string;
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
  emailError: string;
  emailCodeError: string;
  showNewPassword: boolean;
  showConfirmPassword: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  togglePasswordVisibility: (field: 'new' | 'confirm') => void;
  passwordStrength: PasswordStrengthResult;
  isEmailCodeSent: boolean;
  emailCountdown: number;
  sendEmailVerificationCode: () => Promise<void>;
  formatTime: (seconds: number) => string;
  validateVerificationCode: (code: string) => boolean;
  handlePrev: () => void;
  resetForm: () => void;
  setStep: (step: number) => void;
};

export type UsePasswordFormProps = {
  validatePassword: (password: string) => boolean;
};

export type UseForgotPasswordProcessProps = {
  validatePassword: (password: string) => boolean;
  validateVerificationCode: (code: string) => boolean;
};

export type UseEmailVerificationReturn = {
  isEmailCodeSent: boolean;
  emailCountdown: number;
  sendEmailVerificationCode: (email: string) => Promise<void>;
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

export type ThirdStepCompletionProps = {
  resetForm: () => void;
};
