// package
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// slice
import { UseResetPasswordStore } from '../types';

export const useResetPasswordStore = create<UseResetPasswordStore>()(
  persist(
    (set, _get) => ({
      step: 1,
      isLoading: false,
      formData: {
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      },
      passwordErrors: {
        currentPasswordError: '',
        newPasswordError: '',
        confirmPasswordError: '',
      },
      showPassword: {
        current: false,
        new: false,
        confirm: false,
      },

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
          passwordErrors: {
            ...state.passwordErrors,
            [field]: message,
          },
        })),
      togglePasswordVisibility: (field) =>
        set((state) => ({
          showPassword: {
            ...state.showPassword,
            [field]: !state.showPassword[field],
          },
        })),
      resetForm: () =>
        set(() => ({
          step: 1,
          isLoading: false,
          formData: {
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
          },
          passwordErrors: {
            currentPasswordError: '',
            newPasswordError: '',
            confirmPasswordError: '',
          },
          showPassword: {
            current: false,
            new: false,
            confirm: false,
          },
        })),
    }),
    {
      name: 'reset-password-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
