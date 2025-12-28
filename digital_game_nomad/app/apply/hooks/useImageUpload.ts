// package
import { useState } from 'react';

export function useImageUpload() {
  const [previewImage, setPreviewImage] = useState<string>('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const handleImageChange = (file: File): void => {
    if (file && file.type.startsWith('image/')) {
      if (previewImage) {
        URL.revokeObjectURL(previewImage);
      }
      const url = URL.createObjectURL(file);
      setPreviewImage(url);
      setImageFile(file);
    } else {
      console.warn('선택된 파일은 이미지 형식이 아닙니다.');
    }
  };

  const removeImage = (): void => {
    if (previewImage) {
      URL.revokeObjectURL(previewImage);
    }
    setPreviewImage('');
    setImageFile(null);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleImageChange(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setIsDragging(false);
  };

  return {
    previewImage,
    imageFile,
    isDragging,
    handleImageChange,
    removeImage,
    handleDrop,
    handleDragOver,
    handleDragLeave,
    setImageFile,
    setPreviewImage,
  };
}
