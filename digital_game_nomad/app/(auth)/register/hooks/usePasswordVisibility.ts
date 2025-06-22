// package
import { useState, useCallback } from 'react';

export const usePasswordVisibility = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showPasswordCheck, setShowPasswordCheck] = useState<boolean>(false);

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const togglePasswordCheckVisibility = useCallback(() => {
    setShowPasswordCheck((prev) => !prev);
  }, []);

  return {
    showPassword,
    setShowPassword,
    showPasswordCheck,
    setShowPasswordCheck,
    togglePasswordVisibility,
    togglePasswordCheckVisibility,
  };
};
