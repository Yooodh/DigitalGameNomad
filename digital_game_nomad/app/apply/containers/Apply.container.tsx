'use client';

// slice
import ApplyPresenter from '../presenters/Apply.presenter';
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
    />
  );
}
