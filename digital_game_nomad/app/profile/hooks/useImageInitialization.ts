// package
import { useEffect } from 'react';

export function useImageInitialization(
  profileImage: string | null,
  editMode: boolean,
  setInitialImageUrl: (url: string | null) => void
) {
  useEffect(() => {
    if (editMode || (!editMode && profileImage)) {
      setInitialImageUrl(profileImage || null);
    }
  }, [editMode, profileImage, setInitialImageUrl]);
}
