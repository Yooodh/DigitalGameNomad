// package
import { useState } from 'react';
import { useRouter } from 'next/navigation';

// slice
import { useForm } from './useForm';

import { QuestionData, UseInquirySubmissionReturn } from '../types';

export function useInquirySubmission(): UseInquirySubmissionReturn {
  const router = useRouter();

  const { formData, errors, setErrors, handleInputChange, resetForm } =
    useForm<QuestionData>({
      title: '',
      text: '',
    });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Partial<QuestionData> = {};

    if (!formData.title.trim()) {
      newErrors.title = '제목을 입력해 주세요';
    }

    if (!formData.text.trim()) {
      newErrors.text = '문의 내용을 입력해 주세요';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitQuestion = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const simulatedPostData = {
        title: formData.title.trim(),
        text: formData.text.trim(),
      };
      console.log('Simulated API Call with data:', simulatedPostData);

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
