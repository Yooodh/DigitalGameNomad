'use client';

// package
import { useState } from 'react';
import { useRouter } from 'next/navigation';

// slice
import LoginPresenter from '../presenter/LoginPresenter';
import { FormData, FormErrors } from '../types';

// layer
import { useAuthStore } from '@/shared/stores/useAuthStore';
import { useRegisteredUsersStore } from '@/shared/stores/useRegisteredUsersStore';

export default function LoginContainer() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const registeredUsers = useRegisteredUsersStore((state) => state.users);

  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.email) {
      newErrors.email = '이메일을 입력해주세요';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = '올바른 이메일 형식을 입력해주세요';
    }

    if (!formData.password) {
      newErrors.password = '비밀번호를 입력해주세요';
    } else if (formData.password.length < 6) {
      newErrors.password = '비밀번호는 6자 이상이어야 합니다';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const foundUser = registeredUsers.find(
        (user) =>
          user.email === formData.email && user.password === formData.password
      );

      if (foundUser) {
        login(foundUser.userGrade, foundUser.email);
        router.push('/');
      } else {
        setErrors((prev) => ({
          ...prev,
          general: '이메일 또는 비밀번호가 올바르지 않습니다.',
        }));
        console.error('로그인 실패: 이메일 또는 비밀번호 불일치');
      }
    } catch (error) {
      console.error('로그인 처리 중 오류 발생:', error);
      setErrors((prev) => ({
        ...prev,
        general: '로그인 처리 중 오류가 발생했습니다.',
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <LoginPresenter
      formData={formData}
      errors={errors}
      showPassword={showPassword}
      isLoading={isLoading}
      handleInputChange={handleInputChange}
      handleSubmit={handleSubmit}
      togglePasswordVisibility={togglePasswordVisibility}
    />
  );
}
