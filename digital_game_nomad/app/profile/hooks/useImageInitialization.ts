// package
import { useEffect } from 'react';

export function useImageInitialization(
  profileImage: string | null,
  setInitialImageUrl: (url: string | null) => void,
  currentImageUrl: string | null
) {
  useEffect(() => {
    if (currentImageUrl !== profileImage) {
      setInitialImageUrl(profileImage);
    }
  }, [profileImage, setInitialImageUrl, currentImageUrl]);
}
