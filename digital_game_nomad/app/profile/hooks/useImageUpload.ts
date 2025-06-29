// package
import { useState, useCallback } from 'react';

export function useImageUpload() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleImageChange = useCallback((file: File) => {
    if (!file) {
      setImageUrl(null);
      return;
    }

    setIsUploading(true);
    setUploadError(null);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImageUrl(reader.result as string);
      setIsUploading(false);
    };
    reader.onerror = () => {
      setUploadError('이미지를 불러오는 데 실패했습니다.');
      setIsUploading(false);
    };
    reader.readAsDataURL(file);

    console.log('선택된 파일:', file);
  }, []);

  const setInitialImageUrl = useCallback((url: string | null) => {
    setImageUrl(url);
    setUploadError(null);
  }, []);

  const resetImageState = useCallback(() => {
    setImageUrl(null);
    setIsUploading(false);
    setUploadError(null);
  }, []);

  return {
    imageUrl,
    isUploading,
    uploadError,
    handleImageChange,
    setInitialImageUrl,
    resetImageState,
  };
}
