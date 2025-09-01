// package
import { useCallback, useEffect, useRef } from 'react';

// slice
import { useImageUpload } from './useImageUpload';
import { useFileInput } from './useFileInput';
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
    setEditingProfile((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        profileImage: null,
      };
    });

    resetImageState();
  }, [setEditingProfile, resetImageState]);

  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current && profileImage !== imageUrl) {
      setInitialImageUrl(profileImage);
    } else if (!editMode && imageUrl !== profileImage) {
      setInitialImageUrl(profileImage);
    }

    isInitialMount.current = false;
  }, [profileImage, imageUrl, setInitialImageUrl, editMode]);

  useEffect(() => {
    if (
      editMode &&
      editingProfile &&
      editingProfile.profileImage !== imageUrl
    ) {
      setEditingProfile((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          profileImage: imageUrl,
        };
      });
    }
  }, [imageUrl, editMode, editingProfile, setEditingProfile]);

  return {
    fileInputRef,
    onCameraClick,
    onFileInputChange,
    handleRemoveImage,
    currentProfileImage: imageUrl,
    isUploading,
    uploadError,
  };
}
