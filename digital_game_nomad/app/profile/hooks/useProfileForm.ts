// package
import { useCallback } from 'react';

// slice
import { UserProfile, UseProfileFormProps } from '../types';

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
      if (field === 'phone' && index !== undefined) {
        const newPhone = [...editingProfile.phone];
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
    const isValidForm = validateAll(editingProfile);
    if (!isValidForm) {
      alert('모든 정보를 올바르게 입력해주세요.');
      return;
    }
    await handleSave(editingProfile);
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
