// package
import { useState, useCallback, useEffect } from 'react';

export const useImageHandler = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [currentImageUrl, setCurrentImageUrl] = useState<string>('');
  const [imageLoading, setImageLoading] = useState<boolean>(false);
  const [imageError, setImageError] = useState<boolean>(false);
  const [isImageRemoved, setIsImageRemoved] = useState<boolean>(false);

  useEffect(() => {
    if (currentImageUrl) {
      setImageLoading(true);
      setImageError(false);
      setIsImageRemoved(false);
    } else {
      setImageLoading(false);
      setImageError(false);
    }
  }, [currentImageUrl]);

  const handleImageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setImageFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setCurrentImageUrl(reader.result as string);
          setImageLoading(true);
          setImageError(false);
          setIsImageRemoved(false);
        };
        reader.readAsDataURL(file);
      }
    },
    []
  );

  const handleRemoveImage = useCallback(() => {
    setImageFile(null);
    setCurrentImageUrl('');
    setIsImageRemoved(true);
    setImageError(false);
  }, []);

  const handleImageLoad = useCallback(() => {
    setImageLoading(false);
    setImageError(false);
  }, []);

  const handleImageError = useCallback(() => {
    setImageLoading(false);
    setImageError(true);
    setCurrentImageUrl('');
  }, []);

  return {
    imageFile,
    currentImageUrl,
    imageLoading,
    imageError,
    isImageRemoved,
    handleImageChange,
    handleRemoveImage,
    handleImageLoad,
    handleImageError,
    setCurrentImageUrl,
  };
};
