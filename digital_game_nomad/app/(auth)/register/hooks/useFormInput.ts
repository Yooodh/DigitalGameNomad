// package
import { useState, useCallback } from 'react';

// slice
import { RegistrationFormData } from '../types';

export const useFormInput = (initialData: RegistrationFormData) => {
  const [formData, setFormData] = useState<RegistrationFormData>(initialData);
  const handleInputChange = useCallback(
    <T extends keyof RegistrationFormData>(
      field: T,
      value: T extends 'phone' ? string : string,
      index?: T extends 'phone' ? number : undefined
    ) => {
      setFormData((prev) => {
        if (field === 'phone' && index !== undefined) {
          const newPhone = [...(prev.phone as string[])];
          newPhone[index] = value;
          return { ...prev, phone: newPhone };
        }
        return { ...prev, [field]: value };
      });
    },
    []
  );

  return { formData, setFormData, handleInputChange };
};
