// package
import { useState } from 'react';

// slice
import { FormData } from '../types';

export function useFormData(initialData: FormData) {
  const [formData, setFormData] = useState<FormData>(initialData);

  const handleInputChange = (field: keyof FormData, value: string): void => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return {
    formData,
    handleInputChange,
    setFormData,
  };
}
