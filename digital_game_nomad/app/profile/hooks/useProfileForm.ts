// package
import { useCallback } from 'react';
import { toast } from 'react-toastify';

// slice
import { UserProfile, UseProfileFormProps } from '../types';

// layer
import { useRegisteredUsersStore } from '@/shared/stores/useRegisteredUsersStore';
import { useAuthStore } from '@/shared/stores/useAuthStore';

export function useProfileForm({
  editingProfile,
  setEditingProfile,
  validateField,
  validateAll,
  handleSave,
  handleCancel,
  resetValidation,
}: UseProfileFormProps) {
  const handleInputChange = useCallback(
    (field: keyof UserProfile, value: string, index?: number) => {
      if (!editingProfile) return;

      if (field === 'phone' && index !== undefined) {
        const newPhone: [string, string, string, string] = [
          ...editingProfile.phone,
        ];
        newPhone[index] = value;
        const updatedProfile = { ...editingProfile, phone: newPhone };
        setEditingProfile(updatedProfile);
        validateField('phone', newPhone);
      } else if (typeof value === 'string') {
        const updatedProfile = { ...editingProfile, [field]: value };
        setEditingProfile(updatedProfile);

        if (field === 'name' || field === 'nickname') {
          validateField(field, value);
        }
      }
    },
    [editingProfile, setEditingProfile, validateField]
  );

  const handleSaveWrapper = useCallback(async () => {
    if (!editingProfile) return;

    const isValidForm = validateAll(editingProfile);
    if (!isValidForm) {
      toast.error('모든 정보를 올바르게 입력해 주세요.');
      return;
    }

    const registeredUsers = useRegisteredUsersStore.getState().users;
    const currentUserEmail = useAuthStore.getState().userEmail;

    const isDuplicateNickname = registeredUsers.some(
      (user) =>
        user.nickname === editingProfile.nickname &&
        user.email !== currentUserEmail
    );

    if (isDuplicateNickname) {
      toast.warning('이미 사용 중인 닉네임입니다.');
      return;
    }

    await handleSave(editingProfile);

    toast.success('변경이 완료되었습니다.');
  }, [editingProfile, validateAll, handleSave]);

  const handleCancelWrapper = useCallback(() => {
    handleCancel();
    resetValidation();
  }, [handleCancel, resetValidation]);

  return {
    handleInputChange,
    handleSaveWrapper,
    handleCancelWrapper,
  };
}
