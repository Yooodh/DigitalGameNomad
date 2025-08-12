import { RefObject } from 'react';
import { FormData as ResetPasswordData } from '@/app/(auth)/reset-password/types';
import { FormData as ForgotPasswordData } from '@/app/(auth)/forgot-password/types';
import { FormData as ResetPhoneData } from '@/app/(auth)/reset-phone/types';

export type UseIntersectionVisibilityOptions = {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
  offsetForLastItems?: number;
};

export type AnimatedBackgroundProps = {
  children?: React.ReactNode;
  variant?: 'default' | 'blue' | 'purple';
  intensity?: 'subtle' | 'default' | 'intense';
  position?: 'relative' | 'fixed' | 'absolute';
  fullscreen?: boolean;
  className?: string;
};

export type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  buttonRef?: RefObject<HTMLButtonElement | null>;
};

export type PasswordToggleButtonProps = {
  showPassword: boolean;
  togglePasswordVisibility: () => void;
};

export type SpinnerProps = {
  message?: string;
};

export type ScrollBehavior = 'auto' | 'smooth';

export type RegisteredUser = {
  id: string;
  email: string;
  password: string;
  userGrade: number;
  nickname?: string;
  name?: string;
  phone?: [string, string, string, string];
  profileImage?: string | null;
  joinDate?: string;
  lastLoginDate?: string;
  deleteDate?: string;
};

export type RegisteredUsersState = {
  users: RegisteredUser[];
  addUser: (user: Omit<RegisteredUser, 'id' | 'lastLoginDate'>) => void;
  updateUserGrade: (email: string, newGrade: number) => void;
  updateUserProfile: (
    email: string,
    updatedFields: Partial<Omit<RegisteredUser, 'email' | 'joinDate' | 'id'>>
  ) => void;
  removeUser: (email: string) => void;
};

export type AuthState = {
  isLoggedIn: boolean;
  userGrade: number | null;
  userEmail: string | null;
  isHydrated: boolean;
  login: (userGrade: number, userEmail: string) => void;
  logout: () => void;
  checkLoginStatus: () => void;
};

export type PasswordErrors = {
  currentPasswordError: string;
  newPasswordError: string;
  confirmPasswordError: string;
};

export type ShowPasswordState = {
  current: boolean;
  new: boolean;
  confirm: boolean;
};

export type UseResetPasswordStore = {
  step: number;
  isLoading: boolean;
  formData: ResetPasswordData;
  passwordErrors: PasswordErrors;
  showPassword: ShowPasswordState;

  setStep: (step: number) => void;
  setIsLoading: (isLoading: boolean) => void;
  setFormData: (name: keyof ResetPasswordData, value: string) => void;
  setError: (field: keyof PasswordErrors, message: string) => void;
  togglePasswordVisibility: (field: keyof ShowPasswordState) => void;
  resetForm: () => void;
};

export type ErrorField =
  | 'emailError'
  | 'emailCodeError'
  | 'passwordError'
  | 'confirmPasswordError';

export type UseForgotPasswordStore = {
  step: number;
  isLoading: boolean;
  formData: ForgotPasswordData;
  emailError: string;
  emailCodeError: string;
  passwordError: string;
  confirmPasswordError: string;
  isEmailCodeSent: boolean;
  emailCountdown: number;
  showPassword: Pick<ShowPasswordState, 'new' | 'confirm'>;
  verifiedEmail: string | null;

  setStep: (step: number) => void;
  setIsLoading: (isLoading: boolean) => void;
  setFormData: (name: keyof ForgotPasswordData, value: string) => void;
  setError: (field: ErrorField, message: string) => void;
  setIsEmailCodeSent: (isSent: boolean) => void;
  setEmailCountdown: (countdown: number) => void;
  togglePasswordVisibility: (
    field: keyof Pick<ShowPasswordState, 'new' | 'confirm'>
  ) => void;
  setVerifiedEmail: (email: string | null) => void;
  resetForm: () => void;
};

export type ResetPhoneState = {
  step: number;
  isLoading: boolean;
  formData: ResetPhoneData;
  emailError: string;
  emailCodeError: string;
  phoneCodeError: string;
  personalInfoError: string;
  isEmailCodeSent: boolean;
  emailCountdown: number;
  isPhoneCodeSent: boolean;
  phoneCountdown: number;
  isCurrentCarrierSelectOpen: boolean;
  isNewCarrierSelectOpen: boolean;
  carriers: string[];

  verifiedEmail: string | null;
  verifiedName: string | null;
  verifiedCurrentPhone: string | null;
  verifiedCurrentCarrier: string | null;
};

export type ResetPhoneActions = {
  setStep: (step: number) => void;
  setIsLoading: (isLoading: boolean) => void;
  setFormData: (name: keyof ResetPhoneData, value: string) => void;
  setError: (
    field:
      | 'emailError'
      | 'emailCodeError'
      | 'phoneCodeError'
      | 'personalInfoError',
    message: string
  ) => void;
  setIsEmailCodeSent: (isSent: boolean) => void;
  setEmailCountdown: (countdown: number) => void;
  setIsPhoneCodeSent: (isSent: boolean) => void;
  setPhoneCountdown: (countdown: number) => void;
  setIsCurrentCarrierSelectOpen: (isOpen: boolean) => void;
  setIsNewCarrierSelectOpen: (isOpen: boolean) => void;
  setVerifiedEmail: (email: string | null) => void;
  setVerifiedPersonalInfo: (
    name: string,
    phone: string,
    carrier: string
  ) => void;
  resetForm: () => void;
};

export type ResetPhoneStore = ResetPhoneState & ResetPhoneActions;
