'use client';

// slice
import ApplyPresenter from '../presenter/ApplyPresenter';
import { useApplyForm } from '../hooks/useApplyForm';

export default function ApplyContainer() {
  const {
    formData,
    previewImage,
    isDragging,
    handleInputChange,
    handleImageChange,
    removeImage,
    handleDrop,
    handleDragOver,
    handleDragLeave,
    handleSubmit,
    isSubmitting,
  } = useApplyForm();

  return (
    <ApplyPresenter
      formData={formData}
      previewImage={previewImage}
      isDragging={isDragging}
      onInputChange={handleInputChange}
      onImageChange={handleImageChange}
      onRemoveImage={removeImage}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
    />
  );
}
