// package
import { useState } from 'react';
import { useRouter } from 'next/navigation';

// slice
import { useForm } from './useForm';
import { QuestionData, UseInquirySubmissionReturn } from '../types';

// layer
import { useInquiriesStore } from '@/shared/stores/useInquiriesStore';
import { useAuthStore } from '@/shared/stores/useAuthStore';

export function useInquirySubmission(): UseInquirySubmissionReturn {
  const router = useRouter();
  const addInquiry = useInquiriesStore((state) => state.addInquiry);
  const { userEmail: currentUserEmail, isHydrated } = useAuthStore();
  const { formData, errors, setErrors, handleInputChange, resetForm } =
    useForm<QuestionData>({
      title: '',
      text: '',
    });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const validateForm = (): boolean => {
    const newErrors: Partial<QuestionData> = {};

    if (!formData.title.trim()) {
      newErrors.title = '제목을 입력해 주세요.';
    }

    if (!formData.text.trim()) {
      newErrors.text = '문의 내용을 입력해 주세요.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitQuestion = async () => {
    if (!isHydrated) {
      alert('로그인 정보를 불러오는 중입니다. 잠시 후 다시 시도해 주세요.');
      return;
    }

    if (!validateForm()) return;

    if (!currentUserEmail) {
      alert('로그인 후 이용해 주세요.');
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      addInquiry({
        title: formData.title.trim(),
        text: formData.text.trim(),
        senderEmail: currentUserEmail,
      });

      alert('문의가 성공적으로 등록되었습니다.');

      resetForm();
      router.push('/support');
    } catch (error) {
      console.error('문의 등록 중 오류가 발생했습니다: ', error);
      alert('문의 등록 중 오류가 발생했습니다. 다시 시도해 주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    errors,
    isSubmitting,
    handleInputChange,
    submitQuestion,
  };
}
