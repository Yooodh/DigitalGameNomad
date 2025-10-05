// package
import { useCallback } from 'react';

// slice
import { useResetPasswordStore } from '@/shared/stores/useResetPasswordStore';
import { UsePasswordResetProcessProps } from '../types';

// layer
import { useAuthStore } from '@/shared/stores/useAuthStore';
import { useRegisteredUsersStore } from '@/shared/stores/useRegisteredUsersStore';

export function usePasswordResetProcess({
  validatePassword,
}: UsePasswordResetProcessProps) {
  const { step, isLoading, formData, setStep, setIsLoading, setError } =
    useResetPasswordStore();

  const currentUserEmail = useAuthStore((state) => state.userEmail);
  const logout = useAuthStore((state) => state.logout);
  const registeredUsers = useRegisteredUsersStore((state) => state.users);
  const updateUserProfileInStore = useRegisteredUsersStore(
    (state) => state.updateUserProfile
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);

      if (step === 1) {
        const currentUser = registeredUsers.find(
          (user) => user.email === currentUserEmail
        );

        if (!currentUser) {
          setError(
            'currentPasswordError',
            '로그인된 사용자 정보를 찾을 수 없습니다.'
          );
          setIsLoading(false);
          return;
        }

        const isCurrentPasswordCorrect =
          formData.currentPassword === currentUser.password;

        if (!isCurrentPasswordCorrect) {
          setError('currentPasswordError', '현재 비밀번호가 올바르지 않습니다');
          setIsLoading(false);
          return;
        }

        setTimeout(() => {
          setIsLoading(false);
          setStep(2);
        }, 1500);
      } else if (step === 2) {
        if (!validatePassword(formData.newPassword)) {
          setError(
            'newPasswordError',
            '8자 이상, 영문 소문자, 숫자, 특수문자를 포함해주세요'
          );
          setIsLoading(false);
          return;
        }
        if (formData.newPassword !== formData.confirmPassword) {
          setError('confirmPasswordError', '비밀번호가 일치하지 않습니다');
          setIsLoading(false);
          return;
        }

        if (currentUserEmail) {
          try {
            await new Promise((resolve) => setTimeout(resolve, 1000));

            updateUserProfileInStore(currentUserEmail, {
              password: formData.newPassword,
            });

            logout();
            setStep(3);
          } catch (error) {
            console.error('비밀번호 업데이트 중 오류 발생:', error);
            setError(
              'newPasswordError',
              '비밀번호 업데이트에 실패했습니다. 다시 시도해주세요.'
            );
          } finally {
            setIsLoading(false);
          }
        } else {
          console.warn('현재 로그인된 사용자 이메일을 찾을 수 없습니다.');
          setError(
            'newPasswordError',
            '로그인 정보가 없어 비밀번호를 업데이트할 수 없습니다.'
          );
          setIsLoading(false);
        }
      }
    },
    [
      step,
      formData,
      validatePassword,
      setStep,
      setIsLoading,
      setError,
      currentUserEmail,
      registeredUsers,
      updateUserProfileInStore,
      logout,
    ]
  );

  return {
    step,
    isLoading,
    handleSubmit,
  };
}
