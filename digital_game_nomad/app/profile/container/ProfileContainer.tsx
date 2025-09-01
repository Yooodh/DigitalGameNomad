'use client';

// slice
import ProfilePresenter from '../presenter/ProfilePresenter';
import { useProfile } from '../hooks/useProfile';
import { useProfileValidation } from '../hooks/useProfileValidation';
import { useProfileForm } from '../hooks/useProfileForm';
import { useProfileImageManager } from '../hooks/useProfileImageManager';
import { useUIState } from '../hooks/useUIState';

export default function ProfileContainer() {
  const {
    profile,
    editingProfile,
    setEditingProfile,
    editMode,
    isLoading,
    handleEdit,
    handleSave,
    handleCancel,
  } = useProfile();

  const { validation, validateField, validateAll, resetValidation } =
    useProfileValidation();

  const { handleInputChange, handleSaveWrapper, handleCancelWrapper } =
    useProfileForm({
      editingProfile,
      setEditingProfile,
      validateField,
      validateAll,
      handleSave,
      handleCancel,
      resetValidation,
    });

  const {
    fileInputRef,
    onCameraClick,
    onFileInputChange,
    handleRemoveImage,
    currentProfileImage,
  } = useProfileImageManager({
    editingProfile,
    setEditingProfile,
    profileImage: profile ? profile.profileImage : null,
    editMode,
  });

  const { activeTab, onSetActiveTab, getGradeText, formatDate, getGradeIcon } =
    useUIState();

  if (!profile || !editingProfile) {
    return <div>프로필 정보를 불러오는 중...</div>;
  }

  return (
    <>
      <ProfilePresenter
        profile={profile}
        editingProfile={editingProfile}
        editMode={editMode}
        activeTab={activeTab}
        isLoading={isLoading}
        validation={validation}
        onInputChange={handleInputChange}
        onEdit={handleEdit}
        onSave={handleSaveWrapper}
        onCancel={handleCancelWrapper}
        onSetActiveTab={onSetActiveTab}
        getGradeText={getGradeText}
        formatDate={formatDate}
        getGradeIcon={getGradeIcon}
        onCameraClick={onCameraClick}
        onRemoveImage={handleRemoveImage}
        profileImage={currentProfileImage}
        fileInputRef={fileInputRef}
        onFileInputChange={onFileInputChange}
      />
    </>
  );
}
