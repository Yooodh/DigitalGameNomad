// package
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// slice
import { UseForgotPasswordStore, ShowPasswordState } from '../types';

export const useForgotPasswordStore = create<UseForgotPasswordStore>()(
  persist(
    (set) => ({
      step: 1,
      isLoading: false,
      formData: {
        email: '',
        emailVerificationCode: '',
        newPassword: '',
        confirmPassword: '',
      },
      emailError: '',
      emailCodeError: '',
      passwordError: '',
      confirmPasswordError: '',
      isEmailCodeSent: false,
      emailCountdown: 0,
      showPassword: {
        new: false,
        confirm: false,
      },
      verifiedEmail: null,

      setStep: (step) => set({ step }),
      setIsLoading: (isLoading) => set({ isLoading }),
      setFormData: (name, value) =>
        set((state) => ({
          formData: {
            ...state.formData,
            [name]: value,
          },
        })),
      setError: (field, message) =>
        set((state) => ({
          ...state,
          [field]: message,
        })),
      setIsEmailCodeSent: (isSent) => set({ isEmailCodeSent: isSent }),
      setEmailCountdown: (countdown) => set({ emailCountdown: countdown }),
      togglePasswordVisibility: (
        field: keyof Pick<ShowPasswordState, 'new' | 'confirm'>
      ) =>
        set((state) => ({
          showPassword: {
            ...state.showPassword,
            [field]: !state.showPassword[field],
          },
        })),
      setVerifiedEmail: (email) => set({ verifiedEmail: email }),
      resetForm: () =>
        set(() => ({
          step: 1,
          isLoading: false,
          formData: {
            email: '',
            emailVerificationCode: '',
            newPassword: '',
            confirmPassword: '',
          },
          emailError: '',
          emailCodeError: '',
          passwordError: '',
          confirmPasswordError: '',
          isEmailCodeSent: false,
          emailCountdown: 0,
          showPassword: {
            new: false,
            confirm: false,
          },
          verifiedEmail: null,
        })),
    }),
    {
      name: 'forgot-password-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
