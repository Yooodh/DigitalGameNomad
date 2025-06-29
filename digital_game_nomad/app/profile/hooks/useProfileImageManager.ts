// package
import { useCallback, useEffect } from 'react';

// slice
import { useImageUpload } from './useImageUpload';
import { useFileInput } from './useFileInput';
import { useImageInitialization } from './useImageInitialization';
import { UseProfileImageManagerProps } from '../types';

export function useProfileImageManager({
  editingProfile,
  setEditingProfile,
  profileImage,
  editMode,
}: UseProfileImageManagerProps) {
  const {
    imageUrl,
    handleImageChange,
    setInitialImageUrl,
    resetImageState,
    isUploading,
    uploadError,
  } = useImageUpload();

  const { fileInputRef, onCameraClick, onFileInputChange } = useFileInput({
    onFileSelect: handleImageChange,
  });

  const handleRemoveImage = useCallback(() => {
    setEditingProfile((prev) => ({
      ...prev,
      profileImage: '',
    }));
    resetImageState();
    console.log('프로필 이미지가 제거되었습니다.');
  }, [setEditingProfile, resetImageState]);

  useImageInitialization(profileImage, editMode, setInitialImageUrl);

  useEffect(() => {
    if (imageUrl && editMode) {
      setEditingProfile((prev) => ({
        ...prev,
        profileImage: imageUrl,
      }));
    }
  }, [imageUrl, editMode, setEditingProfile]);

  return {
    fileInputRef,
    onCameraClick,
    onFileInputChange,
    handleRemoveImage,
    currentProfileImage: editingProfile.profileImage,
    isUploading,
    uploadError,
  };
}
