// package
import { useState, useCallback } from 'react';

// slice
import { RegistrationFormData } from '../types';

export const useFormInput = (initialData: RegistrationFormData) => {
  const [formData, setFormData] = useState<RegistrationFormData>({
    ...initialData,
    phone:
      initialData.phone.length === 4 ? initialData.phone : ['', '', '', ''],
  });

  const handleInputChange = useCallback(
    <T extends keyof RegistrationFormData>(
      field: T,
      value: T extends 'phone' ? string : string,
      index?: T extends 'phone' ? 0 | 1 | 2 | 3 : undefined
    ) => {
      setFormData((prev) => {
        if (field === 'phone' && index !== undefined) {
          const newPhoneTuple: [string, string, string, string] = [
            ...prev.phone,
          ];
          newPhoneTuple[index] = value;

          return { ...prev, phone: newPhoneTuple };
        }
        return { ...prev, [field]: value };
      });
    },
    []
  );

  return { formData, setFormData, handleInputChange };
};
