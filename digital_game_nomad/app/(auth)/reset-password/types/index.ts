export type FirstStepCurrentPasswordProps = {
  formData: { currentPassword: string };
  isLoading: boolean;
  currentPasswordError: string;
  showCurrentPassword: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  togglePasswordVisibility: () => void;
};

export type ProgressBarProps = {
  step: number;
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
};

export type PasswordStrengthResult = {
  strength: number;
  label: string;
  color: string;
};

export type ResetPasswordPresenterProps = {
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
};

export type PasswordStrength = {
  strength: number;
  label: string;
  color: string;
};
