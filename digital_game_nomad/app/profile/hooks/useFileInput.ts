// package
import { useRef, useCallback } from 'react';

// slice
import { UseFileInputProps } from '../types';

export function useFileInput({ onFileSelect }: UseFileInputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onCameraClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const onFileInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        onFileSelect(file);
      }

      if (event.target) {
        event.target.value = '';
      }
    },
    [onFileSelect]
  );

  return {
    fileInputRef,
    onCameraClick,
    onFileInputChange,
  };
}
