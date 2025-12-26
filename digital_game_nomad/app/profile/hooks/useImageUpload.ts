// package
import { useState, useCallback } from 'react';
import { toast } from 'react-toastify';

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
      const result = reader.result as string;
      setImageUrl(result);

      setIsUploading(false);
    };
    reader.onerror = () => {
      setUploadError('이미지를 불러오는 데 실패했습니다.');
      setIsUploading(false);
      console.error(
        '이미지 업로드 과정 중 브라우저가 파일을 읽어오는 데 실패했습니다.'
      );
      toast.error('이미지를 불러오는 데 실패했습니다.');
    };
    reader.readAsDataURL(file);
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
