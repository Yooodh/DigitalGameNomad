// package
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// slice
import { ResetPhoneStore } from '../types';

export const useResetPhoneStore = create<ResetPhoneStore>()(
  persist(
    (set) => ({
      step: 1,
      isLoading: false,
      formData: {
        email: '',
        emailVerificationCode: '',
        name: '',
        currentPhone: '',
        currentCarrier: '',
        newPhone: '',
        newCarrier: '',
        phoneVerificationCode: '',
      },
      emailError: '',
      emailCodeError: '',
      phoneCodeError: '',
      personalInfoError: '',
      isEmailCodeSent: false,
      emailCountdown: 0,
      isPhoneCodeSent: false,
      phoneCountdown: 0,
      isCurrentCarrierSelectOpen: false,
      isNewCarrierSelectOpen: false,
      carriers: ['통신사', 'SKT', 'KT', 'LG U+', '알뜰폰'],

      verifiedEmail: null,
      verifiedName: null,
      verifiedCurrentPhone: null,
      verifiedCurrentCarrier: null,

      setStep: (step) => set((state) => ({ ...state, step })),
      setIsLoading: (isLoading) => set((state) => ({ ...state, isLoading })),
      setFormData: (name, value) =>
        set((state) => ({
          ...state,
          formData: {
            ...state.formData,
            [name]: value,
          },
        })),
      setError: (field, message) =>
        set((state) => ({ ...state, [field]: message })),
      setIsEmailCodeSent: (isSent) =>
        set((state) => ({ ...state, isEmailCodeSent: isSent })),
      setEmailCountdown: (countdown) =>
        set((state) => ({ ...state, emailCountdown: countdown })),
      setIsPhoneCodeSent: (isSent) =>
        set((state) => ({ ...state, isPhoneCodeSent: isSent })),
      setPhoneCountdown: (countdown) =>
        set((state) => ({ ...state, phoneCountdown: countdown })),
      setIsCurrentCarrierSelectOpen: (isOpen) =>
        set((state) => ({ ...state, isCurrentCarrierSelectOpen: isOpen })),
      setIsNewCarrierSelectOpen: (isOpen) =>
        set((state) => ({ ...state, isNewCarrierSelectOpen: isOpen })),
      setVerifiedEmail: (email) =>
        set((state) => ({ ...state, verifiedEmail: email })),
      setVerifiedPersonalInfo: (name, phone, carrier) =>
        set((state) => ({
          ...state,
          verifiedName: name,
          verifiedCurrentPhone: phone,
          verifiedCurrentCarrier: carrier,
        })),
      resetForm: () =>
        set(() => ({
          step: 1,
          isLoading: false,
          formData: {
            email: '',
            emailVerificationCode: '',
            name: '',
            currentPhone: '',
            currentCarrier: '',
            newPhone: '',
            newCarrier: '',
            phoneVerificationCode: '',
          },
          emailError: '',
          emailCodeError: '',
          phoneCodeError: '',
          personalInfoError: '',
          isEmailCodeSent: false,
          emailCountdown: 0,
          isPhoneCodeSent: false,
          phoneCountdown: 0,
          isCurrentCarrierSelectOpen: false,
          isNewCarrierSelectOpen: false,
          carriers: ['통신사', 'SKT', 'KT', 'LG U+', '알뜰폰'],
          verifiedEmail: null,
          verifiedName: null,
          verifiedCurrentPhone: null,
          verifiedCurrentCarrier: null,
        })),
    }),
    {
      name: 'reset-phone-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
